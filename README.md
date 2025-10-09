# Thundr

The better way to browse.

## Features

- 🎮 **1600+ Games** - Access to a massive library of games
- 🌐 **Web Proxy** - Multiple proxy options (UV, Scramjet, Bare)
- 🤖 **AI Chat** - Built-in AI assistant
- 🎨 **Modern UI** - Beautiful, responsive React interface
- ⚡ **Fast** - Built with Vite for optimal performance
- 🔒 **Privacy** - Multiple cloaking options

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Radix UI + Tailwind CSS + Framer Motion
- **Router**: TanStack Router
- **Backend**: Fastify + Node.js
- **Proxy**: Ultraviolet + Scramjet + Bare Server + Wisp

## Getting Started

### Prerequisites

- Node.js 16+
- npm 7+ or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dogeub
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. (Optional) Add your API keys to `.env`:
```env
# For AI features
OPENROUTER_API_KEY=your_key_here
# or
LLM7_API_KEY=your_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

This will start:
- Vite dev server on `http://localhost:5173`
- Backend server on `http://localhost:3000`

### Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
dogeub/
├── public/              # Static assets
│   ├── assets/         # Images, CSS, JS
│   ├── scram/          # Scramjet proxy files
│   └── uv/             # Ultraviolet proxy files
├── src/
│   ├── components/     # React components
│   │   ├── homeComponents/
│   │   ├── hooks/
│   │   └── ui/        # Radix UI components
│   ├── routes/        # TanStack Router routes
│   ├── lib/           # Utilities
│   ├── store.ts       # Zustand state management
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
├── server.ts          # Backend server
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies

## Configuration

### Proxy Settings

The app supports multiple proxy options:
- **Ultraviolet (UV)**: Traditional proxy with XOR encoding
- **Scramjet**: Modern WASM-based proxy
- **Bare Server**: Backend proxy server

### AI Settings

Configure AI providers in `.env`:
- OpenRouter (recommended for production)
- LLM7 (alternative provider)

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

GPL-3.0-or-later

## Credits

- Built by rohan
- UI inspired by EmeraldModern
- Proxy technologies: Titanium Network, Mercury Workshop

## Support

- GitHub: [xnoctra/Thundr](https://github.com/xnoctra/Thundr)
- Discord: [Join our server](https://discord.gg/5hETqnGc3e)

---

Made with ⚡ by the Thundr team
