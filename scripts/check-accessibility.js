#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Accessibility Checker
 * Run: node scripts/check-accessibility.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src/my-app/app');

const checks = {
  imagesWithoutAlt: [],
  buttonsWithoutLabel: [],
  linksWithoutText: [],
  inputsWithoutLabel: [],
  missingMain: [],
  duplicateIds: [],
};

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  const idMap = new Map();
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        checkFile(content, fullPath, idMap);
      } catch (e) {}
    }
  }
}

function checkFile(content, filePath, idMap) {
  const relativePath = path.relative(process.cwd(), filePath);
  
  const imgRegex = /<img(?![^>]*alt)[^>]*>/gi;
  let match;
  const regex = new RegExp(imgRegex.source, 'gi');
  while ((match = regex.exec(content)) !== null) {
    checks.imagesWithoutAlt.push(relativePath);
    break;
  }
  
  const buttonRegex = /<button(?![^>]*aria-label)[^>]*>/gi;
  const buttonRegexGlobal = new RegExp(buttonRegex.source, 'gi');
  while ((match = buttonRegexGlobal.exec(content)) !== null) {
    if (!content.includes('children')) {
      checks.buttonsWithoutLabel.push(relativePath);
      break;
    }
  }
  
  const linkRegex = /<Link(?![^>]*aria-label)[^>]*>/gi;
  const linkRegexGlobal = new RegExp(linkRegex.source, 'gi');
  while ((match = linkRegexGlobal.exec(content)) !== null) {
    checks.linksWithoutText.push(relativePath);
    break;
  }
  
  const inputRegex = /<input(?![^>]*aria-label)(?![^>]*aria-labelledby)[^>]*>/gi;
  const inputRegexGlobal = new RegExp(inputRegex.source, 'gi');
  while ((match = inputRegexGlobal.exec(content)) !== null) {
    if (!content.includes('type="hidden"') && !content.includes('type=\'hidden\'')) {
      checks.inputsWithoutLabel.push(relativePath);
      break;
    }
  }
  
  if (!content.includes('<main') && !content.includes('<Main')) {
    checks.missingMain.push(relativePath);
  }
  
  const idRegex = /id=["']([^"']+)["']/g;
  let idMatch;
  while ((idMatch = idRegex.exec(content)) !== null) {
    const id = idMatch[1];
    if (idMap.has(id)) {
      checks.duplicateIds.push(`${relativePath} & ${idMap.get(id)}: "${id}"`);
    } else {
      idMap.set(id, relativePath);
    }
  }
}

function printResults() {
  console.log('\n♿ ACCESSIBILITY CHECKER');
  console.log('════════════════════════════════════════════════════════════\n');
  
  let totalIssues = 0;
  
  console.log('═══ IMAGES WITHOUT ALT  ═══');
  if (checks.imagesWithoutAlt.length === 0) {
    console.log('✅ All images have alt text');
  } else {
    totalIssues += checks.imagesWithoutAlt.length;
    for (const file of [...new Set(checks.imagesWithoutAlt)]) {
      console.log(`❌ ${file}`);
    }
  }
  
  console.log('\n═══ BUTTONS WITHOUT LABEL  ═══');
  if (checks.buttonsWithoutLabel.length === 0) {
    console.log('✅ All buttons have labels');
  } else {
    totalIssues += checks.buttonsWithoutLabel.length;
    for (const file of [...new Set(checks.buttonsWithoutLabel)]) {
      console.log(`❌ ${file}`);
    }
  }
  
  console.log('\n═══ LINKS WITHOUT TEXT  ═══');
  if (checks.linksWithoutText.length === 0) {
    console.log('✅ All links accessible');
  } else {
    totalIssues += checks.linksWithoutText.length;
    for (const file of [...new Set(checks.linksWithoutText)]) {
      console.log(`⚠️  ${file}`);
    }
  }
  
  console.log('\n═══ INPUTS WITHOUT LABEL  ═══');
  if (checks.inputsWithoutLabel.length === 0) {
    console.log('✅ All inputs have labels');
  } else {
    totalIssues += checks.inputsWithoutLabel.length;
    for (const file of [...new Set(checks.inputsWithoutLabel)]) {
      console.log(`❌ ${file}`);
    }
  }
  
  console.log('\n═══ MISSING <MAIN>  ═══');
  if (checks.missingMain.length === 0) {
    console.log('✅ All pages have <main>');
  } else {
    totalIssues += checks.missingMain.length;
    for (const file of [...new Set(checks.missingMain)]) {
      console.log(`⚠️  ${file}`);
    }
  }
  
  console.log('\n═══ DUPLICATE IDS  ═══');
  if (checks.duplicateIds.length === 0) {
    console.log('✅ No duplicate IDs');
  } else {
    totalIssues += checks.duplicateIds.length;
    for (const file of checks.duplicateIds) {
      console.log(`⚠️  ${file}`);
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════██');
  console.log(`  Total Issues: ${totalIssues}`);
  console.log('════════════════════════════════════════════════════════██\n');
  
  if (totalIssues === 0) {
    console.log('✅ No automated accessibility issues found\n');
    console.log('📋 Manual checks remaining:');
    console.log('   • Test with screen reader (NVDA/VoiceOver)');
    console.log('   • Test keyboard navigation');
    console.log('   • Check color contrast ratios');
    console.log('   • Test at 200% zoom');
  }
}

walkDir(srcDir);
printResults();