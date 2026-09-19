import fs from 'fs';
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// Change .product-size-guide to use flex column instead of grid
content = content.replace(
  '.product-size-guide { display: grid; grid-template-columns: minmax(250px, .85fr) minmax(0, 1.15fr); gap: 38px; padding: clamp(28px, 5vw, 64px); border: 1px solid #e9ddfa; border-radius: 22px; background: #fbf9ff; color: #352260; }',
  '.product-size-guide { display: flex; flex-direction: column; gap: 38px; padding: clamp(28px, 5vw, 64px); border: 1px solid #e9ddfa; border-radius: 22px; background: #fbf9ff; color: #352260; }'
);

fs.writeFileSync(file, content);
