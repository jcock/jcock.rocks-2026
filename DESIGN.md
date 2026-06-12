---
name: Monochrome Impact
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626263'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  deep-canvas: '#0D0E11'
typography:
  display:
    fontFamily: Inter
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 1.1
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 1.2
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 1.6
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 1
    letterSpacing: 0.1em
spacing:
  container-max: 1440px
  edge-margin: 4rem
  edge-margin-mobile: 1.5rem
  gutter: 2rem
  section-gap: 8rem
---

# Monochrome Impact Design System

## Brand & Style

The design system is rooted in **Minimalism** with a heavy lean toward **Bold, Editorial Typography**. It is designed to act as a silent frame for high-quality creative work, allowing imagery to provide the only "color" in the interface. The aesthetic is professional, modern, and developer-centric, characterized by extreme contrast, intentional whitespace, and a "no-nonsense" approach to navigation.

The target audience consists of design-savvy recruiters, tech collaborators, and creative directors who value precision, clarity, and a strong point of view. The emotional response should be one of immediate confidence and clarity—stripping away the unnecessary to focus entirely on the craft.

## Colors

The palette is strictly monochromatic to ensure maximum readability and impact.

- **Primary & Neutral**: Use `#000000` for all primary headings and body text against a `#FFFFFF` or `#F8F8F8` background. This high-contrast pairing mimics traditional editorial print.
- **Secondary**: Use `#707070` (Muted Gray) for secondary information, meta-data, and labels to create visual hierarchy without introducing new hues.
- **Accents**: The interface itself contains no chromatic accents. Visual interest is generated exclusively through content (project thumbnails and photography).
- **Surface**: Use `#0D0E11` for specific high-impact inverted sections, such as footers or call-to-action blocks, where white text should be used for a dramatic shift in tone.

## Typography

Typography is the primary driver of the design system. **Inter** is used exclusively to maintain a clean, systematic feel across all levels.

- **Display & Large Headlines**: These should be set with tight leading and aggressive negative letter-spacing to create a "block" of text effect.
- **Body Text**: Body copy maintains a generous line height (160%) to ensure legibility against the stark white background.
- **Labels**: Small caps are used for navigation items and category labels to differentiate them from narrative text.
- **Serif Usage**: While the system is sans-serif dominant, **Noto Serif** may be used sparingly for long-form reading or pull-quotes to add a touch of "literary" sophistication.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for desktop and a **Fluid Single-Column** approach for mobile.

- **Grid System**: Use a 12-column grid for desktop with 32px (2rem) gutters. Content should be centered with a maximum width of 1440px.
- **Whitespace**: Spacing is intentionally "over-indexed." Use large vertical gaps (8rem+) between major sections to allow the eye to rest and emphasize the transition between projects.
- **Alignment**: Maintain a strict left-alignment for all text blocks to reinforce the systematic, architectural feel of the layout.
- **The Footer**: The footer utilizes a massive "watermark" style logo that spans the width of the container, acting as a structural anchor for the entire site.

## Elevation & Depth

The design system is **flat and structural**. Depth is conveyed through **Tonal Layers** and scale rather than shadows.

- **Surface Levels**: Primary content sits on the base layer (`#FFFFFF`). Secondary containers or cards may use a very subtle `#F8F8F8` fill to define boundaries without using borders.
- **Outlines**: If separation is required, use 1px solid lines in `#000000` (high contrast) or `#E0E0E0` (low contrast) depending on the desired prominence.
- **Zero Shadows**: Do not use ambient or drop shadows. Elements should feel as if they are printed directly onto the screen.
- **Transitions**: Use simple, fast opacity fades for hover states rather than movement-based depth to maintain the "stillness" of the minimalist aesthetic.

## Shapes

The shape language is strictly **Sharp (0px)**.

- **Hard Edges**: All buttons, image containers, and input fields must feature 90-degree corners. This reinforces the brutalist, architectural influence of the design.
- **Media**: Project thumbnails and imagery should be strictly rectangular. Avoid any rounded masks or circular elements unless they are part of the specific content being showcased.

## Components

- **Buttons**: Use a "Ghost" style for secondary actions (1px black border, sharp corners) and a "Solid Black" style for primary actions. On hover, invert the colors (Black background becomes white text on black background).
- **Project Cards**: Cards should consist of a full-bleed image with the title and category appearing below in `headline-md` and `label-caps` respectively. No shadows or borders; use spacing to separate items in the grid.
- **Navigation**: Simple text-link list. Active states should be indicated by a weight change or a simple underline.
- **Input Fields**: A single bottom border (1px black) instead of a full box. Labels should sit above the line in `label-caps`.
- **Chips/Tags**: Small, sharp-edged boxes with a light gray (`#F8F8F8`) background and dark text.
- **Watermark Logo**: Use a massive, display-scale version of the primary brand name in the footer, often slightly cropped or overlapping the footer boundary to create a modern, editorial feel.
