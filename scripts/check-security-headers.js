#!/usr/bin/env node

/**
 * Security Headers Checker
 * Checks if production site has required security headers
 * Run: node scripts/check-security-headers.js
 */

const REQUIRED_HEADERS = [
  { name: 'Strict-Transport-Security', key: 'HSTS', required: true },
  { name: 'X-Content-Type-Options', key: 'nosniff', required: true },
  { name: 'X-Frame-Options', key: 'DENY', required: true },
  { name: 'X-XSS-Protection', key: '0', required: false, note: 'Legacy' },
  { name: 'Content-Security-Policy', key: 'default', required: true },
  { name: 'Referrer-Policy', key: 'strict', required: false },
  { name: 'Permissions-Policy', key: '', required: false },
];

const RECOMMENDED_COOKIES = [
  { name: 'Secure', required: true },
  { name: 'HttpOnly', required: true },
  { name: 'SameSite', required: true },
];

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://www.wingswomencenter.com';

async function checkSecurityHeaders(url) {
  console.log(`\n🔒 Checking security headers for: ${url}\n`);
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  SECURITY HEADERS');
    console.log('═══════════════════════════════════════════════════════════');
    
    let passCount = 0;
    let failCount = 0;
    
    for (const header of REQUIRED_HEADERS) {
      const value = response.headers.get(header.name.toLowerCase());
      const hasHeader = value !== null;
      
      if (hasHeader) {
        if (header.required) {
          console.log(`✅ ${header.name}: ${value ? 'Present' : 'Missing'}`);
          passCount++;
        } else {
          console.log(`⚠️ ${header.name}: ${value || 'Not set'} ${header.note ? `(${header.note})` : ''}`);
        }
      } else {
        if (header.required) {
          console.log(`❌ ${header.name}: MISSING ${header.required ? '(Required)' : ''}`);
          failCount++;
        } else {
          console.log(`⚠️ ${header.name}: Not set (Recommended)`);
        }
      }
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  RECOMMENDED CHECKS');
    console.log('═══════════════════════════════════════════════════');
    
    console.log(`\n📋 Manual Checks:`);
    console.log(`   1. Visit securityheaders.com`);
    console.log(`   2. Check ssllabs.com for SSL grade (target: A+)`);
    console.log(`   3. Verify CSP doesn't block analytics`);
    console.log(`   4. Check cookies have HttpOnly, Secure, SameSite`);
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('  SUMMARY');
    console.log('═══════════════════════════════════════════════════');
    console.log(`   ✅ Passed: ${passCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    
    if (failCount > 0) {
      console.log(`\n⚠️  Configure missing headers in next.config.js:\n`);
      console.log(`   // next.config.js`);
      console.log(`   async headers() {`);
      console.log(`     return [`);
      console.log(`       {`);
      console.log(`         source: '/(.*)',`);
      console.log(`         headers: [`);
      console.log(`           { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },`);
      console.log(`           { key: 'X-Content-Type-Options', value: 'nosniff' },`);
      console.log(`           { key: 'X-Frame-Options', value: 'DENY' },`);
      console.log(`           { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },`);
      console.log(`         ]`);
      console.log(`       }`);
      console.log(`     ]`);
      console.log(`   }`);
    }
    
  } catch (e) {
    console.log(`❌ Error fetching ${url}: ${e.message}`);
    console.log(`\n💡 Make sure:`);
    console.log(`   1. Production URL is deployed`);
    console.log(`   2. DNS is pointing to Vercel`);
    console.log(`   3. SSL certificate is issued`);
  }
}

const url = process.argv[2] || PRODUCTION_URL;
checkSecurityHeaders(url);