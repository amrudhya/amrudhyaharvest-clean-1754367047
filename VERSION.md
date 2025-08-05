# AmrudhyaHarvest Website - Version History

This document tracks all major changes and updates to the website for easy reference and rollback capabilities.

## Version Conventions
- **Major (v2.0.0)**: Complete redesigns, structural changes, breaking changes
- **Minor (v1.X.0)**: New features, significant UI updates, new sections
- **Patch (v1.0.X)**: Bug fixes, small improvements, content updates

---

## Version History

### v1.0.0 - Initial Clean Website (2025-08-05)
**Git Tag:** `v1.0.0`
**Commit:** `1ad61e0`

#### ✨ Features Added:
- Clean, optimized website structure
- Timeline process layout for "Our Approach" section
- Mobile responsive design
- Contact forms with Formspree integration
- SEO optimized pages

#### 🗑️ Removed:
- Next.js/React development files
- Export badge from top of pages  
- Packaging and Blog/Insights pages
- Broken product detail pages
- Unused assets and dependencies

#### 🔧 Technical:
- Static HTML/CSS/JS website
- GitHub Pages deployment
- Custom domain: amrudhyaharvest.com
- Performance optimized assets

#### 📱 Pages:
- ✅ Home (index.html)
- ✅ About (about.html) 
- ✅ Products (products.html)
- ✅ Resources (resources.html)
- ✅ Thank You (thank-you.html)
- ✅ Error pages (404.html, 500.html)

### v1.0.2 - Fix Duplicate APEDA Certification (2025-08-05)
**Git Tag:** `v1.0.2` 
**Commit:** `617d27f`

#### 🔧 Bug Fixes:
- Fixed duplicate APEDA certification in Quality Assurance section
- Replaced second APEDA with ISO 22000:2018 certification
- Improved certification diversity and credibility

#### 📋 Current Certifications:
- ✅ FSSAI Certified
- ✅ APEDA Registered  
- ✅ ISO 22000:2018
- ✅ HACCP Compliant

### v1.1.0 - Enhanced Our Approach Section (2025-08-05)
**Git Tag:** `v1.1.0`
**Commit:** `002c213`

#### ✨ Features Added:
- Redesigned timeline with stronger, benefit-focused headlines
- Added quantifiable metrics and statistics (200+ farms, 99.9% purity)
- Implemented visual stat badges (📍 15+ States, 🔍 100% Traceable)
- Created approach summary with three key guarantees
- Enhanced content positioning against competitors

#### 🎨 UI/UX Improvements:
- Added hover effects for timeline items
- Improved mobile responsiveness for stat badges
- Enhanced visual hierarchy with better typography
- Added gradient backgrounds for statistics

#### 📊 Content Strategy:
- Competitive analysis-driven improvements
- Risk mitigation messaging
- Quantifiable business benefits
- Trust-building guarantees section

### v1.2.0 - Comprehensive SEO Enhancement & Optimization (2025-08-05)
**Git Tag:** `v1.2.0`
**Commit:** `9ab560e`

#### ✨ Major Features Added:
- Enhanced structured data markup (Organization, WebSite, FAQ, Product schemas)
- Comprehensive meta tag optimization with targeted keywords
- Advanced Open Graph and Twitter Card implementation
- Enhanced XML sitemap with image sitemap support
- Progressive Web App manifest.json for better mobile experience

#### 🔍 SEO Technical Improvements:
- Canonical URLs and hreflang tags for international targeting
- Enhanced robots.txt with bot-specific configurations
- Optimized meta descriptions for higher CTR
- Strategic internal linking throughout content
- Rich snippets implementation for better SERP appearance

#### 📊 Target Keywords Optimized:
- "Indian agricultural exporter" (primary)
- "B2B rice supplier" / "basmati rice wholesale"
- "organic pulses export" / "premium spices supplier"
- "FSSAI certified agricultural products"
- "agricultural export India" / "wholesale agri products"

#### 🎯 On-Page Optimizations:
- Keyword-rich title tags and meta descriptions
- Enhanced hero section content with internal links
- Optimized product section descriptions
- Strategic anchor text for internal navigation
- Improved semantic HTML structure

#### 🚀 Performance & UX:
- PWA manifest for mobile app-like experience
- Enhanced resource hints and preloading
- Optimized font loading strategies
- Improved Core Web Vitals preparation

---

## Rollback Commands

To revert to any version:
```bash
# View all versions
git tag -l

# Rollback to specific version
git checkout v1.0.0

# Create new branch from version
git checkout -b rollback-v1.0.0 v1.0.0
```

## Current Status
- **Live URL**: https://amrudhya.github.io/amrudhyaharvest-clean-1754367047/
- **Latest Version**: v1.2.0
- **Last Updated**: 2025-08-05

---

*Next version will be v1.3.0 for any new features or v1.2.1 for small fixes*