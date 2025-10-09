import { createFileRoute } from "@tanstack/react-router";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Game = {
  name: string;
  desc: string;
  link: string;
  img: string;
};

const getList = async (): Promise<Game[]> => {
  try {
    // Try to fetch from API first (when backend is available)
    const res = await fetch("/api/games");
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.log("API not available, loading static data");
  }
  
  // Fallback to static JSON file
  try {
    const res = await fetch("/assets/js/json/games.json");
    return await res.json();
  } catch (e) {
    console.error("Failed to load games:", e);
    return [];
  }
};

export const Route = createFileRoute("/games")({
  component: RouteComponent,
  loader: async () => await getList(),
});

function RouteComponent() {
  const list = Route.useLoaderData();
  const [search, setSearch] = useState("");

  const filteredGames = list.filter((game: Game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) ||
                         game.desc.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"1 2"}
        className={cn(
          `[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] z-[0]`
        )}
      />
      <div className="w-full min-h-screen flex flex-col items-center justify-center z-20 space-y-4 p-4">
        <div className="w-full max-w-[90%] flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-center">Games</h1>
          <Input
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>
        <div className="h-[70vh] min-w-[90%] max-w-[90%] border rounded-xl border-secondary items-center justify-center overflow-y-auto overflow-x-hidden flex flex-wrap">
          {filteredGames.map((game: Game, i) => (
            <Card
              className="m-2 max-h-[20rem] bg-card transition-all hover:scale-105"
              key={i}
            >
              <CardHeader className="flex w-full items-center">
                <CardTitle className="text-center">{game.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={game.img}
                  alt={game.name}
                  className="rounded-xl object-cover h-[10rem] w-[10rem]"
                  width={150}
                  height={150}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.target as HTMLImageElement).src = '/assets/imgs/logo.png';
                  }}
                />
              </CardContent>
              <CardFooter>
                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full rounded-[0.5rem] text-card-foreground">
                    Play
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
