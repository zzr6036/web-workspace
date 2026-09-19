import fs from 'fs';
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// Insert after .usage-guide-list rule if it's there
content = content.replace(
  '.usage-guide-list { grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; max-width: 100%; }',
  '.usage-guide-list { grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; max-width: 100%; }\n.photo-orientation-selection-list { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 100%; max-width: 100%; }'
);

// Ensure mobile responsiveness
content = content.replace(
  '@media (max-width: 760px) { .usage-guide-list { grid-template-columns: 1fr; } }',
  '@media (max-width: 760px) { .usage-guide-list, .photo-orientation-selection-list { grid-template-columns: 1fr; } }'
);

fs.writeFileSync(file, content);
