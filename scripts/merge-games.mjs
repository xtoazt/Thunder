import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const gamesJsonPath = path.join(root, 'public/assets/js/json/games.json');
const gamesJsPath = path.join(root, 'games.js');

function extractLessonsArray(jsText) {
  // Extract the lessonsData array literal from games.js
  const startIdx = jsText.indexOf('const lessonsData = [');
  if (startIdx === -1) throw new Error('lessonsData array not found');
  let i = startIdx + 'const lessonsData = '.length;
  // Find matching closing bracket for array
  let depth = 0;
  let inString = false;
  let strQuote = '';
  for (; i < jsText.length; i++) {
    const ch = jsText[i];
    const prev = jsText[i - 1];
    if (inString) {
      if (ch === strQuote && prev !== '\\') inString = false;
      continue;
    } else {
      if (ch === '"' || ch === '\'') { inString = true; strQuote = ch; continue; }
      if (ch === '[') depth++;
      if (ch === ']') { depth--; if (depth === 0) { i++; break; } }
    }
  }
  const arrLiteral = jsText.slice(startIdx + 'const lessonsData = '.length, i).trim().replace(/;\s*$/, '');
  return JSON.parse(arrLiteral);
}

function toGameEntries(lessons) {
  return lessons.map(l => ({
    name: l.name || l.lesson,
    desc: l.cat ? `Categories: ${l.cat.join(', ')}` : '',
    link: `https://classroom.mathify.space/lessons/${l.lesson}`,
    img: `https://classroom.mathify.space/lessons-img/${l.lesson}.webp`
  }));
}

const gamesRaw = fs.readFileSync(gamesJsonPath, 'utf8');
const games = JSON.parse(gamesRaw);
const gamesJs = fs.readFileSync(gamesJsPath, 'utf8');
const lessons = extractLessonsArray(gamesJs);
const newEntries = toGameEntries(lessons);

// de-duplicate by name or link
const seen = new Set(games.map(g => (g.link || g.name).toLowerCase()));
for (const e of newEntries) {
  const key = (e.link || e.name).toLowerCase();
  if (!seen.has(key)) { games.push(e); seen.add(key); }
}

fs.writeFileSync(gamesJsonPath, JSON.stringify(games, null, 2));
console.log(`Merged ${newEntries.length} lessons; games.json now has ${games.length} entries.`);


