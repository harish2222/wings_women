#!/usr/bin/env node

/**
 * SEO Checker
 * Run: node scripts/check-seo.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src/my-app/app');

const seoChecks = {
  missingMeta: [],
  missingOg: [],
  missingCanonical: [],
  missingRobotsTxt: false,
  missingSitemap: false,
  pagesWithoutH1: [],
  duplicateH1: [],
};

function checkLayout(content) {
  if (content.includes('metadata')) {
    if (!content.includes('description')) {
      seoChecks.missingMeta.push('layout.tsx - no description');
    }
    if (!content.includes('openGraph')) {
      seoChecks.missingOg.push('layout.tsx - no openGraph');
    }
    if (!content.includes('metadataBase') && !content.includes('canonical')) {
      seoChecks.missingCanonical.push('layout.tsx');
    }
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (file === 'api') continue;
      walkDir(fullPath);
    } else if (file === 'layout.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      checkLayout(content);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      if (file === 'layout.tsx' || file === 'loading.tsx' || file === 'not-found.tsx' || file === 'error.tsx') continue;
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const relativePath = path.relative(srcDir, fullPath);
        
        if (!content.includes('metadata') && !content.includes('generateMetadata')) {
          if (!relativePath.includes('/')) {
            seoChecks.missingMeta.push(relativePath);
          }
        }
        
        const h1Matches = content.match(/<h1/gi) || [];
        if (h1Matches.length === 0) {
          seoChecks.pagesWithoutH1.push(relativePath);
        } else if (h1Matches.length > 1) {
          seoChecks.duplicateH1.push(`${relativePath}: ${h1Matches.length} h1s`);
        }
      } catch (e) {}
    }
  }
}

function checkStaticFiles() {
  const publicDir = path.join(process.cwd(), 'src/my-app/public');
  
  if (fs.existsSync(path.join(publicDir, 'robots.txt'))) {
    seoChecks.missingRobotsTxt = true;
  }
  
  if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
    seoChecks.missingSitemap = true;
  } else if (fs.existsSync(path.join(srcDir, 'sitemap.ts'))) {
    seoChecks.missingSitemap = true;
  }
}

function printResults() {
  console.log('\n🔍 SEO CHECKER');
  console.log('════════════════════════════════════════════════════════════\n');
  
  console.log('═══ META DESCRIPTIONS  ═══');
  if (seoChecks.missingMeta.length === 0) {
    console.log('✅ All pages have metadata');
  } else {
    console.log(`⚠️  ${seoChecks.missingMeta.length} pages may need metadata`);
    for (const file of seoChecks.missingMeta.slice(0, 5)) {
      console.log(`   ${file}`);
    }
  }
  
  console.log('\n═══ OPEN GRAPH  ═══');
  if (seoChecks.missingOg.length === 0) {
    console.log('✅ Open Graph configured');
  } else {
    console.log(`❌ ${seoChecks.missingOg.join(', ')}`);
  }
  
  console.log('\n═══ CANONICAL URLS  ═══');
  if (seoChecks.missingCanonical.length === 0) {
    console.log('✅ Canonical URLs set');
  } else {
    console.log(`⚠️  ${seoChecks.missingCanonical.join(', ')}`);
  }
  
  console.log('\n═══ ROBOTS.TXT  ═══');
  if (seoChecks.missingRobotsTxt) {
    console.log('✅ robots.txt exists');
  } else {
    console.log('⚠️  Create public/robots.txt');
  }
  
  console.log('\n═══ SITEMAP  ═══');
  if (seoChecks.missingSitemap) {
    console.log('✅ Sitemap configured');
  } else {
    console.log('⚠️  Create app/sitemap.ts');
  }
  
  console.log('\n═══ H1 HEADERS  ═══');
  if (seoChecks.pagesWithoutH1.length === 0) {
    console.log('✅ All pages have H1');
  } else {
    console.log(`⚠️  ${seoChecks.pagesWithoutH1.length} pages missing H1`);
  }
  
  if (seoChecks.duplicateH1.length > 0) {
    console.log('\n⚠️  Multiple H1 tags:');
    for (const file of seoChecks.duplicateH1) {
      console.log(`   ${file}`);
    }
  }
  
  let totalIssues = seoChecks.missingMeta.length + seoChecks.missingOg.length + 
    seoChecks.missingCanonical.length + seoChecks.pagesWithoutH1.length +
    (seoChecks.missingRobotsTxt ? 0 : 1) + (seoChecks.missingSitemap ? 0 : 1);
  
  console.log('\n════════════════════════════════════════════════════════██');
  console.log(`  Total Issues: ${totalIssues}`);
  console.log('════════════════════════════════════════════════════════██\n');
  
  if (totalIssues === 0) {
    console.log('✅ No major SEO issues\n');
    console.log('📋 Manual checks:');
    console.log('   • Submit sitemap to Google Search Console');
    console.log('   • Verify Open Graph images');
    console.log('   • Test structured data');
    console.log('   • Check internal linking');
  }
}

walkDir(srcDir);
checkStaticFiles();
printResults();