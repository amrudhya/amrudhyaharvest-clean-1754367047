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
- **Latest Version**: v1.0.2
- **Last Updated**: 2025-08-05

---

*Next version will be v1.1.0 for any new features or v1.0.3 for small fixes*