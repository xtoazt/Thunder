(async () => {
  try {
    const shortcutsContain = document.getElementById('shortcutsContain');
    if (!shortcutsContain) return;
    // Use games.json and only render items with valid thumbnails
    const response = await fetch('/assets/js/json/games.json');
    const list = await response.json();
    let added = 0;
    const max = 12;
    for (const g of list) {
      if (added >= max) break;
      if (!g?.img || !g?.link) continue;
      const shortcutDiv = document.createElement('div');
      shortcutDiv.className = 'shortcut';
      shortcutDiv.onclick = () => { launch(g.link); };
      const img = document.createElement('img');
      img.src = g.img; img.alt = g.name || 'game'; img.title = g.name || 'game'; img.loading = 'lazy';
      img.addEventListener('error', () => shortcutDiv.remove());
      img.addEventListener('load', () => { if (!shortcutDiv.isConnected) shortcutsContain.appendChild(shortcutDiv); });
      shortcutDiv.appendChild(img);
      added++;
    }
  } catch (error) {
    console.error('Error building shortcuts:', error);
  }
})();
