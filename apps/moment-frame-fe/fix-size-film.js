import fs from 'fs';
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('.size-and-film-layout')) {
  content += '\n.size-and-film-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 28px; }';
  content += '\n@media (max-width: 1080px) { .size-and-film-layout { grid-template-columns: 1fr; } }';
}

fs.writeFileSync(file, content);
