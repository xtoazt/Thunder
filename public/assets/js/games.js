(async () => {
  try {
    let response = await fetch('assets/js/json/games.json');
    let games = await response.json();
    const gamesContain = document.getElementById('gamesContain');
    if (!gamesContain) return;

    // sort once
    games.sort((a, b) => a.name.localeCompare(b.name));

    const pageSize = 40;
    let rendered = 0;

    function renderNextBatch() {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < pageSize && rendered < games.length; i++, rendered++) {
        const game = games[rendered];
        if (!game?.img || !game?.link) { continue; }
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game';

        const img = document.createElement('img');
        img.src = game.img;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('error', () => gameDiv.remove());

        const descDiv = document.createElement('div');
        descDiv.className = 'desc';

        const h2 = document.createElement('h2');
        h2.textContent = game.name;

        const p = document.createElement('p');
        p.className = 'description';
        p.textContent = game.desc;

        const button = document.createElement('button');
        button.textContent = 'Launch';
        button.onclick = () => launch(game.link);

        descDiv.appendChild(h2);
        descDiv.appendChild(p);
        gameDiv.appendChild(img);
        gameDiv.appendChild(descDiv);
        gameDiv.appendChild(button);
        frag.appendChild(gameDiv);
      }
      gamesContain.appendChild(frag);
    }

    // initial render
    renderNextBatch();

    // infinite scroll
    const sentinel = document.createElement('div');
    sentinel.id = 'games-sentinel';
    sentinel.style.height = '1px';
    gamesContain.appendChild(sentinel);

    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        renderNextBatch();
      }
    }, { rootMargin: '200px' });
    io.observe(sentinel);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
})();
