# Static Assets Structure

This directory contains all static assets for the MoodBod website.

## Folder Structure

```
public/
├── images/                    # All website images organized by section
│   ├── hero/                 # Hero section images
│   ├── services/             # Services section images
│   ├── features/             # Features section images
│   ├── process/              # Process section images
│   ├── testimonials/         # Testimonials section images
│   ├── insights/             # Insights/Blog section images
│   ├── cta/                  # Call-to-action section images
│   ├── team/                 # Team member photos
│   ├── clients/              # Client logos and images
│   └── icons/                # General icons and graphics
├── logos/                    # Company logos and brand assets
├── favicons/                 # Favicon and app icons
└── README.md                 # This file
```

## Usage Guidelines

### Images

- Use **WebP** format for better performance when possible
- Include **fallback JPG/PNG** versions for older browsers
- Optimize images before adding to reduce file size
- Use descriptive filenames (e.g., `hero-main-image.webp`)

### Logos

- Store company logos in `/logos/`
- Include multiple formats: SVG (preferred), PNG, JPG
- Include different sizes: full, icon, favicon versions

### Favicons

- Store all favicon files in `/favicons/`
- Include multiple sizes: 16x16, 32x32, 48x48, 180x180, 192x192, 512x512
- Include Apple touch icons and manifest files

## Next.js Image Component Usage

When using images in components, reference them like this:

```tsx
import Image from "next/image";

// For images in public folder
<Image
  src="/images/hero/main-image.webp"
  alt="Hero image description"
  width={800}
  height={600}
  priority // For above-the-fold images
/>;
```

## File Naming Convention

- Use kebab-case for filenames: `hero-main-image.webp`
- Include size in filename when relevant: `logo-full-version.svg`
- Use descriptive names: `team-member-john-doe.jpg`
- Include version numbers for updates: `product-screenshot-v2.png`
