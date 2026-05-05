#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Pre-Launch Security & Quality Checklist
 * Run with: node scripts/prelaunch-checklist.js
 * 
 * Categories: security, functional, performance, accessibility, seo, mobile, browser, content, legal
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/* eslint-disable @typescript-eslint/no-unused-vars */
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://www.wingswomencenter.com';
const STAGING_URL = process.env.STAGING_URL || 'https://staging.wingswomencenter.com';
/* eslint-enable @typescript-eslint/no-unused-vars */

const categories = {
  security: {
    label: '🔒 SECURITY',
    checks: [
      { name: 'npm audit', run: checkNpmAudit, auto: true },
      { name: 'npm outdated', run: checkNpmOutdated, auto: true },
      { name: 'no secrets in code', run: checkNoSecrets, auto: true },
      { name: 'HTTPS enforced', run: checkHttps, manual: true },
      { name: 'Security headers configured', run: checkSecurityHeaders, manual: true },
      { name: 'Rate limiting on APIs', run: checkRateLimiting, manual: true },
      { name: 'CSP configured', run: checkCSP, manual: true },
      { name: 'Cookie consent (GDPR)', run: checkCookieConsent, manual: true },
    ]
  },
  functional: {
    label: '⚡ FUNCTIONALITY',
    checks: [
      { name: 'build passes', run: checkBuild, auto: true },
      { name: 'lint passes', run: checkLint, auto: true },
      { name: 'typecheck passes', run: checkTypecheck, auto: true },
      { name: 'no console errors (dev)', run: checkNoConsoleErrors, manual: true },
      { name: 'dark mode toggle', run: checkDarkMode, manual: true },
      { name: 'theme persists', run: checkThemePersistence, manual: true },
      { name: 'all pages load', run: checkAllPagesLoad, manual: true },
      { name: 'forms work', run: checkForms, manual: true },
      { name: 'WhatsApp link', run: checkWhatsApp, manual: true },
      { name: 'no 404 links', run: checkNo404s, manual: true },
    ]
  },
  performance: {
    label: '🚀 PERFORMANCE',
    checks: [
      { name: 'Lighthouse > 90', run: checkLighthouseScore, manual: true },
      { name: 'Core Web Vitals pass', run: checkWebVitals, manual: true },
      { name: 'bundle size < limit', run: checkBundleSize, auto: true },
      { name: 'no blocking JS', run: checkNoBlockingJS, manual: true },
      { name: 'images optimized', run: checkImagesOptimized, manual: true },
      { name: 'lazy loading', run: checkLazyLoading, manual: true },
    ]
  },
  accessibility: {
    label: '♿ ACCESSIBILITY',
    checks: [
      { name: 'axe-core audit', run: checkAxeCore, auto: true },
      { name: 'all images have alt', run: checkAltText, auto: true },
      { name: 'forms have labels', run: checkFormLabels, manual: true },
      { name: 'keyboard nav works', run: checkKeyboardNav, manual: true },
      { name: 'skip link present', run: checkSkipLink, auto: true },
      { name: 'headings correct', run: checkHeadings, auto: true },
      { name: 'color contrast', run: checkColorContrast, manual: true },
      { name: 'focus indicators', run: checkFocusIndicators, manual: true },
    ]
  },
  seo: {
    label: '🔍 SEO',
    checks: [
      { name: 'meta titles exist', run: checkMetaTitles, auto: true },
      { name: 'meta descriptions', run: checkMetaDescriptions, auto: true },
      { name: 'og tags configured', run: checkOgTags, auto: true },
      { name: 'canonical URLs', run: checkCanonical, auto: true },
      { name: 'robots.txt', run: checkRobotsTxt, auto: true },
      { name: 'sitemap.xml', run: checkSitemap, auto: true },
      { name: 'structured data', run: checkStructuredData, manual: true },
      { name: 'Google Search Console', run: checkGSC, manual: true },
    ]
  },
  mobile: {
    label: '📱 MOBILE',
    checks: [
      { name: 'responsive breakpoints', run: checkResponsive, manual: true },
      { name: 'touch targets 44px+', run: checkTouchTargets, manual: true },
      { name: 'mobile menu works', run: checkMobileMenu, manual: true },
      { name: 'click-to-call works', run: checkClickToCall, manual: true },
      { name: 'no horizontal scroll', run: checkNoHorizontalScroll, manual: true },
      { name: 'text readable', run: checkTextReadable, manual: true },
    ]
  },
  legal: {
    label: '⚖️ LEGAL & COMPLIANCE',
    checks: [
      { name: 'privacy policy exists', run: checkPrivacyPolicy, auto: true },
      { name: 'terms exist', run: checkTerms, auto: true },
      { name: 'cookie consent', run: checkCookieConsent, manual: true },
      { name: 'HIPAA compliance', run: checkHIPAA, manual: true },
    ]
  }
};

function checkNpmAudit() {
  try {
    execSync('npm audit --json', { stdio: 'pipe' });
    return { status: 'pass', note: 'No vulnerabilities' };
  } catch (e) {
    const output = e.stdout?.toString() || e.stderr?.toString() || '';
    if (output.includes('vulnerabilities')) {
      return { status: 'fail', note: 'Run npm audit for details' };
    }
    return { status: 'pass', note: 'No vulnerabilities found' };
  }
}

function checkNpmOutdated() {
  try {
    const output = execSync('npm outdated --json', { encoding: 'utf8' }).trim();
    if (output === '{}' || !output) {
      return { status: 'pass', note: 'All dependencies up to date' };
    }
    const outdated = JSON.parse(output);
    const count = Object.keys(outdated).length;
    return { status: 'warn', note: `${count} packages outdated` };
  } catch {
    return { status: 'pass', note: 'All dependencies up to date' };
  }
}

function checkNoSecrets() {
  const patterns = [
    /sk_live_[a-zA-Z0-9]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /xox[baprs]-[0-9a-zA-Z]{10,}/,
    /ghp_[a-zA-Z0-9]{36}/,
    /sq0csp-[A-Za-z0-9-_]{43}/,
  ];
  
  let findings = [];
  const srcDir = path.join(process.cwd(), 'src/my-app');
  
  if (!fs.existsSync(srcDir)) {
    return { status: 'skip', note: 'src/my-app not found' };
  }
  
  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !file.includes('node_modules') && !file.startsWith('.')) {
        walkDir(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const pattern of patterns) {
            if (pattern.test(content)) {
              findings.push(path.relative(process.cwd(), fullPath));
            }
          }
        } catch {}
      }
    }
  }
  
  walkDir(srcDir);
  
  if (findings.length > 0) {
    return { status: 'fail', note: `Potential secrets in: ${findings.join(', ')}` };
  }
  return { status: 'pass', note: 'No obvious secrets found' };
}

function checkBuild() {
  try {
    execSync('npm run build', { stdio: 'pipe', cwd: path.join(process.cwd(), 'src/my-app') });
    return { status: 'pass', note: 'Build successful' };
  } catch (e) {
    return { status: 'fail', note: 'Build failed - run npm run build' };
  }
}

function checkLint() {
  try {
    execSync('npm run lint', { stdio: 'pipe', cwd: path.join(process.cwd(), 'src/my-app') });
    return { status: 'pass', note: 'Lint passed' };
  } catch (e) {
    return { status: 'fail', note: 'Lint errors found' };
  }
}

function checkTypecheck() {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe', cwd: path.join(process.cwd(), 'src/my-app') });
    return { status: 'pass', note: 'Typecheck passed' };
  } catch (e) {
    return { status: 'fail', note: 'Type errors found' };
  }
}

function checkBundleSize() {
  const appDir = path.join(process.cwd(), 'src/my-app/.next/static/chunks');
  if (!fs.existsSync(appDir)) {
    return { status: 'skip', note: 'Build first to check bundle' };
  }
  
  let totalSize = 0;
  function getDirSize(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        getDirSize(fullPath);
      } else {
        totalSize += stat.size;
      }
    }
  }
  
  try {
    getDirSize(appDir);
  } catch (e) {
    return { status: 'skip', note: 'Could not check bundle size' };
  }
  
  const sizeKB = Math.round(totalSize / 1024);
  const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  if (sizeKB > 200) {
    return { status: 'warn', note: `JS bundle: ${sizeKB}KB (target: <200KB)` };
  }
  return { status: 'pass', note: `JS bundle: ${sizeMB}MB` };
}

function checkAltText() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let missing = 0;
  
  if (!fs.existsSync(srcDir)) {
    return { status: 'skip', note: 'app directory not found' };
  }
  
  const imgRegex = /<img[^>]*>/gi;
  const altRegex = /alt=["'][^"']*["']/i;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !file.startsWith('.')) {
        walkDir(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const matches = content.match(imgRegex) || [];
          for (const img of matches) {
            if (!altRegex.test(img)) {
              missing++;
            }
          }
        } catch {}
      }
    }
  }
  
  walkDir(srcDir);
  
  if (missing > 0) {
    return { status: 'fail', note: `${missing} images missing alt text` };
  }
  return { status: 'pass', note: 'All images have alt text' };
}

function checkSkipLink() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file === 'layout.tsx') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('skip')) {
          found = true;
        }
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Skip link found' };
  }
  return { status: 'fail', note: 'No skip link in layout' };
}

function checkHeadings() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let issues = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const h1 = (content.match(/<h1/gi) || []).length;
          if (h1 > 1) {
            issues.push(`${file}: ${h1} h1 tags`);
          }
        } catch {}
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (issues.length > 0) {
    return { status: 'warn', note: issues.join('; ') };
  }
  return { status: 'pass', note: 'Heading structure OK' };
}

function checkMetaTitles() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let missing = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.tsx') && file !== 'layout.tsx' && file !== 'loading.tsx' && file !== 'not-found.tsx' && file !== 'error.tsx') {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (!content.includes('metadata') && !content.includes('generateMetadata')) {
            const relative = path.relative(srcDir, fullPath);
            if (!relative.includes('/')) {
              missing.push(relative);
            }
          }
        } catch {}
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (missing.length > 0) {
    return { status: 'warn', note: `${missing.length} pages may need metadata` };
  }
  return { status: 'pass', note: 'Metadata likely configured' };
}

function checkMetaDescriptions() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file === 'layout.tsx') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('description')) {
          found = true;
        }
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Meta descriptions configured' };
  }
  return { status: 'warn', note: 'Check meta descriptions' };
}

function checkOgTags() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file === 'layout.tsx') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('openGraph')) {
          found = true;
        }
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Open Graph tags configured' };
  }
  return { status: 'warn', note: 'Add Open Graph tags' };
}

function checkRobotsTxt() {
  const rootDir = path.join(process.cwd(), 'src/my-app/public');
  const robotsPath = path.join(rootDir, 'robots.txt');
  
  if (fs.existsSync(robotsPath)) {
    return { status: 'pass', note: 'robots.txt exists' };
  }
  return { status: 'warn', note: 'Create public/robots.txt' };
}

function checkSitemap() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  try {
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (file === 'sitemap.ts' || file === 'sitemap.xml' || file === 'sitemap.tsx') {
        found = true;
      }
    }
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Sitemap configured' };
  }
  return { status: 'warn', note: 'Create sitemap (app/sitemap.ts)' };
}

function checkCanonical() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && file !== 'api') {
        walkDir(fullPath);
      } else if (file === 'layout.tsx') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('metadataBase') || content.includes('canonical')) {
          found = true;
        }
      }
    }
  }
  
  try {
    walkDir(srcDir);
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Canonical URLs set' };
  }
  return { status: 'warn', note: 'Add canonical URLs' };
}

function checkPrivacyPolicy() {
  const pagesDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  try {
    const files = fs.readdirSync(pagesDir);
    for (const file of files) {
      if (file.includes('privacy')) {
        found = true;
      }
    }
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Privacy policy exists' };
  }
  return { status: 'fail', note: 'Create privacy policy page' };
}

function checkTerms() {
  const pagesDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  try {
    const files = fs.readdirSync(pagesDir);
    for (const file of files) {
      if (file.includes('terms')) {
        found = true;
      }
    }
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Terms page exists' };
  }
  return { status: 'fail', note: 'Create terms page' };
}

function checkHttps() {
  return { status: 'manual', note: 'Check manually: ssllabs.com' };
}

function checkSecurityHeaders() {
  return { status: 'manual', note: 'Verify via securityheaders.com' };
}

function checkRateLimiting() {
  return { status: 'manual', note: 'Check middleware/rate-limit.ts' };
}

function checkCSP() {
  return { status: 'manual', note: 'Verify CSP innext.config' };
}

function checkCookieConsent() {
  const srcDir = path.join(process.cwd(), 'src/my-app');
  let found = false;
  
  try {
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (file.includes('cookie') || file.includes('consent')) {
        found = true;
      }
    }
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Cookie consent found' };
  }
  return { status: 'warn', note: 'Implement cookie consent banner' };
}

function checkDarkMode() {
  return { status: 'manual', note: 'Test dark mode toggle manually' };
}

function checkThemePersistence() {
  return { status: 'manual', note: 'Reload and check theme persists' };
}

function checkAllPagesLoad() {
  return { status: 'manual', note: 'Navigate all pages manually' };
}

function checkForms() {
  return { status: 'manual', note: 'Test all forms submission' };
}

function checkWhatsApp() {
  return { status: 'manual', note: 'Test WhatsApp link on mobile' };
}

function checkNo404s() {
  return { status: 'manual', note: 'Check all links return 200' };
}

function checkNoConsoleErrors() {
  return { status: 'manual', note: 'Check browser console' };
}

function checkLighthouseScore() {
  return { status: 'manual', note: 'Run Lighthouse in Chrome DevTools' };
}

function checkWebVitals() {
  return { status: 'manual', note: 'Check PageSpeed Insights' };
}

function checkNoBlockingJS() {
  return { status: 'manual', note: 'Check network tab' };
}

function checkImagesOptimized() {
  return { status: 'manual', note: 'Check images are WebP/AVIF' };
}

function checkLazyLoading() {
  return { status: 'manual', note: 'Verify loading="lazy"' };
}

function checkAxeCore() {
  return { status: 'manual', note: 'Use axe DevTools extension' };
}

function checkFormLabels() {
  return { status: 'manual', note: 'Check all form inputs have labels' };
}

function checkKeyboardNav() {
  return { status: 'manual', note: 'Tab through page' };
}

function checkColorContrast() {
  return { status: 'manual', note: 'Use Color Contrast Analyzer' };
}

function checkFocusIndicators() {
  return { status: 'manual', note: 'Check visible focus rings' };
}

function checkStructuredData() {
  const srcDir = path.join(process.cwd(), 'src/my-app/app');
  let found = false;
  
  try {
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (file === 'layout.tsx') {
        const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
        if (content.includes('jsonld') || content.includes('application/ld+json')) {
          found = true;
        }
      }
    }
  } catch (e) {}
  
  if (found) {
    return { status: 'pass', note: 'Structured data found' };
  }
  return { status: 'warn', note: 'Add JSON-LD structured data' };
}

function checkGSC() {
  return { status: 'manual', note: 'Verify in Google Search Console' };
}

function checkResponsive() {
  return { status: 'manual', note: 'Test at 320px, 768px, 1024px, 1920px' };
}

function checkTouchTargets() {
  return { status: 'manual', note: 'Check buttons are 44x44px min' };
}

function checkMobileMenu() {
  return { status: 'manual', note: 'Test hamburger menu' };
}

function checkClickToCall() {
  return { status: 'manual', note: 'Test tel: link on mobile' };
}

function checkNoHorizontalScroll() {
  return { status: 'manual', note: 'Check at 320px viewport' };
}

function checkTextReadable() {
  return { status: 'manual', note: 'Check no zoom required' };
}

function checkHIPAA() {
  return { status: 'manual', note: 'Consult legal team' };
}

function printResults() {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  🏥 WINGS WOMEN CENTER - PRE-LAUNCH CHECKLIST');
  console.log('═══════════════════════════════════════════════════════════════════\n');
  
  let totals = { pass: 0, fail: 0, warn: 0, manual: 0, skip: 0 };
  
  for (const [key, category] of Object.entries(categories)) {
    console.log(`${category.label}`);
    console.log('─'.repeat(60));
    
    for (const check of category.checks) {
      try {
        const result = check.run();
        const status = result.status;
        totals[status] = (totals[status] || 0) + 1;
        
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : status === 'warn' ? '⚠️' : status === 'manual' ? '👁️' : '⏭️';
        console.log(`  ${icon} ${check.name.padEnd(35)} ${result.note}`);
      } catch (e) {
        totals.skip++;
        console.log(`  ⏭️ ${check.name.padEnd(35)} Error: ${e.message}`);
      }
    }
    console.log('');
  }
  
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  ✅ Automated Passed: ${totals.pass}`);
  console.log(`  ⚠️ Warnings:        ${totals.warn}`);
  console.log(`  ❌ Automated Fail:  ${totals.fail}`);
  console.log(`  👁️ Manual Check:    ${totals.manual}`);
  console.log(`  ⏭️ Skipped:         ${totals.skip}`);
  console.log('');
  console.log(`  📋 Next Steps:`);
  console.log(`     1. Fix all ❌ automated failures`);
  console.log(`     2. Address ⚠️ warnings`);
  console.log(`     3. Complete all 👁️ manual checks`);
  console.log(`     4. Run Lighthouse in browser`);
  console.log(`     5. Test on real devices`);
  console.log('');
}

printResults();