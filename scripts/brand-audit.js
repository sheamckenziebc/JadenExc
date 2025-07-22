#!/usr/bin/env node

// BRANDBOT: Brand Audit Script
// Scans entire codebase for remaining old brand tokens
// Usage: node scripts/brand-audit.js [--tokens custom-tokens.json]

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Default token patterns to search for
const DEFAULT_TOKENS = [
  // Company names
  /loyalty\s*6/gi,
  /loyalty\s*six/gi,
  /\bl6\b/gi,
  /loyalty.*energy.*services/gi,
  
  // Domains
  /loyalty6\.ca/gi,
  /www\.loyalty6\.ca/gi,
  
  // Contact info
  /250[\s\-\.]?719[\s\-\.]?4573/gi,
  /\+1[\s\-\.]?250[\s\-\.]?719[\s\-\.]?4573/gi,
  /info@loyalty6\.ca/gi,
  
  // Old colors (Loyalty6 brand colors)
  /#B8C49D/gi,
  /#556B2F/gi,
  /#8BA446/gi,
  /#3A4A1C/gi,
  
  // Location references
  /dawson\s*creek/gi,
  
  // Industry references that need updating
  /oil.*gas/gi,
  /energy.*sector/gi,
  /pipefitting/gi,
  /crew.*truck/gi,
  /hot.*shot/gi,
  
  // Social media
  /linkedin\.com\/company\/loyalty/gi,
  /facebook\.com.*loyalty/gi,
  
  // File references
  /l6logo/gi,
  /loyalty.*logo/gi,
  
  // Business references
  /ccab\.com.*loyalty/gi,
  /first.*nations.*majority/gi
];

// Files and directories to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /\.vscode/,
  /\.idea/,
  /dist/,
  /build/,
  /coverage/,
  /\.log$/,
  /brand-audit\.js$/,
  /brand-config\.js$/,
  /images\/_OLD/,
  /\.min\.(js|css)$/
];

// File extensions to scan
const INCLUDE_EXTENSIONS = [
  '.html', '.css', '.js', '.json', '.xml', '.txt', '.md',
  '.yml', '.yaml', '.conf', '.config'
];

class BrandAuditor {
  constructor(tokensFile = null) {
    this.tokens = DEFAULT_TOKENS;
    this.results = [];
    this.processedFiles = 0;
    this.totalMatches = 0;
    
    if (tokensFile && fs.existsSync(tokensFile)) {
      try {
        const customTokens = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));
        this.tokens = customTokens.map(token => new RegExp(token, 'gi'));
        console.log(`📋 Loaded ${this.tokens.length} custom tokens from ${tokensFile}`);
      } catch (error) {
        console.error(`❌ Error loading custom tokens: ${error.message}`);
        process.exit(1);
      }
    }
  }

  shouldExcludeFile(filePath) {
    return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
  }

  shouldIncludeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return INCLUDE_EXTENSIONS.includes(ext);
  }

  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, lineNumber) => {
        this.tokens.forEach((tokenPattern) => {
          const matches = line.match(tokenPattern);
          if (matches) {
            matches.forEach(match => {
              this.results.push({
                file: filePath,
                line: lineNumber + 1,
                token: match,
                context: this.getContext(lines, lineNumber),
                pattern: tokenPattern.source
              });
              this.totalMatches++;
            });
          }
        });
      });
      
      this.processedFiles++;
    } catch (error) {
      console.error(`❌ Error reading ${filePath}: ${error.message}`);
    }
  }

  getContext(lines, lineNumber) {
    const start = Math.max(0, lineNumber - 1);
    const end = Math.min(lines.length, lineNumber + 2);
    return lines.slice(start, end).join('\n');
  }

  scanDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (this.shouldExcludeFile(fullPath)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (entry.isFile() && this.shouldIncludeFile(fullPath)) {
        this.scanFile(fullPath);
      }
    }
  }

  generateReport() {
    console.log('\n🔍 BRAND AUDIT REPORT');
    console.log('='.repeat(50));
    console.log(`📁 Files processed: ${this.processedFiles}`);
    console.log(`🎯 Total matches found: ${this.totalMatches}`);
    console.log(`🔍 Patterns searched: ${this.tokens.length}`);
    
    if (this.results.length === 0) {
      console.log('\n✅ SUCCESS: No old brand tokens found!');
      return true;
    }
    
    console.log('\n❌ ISSUES FOUND:');
    console.log('-'.repeat(50));
    
    // Group results by file
    const byFile = this.results.reduce((acc, result) => {
      if (!acc[result.file]) acc[result.file] = [];
      acc[result.file].push(result);
      return acc;
    }, {});
    
    Object.entries(byFile).forEach(([file, matches]) => {
      console.log(`\n📄 ${file} (${matches.length} matches)`);
      matches.forEach(match => {
        console.log(`   Line ${match.line}: "${match.token}" (pattern: ${match.pattern})`);
        // Show a snippet of context
        const contextLine = match.context.split('\n')[1] || match.context.split('\n')[0];
        if (contextLine.trim()) {
          console.log(`   Context: ${contextLine.trim().substring(0, 80)}...`);
        }
      });
    });
    
    console.log('\n📊 SUMMARY BY PATTERN:');
    console.log('-'.repeat(30));
    
    const byPattern = this.results.reduce((acc, result) => {
      acc[result.pattern] = (acc[result.pattern] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(byPattern)
      .sort(([,a], [,b]) => b - a)
      .forEach(([pattern, count]) => {
        console.log(`${count.toString().padStart(3)} matches: ${pattern}`);
      });
    
    return false;
  }

  async run(startDir = '.') {
    console.log('🚀 Starting brand audit...');
    console.log(`📂 Scanning directory: ${path.resolve(startDir)}`);
    console.log(`🔍 Searching for ${this.tokens.length} token patterns`);
    
    const startTime = Date.now();
    this.scanDirectory(startDir);
    const endTime = Date.now();
    
    console.log(`⏱️  Scan completed in ${endTime - startTime}ms`);
    
    const success = this.generateReport();
    
    if (!success) {
      console.log('\n💡 NEXT STEPS:');
      console.log('1. Review and update the files listed above');
      console.log('2. Replace old tokens with BRAND imports from brand/brand-config.js');
      console.log('3. Add BRANDBOT comments where tokens are replaced');
      console.log('4. Re-run this audit until no tokens remain');
      
      process.exit(1);
    }
    
    console.log('\n🎉 Brand transformation appears complete!');
    process.exit(0);
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  let tokensFile = null;
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tokens' && i + 1 < args.length) {
      tokensFile = args[i + 1];
      i++; // Skip next argument
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
🔍 Brand Audit Tool

Usage: node scripts/brand-audit.js [options]

Options:
  --tokens FILE     Use custom token patterns from JSON file
  --help           Show this help message

Examples:
  node scripts/brand-audit.js
  node scripts/brand-audit.js --tokens custom-tokens.json

The audit will scan all files (excluding node_modules, .git, etc.) 
and report any remaining references to the old brand.
      `);
      process.exit(0);
    }
  }
  
  const auditor = new BrandAuditor(tokensFile);
  auditor.run().catch(error => {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}

module.exports = { BrandAuditor }; 