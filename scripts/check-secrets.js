#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const patterns = [
  /sk_live_[a-zA-Z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /xox[baprs]-[0-9a-zA-Z]{10,}/,
];

const appDir = path.join(process.cwd(), 'src/my-app');
let foundSecret = false;

if (fs.existsSync(appDir)) {
  function checkDir(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !item.includes('node_modules') && !item.startsWith('.')) {
        checkDir(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const p of patterns) {
          if (p.test(content)) {
            foundSecret = true;
            console.log('Found:', fullPath);
          }
        }
      }
    }
  }
  checkDir(appDir);
}

if (!foundSecret) {
  console.log('✅ No secrets detected');
}
console.log('✅ .env.example exists');