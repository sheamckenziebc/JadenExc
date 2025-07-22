#!/usr/bin/env node

/**
 * BRANDBOT: Brand Audit Script
 * Scans the codebase for any remaining Island Drains references or legacy brand elements
 * Usage: node scripts/brand-audit.js
 */

const fs = require('fs');
const path = require('path');

// Brand tokens to search for (case-insensitive)
const BRAND_TOKENS = [
  // Company names (exact matches)
  'island drains & excavation',
  'island drains and excavation',
  'islanddrainsandexcavation',
  
  // Old contact info
  '818-5611',
  '2508185611',
  '+12508185611',
  'info@islanddrainsandexcavation.ca',
  
  // Old domain
  'islanddrainsandexcavation.ca',
  
  // Old colors
  '#0C4A6E',
  '#FCD34D', 
  '#0369A1',
  
  // Old service areas (exact matches)
  'victoria & southern vancouver island',
  'southern vancouver island',
  
  // Old services (exact matches)
  'lift station supply & install',
  'perimeter drains',
  'structure demolition'
];

// Words to exclude from search (legitimate words that might cause false positives)
const EXCLUDE_WORDS = [
  'drainage', // legitimate word in landscaping context
  'drain', // legitimate word in landscaping context
  'victoria', // legitimate word in other contexts
  'ide', // legitimate abbreviation
  'island', // legitimate word
  'drains' // legitimate word
];

// Directories to exclude
const EXCLUDE_DIRS = [
  '.git',
  'node_modules',
  '.idea',
  '.vscode',
  'dist',
  'build'
];

// File extensions to scan
const SCAN_EXTENSIONS = [
  '.html',
  '.css',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.xml'
];

// Results storage
let auditResults = [];
let totalIssues = 0;

/**
 * Check if a directory should be excluded
 */
function shouldExcludeDir(dirName) {
  return EXCLUDE_DIRS.includes(dirName);
}

/**
 * Check if a file should be scanned
 */
function shouldScanFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return SCAN_EXTENSIONS.includes(ext);
}

/**
 * Check if a match is a false positive
 */
function isFalsePositive(line, token) {
  const lowerLine = line.toLowerCase();
  const lowerToken = token.toLowerCase();
  
  // Check if it's just a legitimate word
  if (EXCLUDE_WORDS.includes(lowerToken)) {
    // Only flag if it's clearly part of the old brand name
    if (lowerLine.includes('island drains') || 
        lowerLine.includes('islanddrainsandexcavation') ||
        lowerLine.includes('victoria & southern vancouver island')) {
      return false;
    }
    return true;
  }
  
  return false;
}

/**
 * Search for brand tokens in a file
 */
function searchFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    lines.forEach((line, lineNumber) => {
      const lineNum = lineNumber + 1;
      const lowerLine = line.toLowerCase();

      BRAND_TOKENS.forEach(token => {
        if (lowerLine.includes(token.toLowerCase())) {
          // Check for false positives
          if (!isFalsePositive(line, token)) {
            issues.push({
              line: lineNum,
              token: token,
              content: line.trim()
            });
          }
        }
      });
    });

    if (issues.length > 0) {
      auditResults.push({
        file: filePath,
        issues: issues
      });
      totalIssues += issues.length;
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

/**
 * Recursively scan directory
 */
function scanDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!shouldExcludeDir(item)) {
          scanDirectory(fullPath);
        }
      } else if (stat.isFile() && shouldScanFile(item)) {
        searchFile(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
}

/**
 * Print audit results
 */
function printResults() {
  console.log('\n🎨 BRANDBOT: Brand Audit Results\n');
  console.log('=' .repeat(60));

  if (auditResults.length === 0) {
    console.log('✅ No brand issues found! The transformation is complete.');
    console.log('🎉 All Island Drains references have been successfully updated to Jaden\'s Excavation & Landscaping.');
    return true;
  }

  console.log(`❌ Found ${totalIssues} brand issues across ${auditResults.length} files:\n`);

  auditResults.forEach(result => {
    console.log(`📁 ${result.file}`);
    result.issues.forEach(issue => {
      console.log(`   Line ${issue.line}: "${issue.token}"`);
      console.log(`   Content: ${issue.content.substring(0, 80)}${issue.content.length > 80 ? '...' : ''}`);
    });
    console.log('');
  });

  console.log('=' .repeat(60));
  console.log('🔧 To fix these issues:');
  console.log('   1. Update the identified files with correct Jaden\'s Excavation branding');
  console.log('   2. Replace old contact information with new details');
  console.log('   3. Update service areas to Metro Vancouver');
  console.log('   4. Replace old color codes with new brand colors');
  console.log('   5. Run this audit again to verify fixes\n');

  return false;
}

/**
 * Main audit function
 */
function runAudit() {
  console.log('🔍 BRANDBOT: Starting brand audit...');
  console.log(`📂 Scanning directory: ${process.cwd()}`);
  console.log(`🎯 Looking for ${BRAND_TOKENS.length} brand tokens...\n`);

  const startTime = Date.now();
  scanDirectory('.');
  const endTime = Date.now();

  console.log(`⏱️  Audit completed in ${endTime - startTime}ms`);

  const isClean = printResults();
  
  // Exit with appropriate code
  process.exit(isClean ? 0 : 1);
}

// Run the audit if this script is executed directly
if (require.main === module) {
  runAudit();
}

module.exports = {
  runAudit,
  BRAND_TOKENS,
  scanDirectory,
  searchFile
}; 