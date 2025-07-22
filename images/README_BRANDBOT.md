# BRANDBOT: Asset Requirements for Island Drains & Excavation

This document lists all required image assets for the Island Drains & Excavation website transformation.

## 🎨 Logo Assets

### Primary Logo Files
| Asset | Current Path | Dimensions | Usage | Format |
|-------|-------------|------------|-------|---------|
| Main Logo | `/images/ide-logo-full.svg` | Vector | Header, footer, general branding | SVG (preferred) |
| Logo Mark | `/images/ide-mark.svg` | Vector | Small spaces, favicons | SVG |
| Header Logo | `/images/ide-header-logo.png` | 200x69px | Website header navigation | PNG with transparency |
| Favicon | `/images/ide-favicon.png` | 32x32px | Browser tab icon | PNG |
| Large Favicon | `/images/ide-favicon-large.png` | 180x180px | Mobile app icons | PNG |

### Logo Specifications
- **Color Scheme**: Marine blue (#0C4A6E) primary, hazard yellow (#FCD34D) accent
- **Style**: Professional, modern, suitable for drain/excavation industry
- **Formats**: SVG for scalability, PNG for compatibility
- **Background**: Transparent for overlay flexibility

## 📸 Hero & Background Images

| Asset | Current Path | Dimensions | Usage | Notes |
|-------|-------------|------------|-------|-------|
| Main Hero | `/images/hero-drainage.jpg` | 1920x1080px | Homepage hero background | High-quality excavation/drainage work |
| About Hero | `/images/about-hero.jpg` | 1920x600px | About page background | Professional team or equipment |
| Services Hero | `/images/services-hero.jpg` | 1920x600px | Services page background | Equipment in action |

## 🚧 Service Images

### Core Service Icons/Images
| Service | Asset Path | Dimensions | Description |
|---------|-----------|------------|-------------|
| Residential Drains | `/images/residential-drains.jpg` | 400x300px | Home drain cleaning work |
| Commercial Excavation | `/images/commercial-excavation.jpg` | 400x300px | Large-scale excavation project |
| Emergency Services | `/images/emergency-service.jpg` | 400x300px | 24/7 emergency response vehicle |

### Equipment Images
| Equipment | Asset Path | Dimensions | Description |
|-----------|-----------|------------|-------------|
| Excavator | `/images/excavator.jpg` | 600x400px | Primary excavation equipment |
| Drain Snake | `/images/drain-cleaning.jpg` | 600x400px | Professional drain cleaning tools |
| Service Vehicle | `/images/service-truck.jpg` | 600x400px | Branded company vehicle |

## 🖼️ Gallery Images

### Project Gallery
Create a `/images/gallery/` directory with:
- **Residential Projects**: 8-10 images (800x600px each)
- **Commercial Projects**: 8-10 images (800x600px each)
- **Equipment Shots**: 4-6 images (800x600px each)
- **Team Photos**: 2-4 images (800x600px each)

**Naming Convention**: `project-[type]-[number].jpg`
- Example: `project-residential-01.jpg`, `project-commercial-03.jpg`

## 👥 Team & About Images

| Asset | Path | Dimensions | Usage |
|-------|------|------------|-------|
| Team Photo | `/images/team-photo.jpg` | 800x600px | About page team section |
| Owner Photo | `/images/owner-portrait.jpg` | 400x400px | About page leadership |
| Company Photo | `/images/company-overview.jpg` | 1200x800px | About page company story |

## 🎯 Technical Specifications

### Image Quality Standards
- **Resolution**: Minimum 72 DPI for web, 150 DPI for print materials
- **Compression**: Optimize for web (under 200KB for most images)
- **Format Preferences**:
  - **Photos**: JPEG (quality 85-90%)
  - **Graphics/Icons**: PNG (with transparency)
  - **Logos**: SVG (preferred) or PNG

### SEO Considerations
- All images must have descriptive alt text
- File names should be descriptive (no spaces, use hyphens)
- Include relevant keywords naturally in file names

## 🔄 Migration Plan

### Phase 1: Critical Assets (Required for launch)
1. ✅ Main logo (header/footer)
2. ✅ Favicon
3. ✅ Hero background image
4. ✅ Core service images (3)

### Phase 2: Enhanced Content
1. Equipment gallery images
2. Project portfolio images
3. Team photography
4. Additional service illustrations

### Phase 3: Marketing Assets
1. Social media graphics (if needed later)
2. Print materials adaptation
3. Vehicle branding alignment

## 📝 Asset Replacement Checklist

When replacing assets, ensure:
- [ ] File paths match the configuration in `brand/brand-config.js`
- [ ] Image dimensions meet specifications
- [ ] Alt text is updated to reflect Island Drains content
- [ ] File sizes are optimized for web performance
- [ ] Images reflect the professional, reliable brand identity
- [ ] Equipment and work shown matches Island Drains' services

## 🔗 Related Files

Assets are referenced in:
- `brand/brand-config.js` - Logo path configuration
- All HTML files - Image sources and alt text
- CSS files - Background image references
- `sitemap.xml` - Thumbnail references

## 📞 Questions?

If you need clarification on any asset requirements or specifications, check the brand configuration in `brand/brand-config.js` for the most current requirements.

---

**Last Updated**: Initial creation during Loyalty6 → Island Drains transformation
**Maintained By**: BRANDBOT system for easy future re-skinning 