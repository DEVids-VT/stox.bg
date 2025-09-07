#!/usr/bin/env node

/**
 * SEO Validation Script for Stox.bg
 * Validates structured data, meta tags, and Bulgarian optimization
 */

const https = require('https');
const { JSDOM } = require('jsdom');

const SITE_URL = process.env.SITE_URL || 'https://stox.bg';

// Test URLs to validate
const TEST_URLS = [
  '/',
  '/about',
  '/contact',
  '/business',
  '/technology',
];

class SEOValidator {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      errors: [],
      warnings: [],
    };
  }

  async validatePage(url) {
    console.log(`\n🔍 Validating: ${SITE_URL}${url}`);
    
    try {
      const html = await this.fetchPage(`${SITE_URL}${url}`);
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Validate basic meta tags
      this.validateBasicMeta(document, url);
      
      // Validate structured data
      this.validateStructuredData(document, url);
      
      // Validate Bulgarian optimization
      this.validateBulgarianOptimization(document, url);
      
      // Validate performance hints
      this.validatePerformanceHints(document, url);

    } catch (error) {
      this.fail(`Failed to validate ${url}: ${error.message}`);
    }
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  validateBasicMeta(document, url) {
    // Title tag
    const title = document.querySelector('title');
    if (!title || !title.textContent.trim()) {
      this.fail(`Missing title tag on ${url}`);
    } else if (title.textContent.length > 60) {
      this.warn(`Title too long (${title.textContent.length} chars) on ${url}`);
    } else {
      this.pass(`Title tag valid on ${url}`);
    }

    // Meta description
    const description = document.querySelector('meta[name="description"]');
    if (!description || !description.getAttribute('content')) {
      this.fail(`Missing meta description on ${url}`);
    } else if (description.getAttribute('content').length > 160) {
      this.warn(`Meta description too long on ${url}`);
    } else {
      this.pass(`Meta description valid on ${url}`);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (!ogTitle) this.fail(`Missing og:title on ${url}`);
    if (!ogDescription) this.fail(`Missing og:description on ${url}`);
    if (!ogImage) this.fail(`Missing og:image on ${url}`);

    // Canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      this.warn(`Missing canonical link on ${url}`);
    }
  }

  validateStructuredData(document, url) {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (jsonLdScripts.length === 0) {
      this.fail(`No structured data found on ${url}`);
      return;
    }

    jsonLdScripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent);
        
        // Check for required @context and @type
        if (!data['@context']) {
          this.fail(`Missing @context in structured data ${index + 1} on ${url}`);
        }
        if (!data['@type']) {
          this.fail(`Missing @type in structured data ${index + 1} on ${url}`);
        }

        // Validate specific schema types
        this.validateSchemaType(data, url, index + 1);
        
        this.pass(`Structured data ${index + 1} valid on ${url}`);
      } catch (error) {
        this.fail(`Invalid JSON-LD ${index + 1} on ${url}: ${error.message}`);
      }
    });
  }

  validateSchemaType(data, url, index) {
    switch (data['@type']) {
      case 'Organization':
        if (!data.name) this.fail(`Organization missing name on ${url}`);
        if (!data.url) this.fail(`Organization missing url on ${url}`);
        break;
      
      case 'Article':
        if (!data.headline) this.fail(`Article missing headline on ${url}`);
        if (!data.author) this.fail(`Article missing author on ${url}`);
        if (!data.datePublished) this.fail(`Article missing datePublished on ${url}`);
        break;
      
      case 'FinancialProduct':
        if (!data.name) this.fail(`FinancialProduct missing name on ${url}`);
        if (!data.tickerSymbol) this.fail(`FinancialProduct missing tickerSymbol on ${url}`);
        break;
    }
  }

  validateBulgarianOptimization(document, url) {
    // Check html lang attribute
    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang !== 'bg') {
      this.fail(`HTML lang should be 'bg', found '${htmlLang}' on ${url}`);
    } else {
      this.pass(`HTML lang attribute correct on ${url}`);
    }

    // Check for Bulgarian keywords in meta keywords
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      const content = keywords.getAttribute('content');
      const bulgarianKeywords = ['акции', 'инвестиции', 'финанси', 'stox', 'давид петков'];
      const hasbulgarian = bulgarianKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );
      
      if (!hasBulgarian) {
        this.warn(`No Bulgarian keywords found in meta keywords on ${url}`);
      } else {
        this.pass(`Bulgarian keywords present on ${url}`);
      }
    }

    // Check for Cyrillic content in title or description
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    
    const hasCyrillic = (text) => /[а-я]/i.test(text);
    
    if (title && !hasCyrillic(title.textContent)) {
      this.warn(`No Cyrillic characters in title on ${url}`);
    }
    
    if (description && !hasCyrillic(description.getAttribute('content'))) {
      this.warn(`No Cyrillic characters in description on ${url}`);
    }
  }

  validatePerformanceHints(document, url) {
    // Check for preconnect links
    const preconnects = document.querySelectorAll('link[rel="preconnect"]');
    if (preconnects.length === 0) {
      this.warn(`No preconnect links found on ${url}`);
    }

    // Check for viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      this.fail(`Missing viewport meta tag on ${url}`);
    }

    // Check for theme-color
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      this.warn(`Missing theme-color meta tag on ${url}`);
    }
  }

  pass(message) {
    console.log(`✅ ${message}`);
    this.results.passed++;
  }

  fail(message) {
    console.log(`❌ ${message}`);
    this.results.failed++;
    this.results.errors.push(message);
  }

  warn(message) {
    console.log(`⚠️  ${message}`);
    this.results.warnings.push(message);
  }

  async run() {
    console.log('🚀 Starting SEO validation for Stox.bg...\n');

    for (const url of TEST_URLS) {
      await this.validatePage(url);
    }

    // Print summary
    console.log('\n📊 SEO Validation Summary');
    console.log('========================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings.length}`);

    if (this.results.failed > 0) {
      console.log('\n🔥 Critical Issues:');
      this.results.errors.forEach(error => console.log(`  - ${error}`));
    }

    if (this.results.warnings.length > 0) {
      console.log('\n💡 Recommendations:');
      this.results.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    // Exit with error code if there are failures
    process.exit(this.results.failed > 0 ? 1 : 0);
  }
}

// Run the validator
if (require.main === module) {
  const validator = new SEOValidator();
  validator.run().catch(console.error);
}

module.exports = SEOValidator; 