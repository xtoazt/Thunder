function getGreeting(name) {
  const currentHour = new Date().getHours();
  let greetingMessage = '';
  let icon = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = `Good morning, ${name}!`;
    icon = 'haze';
  } else if (currentHour >= 12 && currentHour < 20) {
    greetingMessage = `Good evening, ${name}!`;
    icon = 'sun-medium';
  } else {
    greetingMessage = `Good night, ${name}!`;
    icon = 'moon-star';
  }

  return { greetingMessage, icon };
}

const name = 'User';
const { greetingMessage, icon } = getGreeting(name);
document.getElementById('greeting').innerHTML = `<i data-lucide="${icon}"></i><span>${greetingMessage}</span>`;
// Apply UI customization live
try {
  const accent = localStorage.getItem('ui:accent');
  if (accent) document.documentElement.style.setProperty('--accent', accent);
  const title = localStorage.getItem('ui:title');
  if (title) document.title = title;
  const font = localStorage.getItem('ui:font');
  if (font) document.documentElement.style.setProperty('--font', font);
  const bg = localStorage.getItem('ui:bg');
  if (bg) document.documentElement.style.setProperty('--bg', bg);
  const theme = localStorage.getItem('ui:theme');
  if (theme) {
    document.documentElement.classList.remove('theme-dark','theme-light','theme-premium');
    document.documentElement.classList.add(theme);
  }
} catch {}
lucide.create();
