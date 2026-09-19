import fs from 'fs';
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// Replace the combined rule
content = content.replace(
  '.usage-guide-list, .photo-orientation-selection-list { display: grid; gap: 26px; border: 0; background: transparent; overflow: visible; }',
  '.usage-guide-list, .photo-orientation-selection-list { display: grid; gap: 26px; border: 0; background: transparent; overflow: visible; }\n.usage-guide-list { grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; max-width: 100%; }'
);

// Ensure mobile responsiveness
if (!content.includes('@media (max-width: 760px) { .usage-guide-list { grid-template-columns: 1fr; } }')) {
  content += '\n@media (max-width: 760px) { .usage-guide-list { grid-template-columns: 1fr; } }';
}

fs.writeFileSync(file, content);
