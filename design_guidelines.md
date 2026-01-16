# Vision Studio 360 - Design Guidelines

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from leading architectural portfolio sites (Zaha Hadid Architects, Foster + Partners) and premium portfolio platforms (Behance Pro). The monochrome palette and minimalist directive naturally align with architectural design principles: negative space as hero, imagery as focal point, typography as structure.

---

## Typography System

**Primary Font**: Inter (Google Fonts) - precise, architectural quality
**Secondary Font**: Playfair Display (Google Fonts) - sophisticated serif for emphasis

**Hierarchy**:
- Hero headlines: Playfair Display, 72px desktop / 48px mobile, light weight (300)
- Section headers: Inter, 48px desktop / 32px mobile, semi-bold (600)
- Subheadings: Inter, 24px desktop / 20px mobile, medium (500)
- Body text: Inter, 16px desktop / 14px mobile, regular (400)
- Captions/metadata: Inter, 14px desktop / 12px mobile, light (300), uppercase tracking

---

## Layout & Spacing

**Spacing Primitives**: Use Tailwind units of 4, 8, 16, 24 (p-4, m-8, gap-16, py-24)

**Grid System**:
- Desktop: 12-column grid, max-width 1440px
- Tablet: 8-column grid
- Mobile: 4-column grid, full-width with 16px gutters

**Section Padding**: py-24 desktop, py-16 mobile (consistent vertical rhythm)

---

## Page Structure & Sections

### 1. Hero Section (Full Viewport - 100vh)
Large-scale architectural hero image with minimal overlay
- Full-bleed dramatic architectural visualization
- Centered overlaid content: Studio name, tagline, single CTA button
- Button with backdrop blur (glass morphism effect)
- Subtle scroll indicator at bottom

### 2. Philosophy/About (60vh minimum)
Split layout: 50/50 text-image balance
- Left: Large-format text block with studio philosophy (max-width prose)
- Right: Signature project image, full-height
- Mobile: Stack vertically, image-first

### 3. Featured Projects Grid (Variable height)
Masonry-style project showcase
- Desktop: 3-column asymmetric grid (varied heights)
- Tablet: 2-column
- Mobile: Single column, full-width cards
- Each card: Project image, title overlay on hover (desktop), always visible (mobile)
- Implement lazy loading for performance

### 4. Services Grid (Auto-height)
Clean 3-column layout (desktop)
- Icon-free approach: Large serif numbers (01, 02, 03)
- Service title + brief description
- Minimalist divider lines between columns
- Mobile: Stack single column with dividers

### 5. Process Timeline (Linear flow)
Horizontal scroll component (desktop) / Vertical stack (mobile)
- 4-5 process stages
- Minimal line graphics connecting stages
- Each stage: Number, title, description, supporting image thumbnail

### 6. Selected Works Showcase (Full-width)
Full-bleed carousel/slider
- Large architectural visualizations
- Project title overlaid with blur backdrop
- Subtle navigation arrows, pagination dots
- Smooth scroll/swipe gestures

### 7. Recognition Section (Compact)
Single row horizontal layout
- Awards/publications logos
- Grayscale treatment
- Even spacing, centered alignment

### 8. Contact/CTA (80vh)
Split asymmetric layout
- Left (40%): Contact form (Name, Email, Project Type, Message)
- Right (60%): Large atmospheric architectural image
- Mobile: Form-first stack, reduced image height

### 9. Footer (Minimal)
Three-column layout (desktop) / Accordion (mobile)
- Column 1: Studio info, address
- Column 2: Quick links (Projects, Services, Contact)
- Column 3: Social links, newsletter signup
- Bottom bar: Copyright, legal links

---

## Navigation System

**Desktop**: Fixed horizontal nav, transparent initially, solid on scroll
- Logo left, menu items right
- Menu: Projects / Services / About / Contact
- Hamburger hidden

**Mobile**: Hamburger menu, full-screen overlay
- Animated icon transition
- Centered vertical menu list
- Large tap targets (48px minimum)
- Backdrop blur when active

---

## Component Specifications

**Buttons**:
- Primary: Outline style, 1px border, 16px padding, hover expands border to 2px
- On images: Add backdrop-blur-md, semi-transparent background

**Cards (Project)**:
- Image aspect ratio: 4:3 for grid consistency
- Minimal metadata: Title + Category
- Hover: Subtle scale (1.02) + overlay fade-in (desktop only)

**Forms**:
- Underline-style inputs (bottom border only)
- Floating labels
- Generous spacing (gap-6 between fields)

**Images**:
- Lazy loading on all below-fold images
- Blur-up placeholder technique
- WebP format with fallbacks

---

## Images Specification

**Required Images** (7-10 high-quality architectural visualizations):

1. **Hero**: Dramatic architectural exterior/interior shot, minimal furniture, strong geometric lines, monochromatic lighting (1920x1080 minimum)

2. **About Section**: Wireframe/blueprint aesthetic image or in-progress rendering showing technical precision

3. **Featured Projects** (6-8 images): Mix of interior/exterior shots, varied scales (residential to commercial), consistent tonal quality

4. **Process Timeline Thumbnails** (4-5 small): Sketch→3D model→rendering progression

5. **Full-width Carousel** (3-4 images): Portfolio showstoppers, highest quality hero images

6. **Contact Section**: Atmospheric studio workspace or abstract architectural detail

All images should maintain monochrome/desaturated aesthetic, high contrast, professional photography quality.

---

## Performance & Interactions

- Implement smooth scroll behavior (CSS scroll-behavior: smooth)
- Lazy load all images except hero
- Minimize animations: Only subtle hover states and scroll-triggered fade-ins
- Optimize for Core Web Vitals: Fast LCP (hero image), minimal CLS, quick TTI