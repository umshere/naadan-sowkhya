# Style Guide

This style guide documents the visual standards for the Sowkhya brand website, focusing on mobile-first, brand consistency, and unified component styling using Tailwind CSS.

---

## 1. Color Palette

Colors are defined using CSS variables in `src/app/globals.css` for easy theming (light/dark modes). Use Tailwind's semantic color names (e.g., `bg-primary`, `text-secondary-foreground`).

**Core Colors (Default Light Theme HSL Values):**

*   **Primary:**
    *   `primary`: `hsl(0 0% 9%)` (Used for main actions, highlights) - *Tailwind class: `bg-primary`, `text-primary`*
    *   `primary-foreground`: `hsl(0 0% 98%)` (Text on primary background) - *Tailwind class: `text-primary-foreground`*
    *   `primary-light`: `#e8f4ea` (Lighter shade, defined in `tailwind.config.js`) - *Tailwind class: `bg-primary-light`*
    *   `primary-dark`: `#1a4d2e` (Darker shade, defined in `tailwind.config.js`) - *Tailwind class: `bg-primary-dark`*
*   **Secondary:**
    *   `secondary`: `hsl(0 0% 96.1%)` (Used for less prominent elements) - *Tailwind class: `bg-secondary`, `text-secondary`*
    *   `secondary-foreground`: `hsl(0 0% 9%)` (Text on secondary background) - *Tailwind class: `text-secondary-foreground`*
*   **Tertiary:** (Custom additions)
    *   `tertiary`: `#a3b899` - *Tailwind class: `bg-tertiary`, `text-tertiary`*
    *   `tertiary-light`: `#e9f0e4` - *Tailwind class: `bg-tertiary-light`*
*   **Background & Foreground:**
    *   `background`: `hsl(0 0% 100%)` (Default page background) - *Tailwind class: `bg-background`*
    *   `foreground`: `hsl(0 0% 3.9%)` (Default text color) - *Tailwind class: `text-foreground`*
*   **Card:**
    *   `card`: `hsl(0 0% 100%)` (Card background) - *Tailwind class: `bg-card`*
    *   `card-foreground`: `hsl(0 0% 3.9%)` (Text on card background) - *Tailwind class: `text-card-foreground`*
*   **Muted:**
    *   `muted`: `hsl(0 0% 96.1%)` (For subtle text or backgrounds) - *Tailwind class: `bg-muted`, `text-muted`*
    *   `muted-foreground`: `hsl(0 0% 45.1%)` (Text on muted background) - *Tailwind class: `text-muted-foreground`*
*   **Accent:**
    *   `accent`: `hsl(0 0% 96.1%)` (For highlighted interactive elements) - *Tailwind class: `bg-accent`*
    *   `accent-foreground`: `hsl(0 0% 9%)` (Text on accent background) - *Tailwind class: `text-accent-foreground`*
*   **Borders & Inputs:**
    *   `border`: `hsl(0 0% 89.8%)` - *Tailwind class: `border-border`*
    *   `input`: `hsl(0 0% 89.8%)` (Input field border) - *Tailwind class: `border-input`*
    *   `ring`: `hsl(0 0% 3.9%)` (Focus rings) - *Tailwind class: `ring-ring`*
*   **Destructive:**
    *   `destructive`: `hsl(0 84.2% 60.2%)` (Error states, delete actions) - *Tailwind class: `bg-destructive`*
    *   `destructive-foreground`: `hsl(0 0% 98%)` (Text on destructive background) - *Tailwind class: `text-destructive-foreground`*
*   **Other Custom Colors:**
    *   `cream`: `#FAF8F5` - *Tailwind class: `bg-cream`*
    *   `earth.terracotta`: `#c87941` - *Tailwind class: `bg-earth-terracotta`*
    *   `earth.brown`: `#664e33` - *Tailwind class: `bg-earth-brown`*
    *   `earth.khaki`: `#bfb58f` - *Tailwind class: `bg-earth-khaki`*

*Note:* `globals.css` also contains older variables like `--primary-color: #2c7a43;`. These should be phased out in favor of the HSL CSS variables used by Tailwind/shadcn for consistency.

---

## 2. Typography

Fonts are defined via CSS variables in `src/app/globals.css`.

*   **Primary Font:** `Poppins`, sans-serif (`--font-primary`) - Use for body text, UI elements.
*   **Secondary Font:** `Playfair Display`, Georgia, serif (`--font-secondary`) - Use for headings, display text.

**Recommended Tailwind Usage:**

*   **Headings (h1, h2, h3):** Use `font-secondary`. Apply appropriate sizes like `text-4xl`, `text-3xl`, `text-2xl`, and `font-semibold` or `font-bold`.
    *   Example H1: `className="text-4xl font-semibold font-secondary"`
*   **Body Text:** Use `font-primary`. Apply sizes like `text-base` or `text-lg`, and `font-normal`.
    *   Example Body: `className="text-base font-normal font-primary"`
*   **UI Text (Buttons, Labels):** Use `font-primary`. Apply sizes like `text-sm` or `text-base`, and `font-medium` or `font-semibold`.
    *   Example Button Text: `className="text-sm font-medium font-primary"`
*   **Line Height:** Use Tailwind's `leading-` utilities (e.g., `leading-normal`, `leading-relaxed`) for readability.

---

## 3. Spacing & Layout

*   **Scale:** Use Tailwind’s default spacing scale (`p-`, `m-`, `gap-`, etc.) for consistency (e.g., 4px increments).
*   **Standard Gaps:**
    *   Section Padding: `py-12` or `py-16`
    *   Grid/Flex Gap: `gap-4` or `gap-6` or `gap-8`
    *   Form Element Spacing: `mb-4` or `mb-6`
*   **Container:** Use `max-w-screen-md` or `max-w-screen-lg` for main content width on desktop. Apply horizontal padding consistently, e.g., `px-4 sm:px-6 lg:px-8`.
*   **Mobile Viewport Height:** Use `h-screen-dynamic` (maps to `100dvh`) for full vertical height on mobile, defined in `tailwind.config.js`.

---

## 4. Border Radius & Shadows

Values are defined in `tailwind.config.js` and `globals.css`.

*   **Border Radius:**
    *   Base Radius Variable: `--radius: 0.5rem` (defined in `globals.css`)
    *   `rounded-lg`: `0.5rem` (Uses `--radius`) - *Standard large radius*
    *   `rounded-md`: `0.375rem` (`calc(var(--radius) - 2px)`) - *Standard medium radius*
    *   `rounded-sm`: `0.25rem` (`calc(var(--radius) - 4px)`) - *Standard small radius*
    *   `rounded-card`: `0.75rem` (Custom) - *Use for main cards*
    *   `rounded-btn`: `0.5rem` (Custom) - *Use for buttons*
*   **Shadows:** (Defined in `tailwind.config.js`)
    *   `shadow-card`: `0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)`
    *   `shadow-card-hover`: `0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)`
    *   `shadow-bottom-nav`: `0 -2px 10px rgba(0, 0, 0, 0.05)`
    *   `shadow-btn`: `0 2px 4px rgba(0, 0, 0, 0.1)`
    *   `shadow-btn-hover`: `0 4px 8px rgba(0, 0, 0, 0.1)`

---

## 5. Responsive Breakpoints

Defined in `tailwind.config.js`. Mobile-first approach is standard.

*   `xs`: 480px
*   `sm`: 640px
*   `md`: 768px
*   `lg`: 1024px
*   `xl`: 1280px
*   `2xl`: 1536px

> **Usage:** Define base styles for mobile, then use prefixes (`sm:`, `md:`, etc.) to override for larger screens. Example: `className="w-full md:w-1/2"`

---

## 6. Animations & Transitions

Keyframes and animation utilities are defined in `tailwind.config.js`.

*   **Animations:** `animate-slide-up`, `animate-slide-down`, `animate-fade-in`, `animate-fade-out`.
*   **Transitions:** Use Tailwind's standard `transition` utilities (e.g., `transition-colors`, `transition-all`) with `duration-` classes (e.g., `duration-300`).

---

## 7. Iconography

*(Placeholder - Standards need to be defined)*

*   **Recommended Library:** (e.g., Lucide Icons, Heroicons)
*   **Usage:** (e.g., Use SVG components, consistent sizing `w-5 h-5`)
*   **Color:** Use `currentColor` for icons within text elements or apply text color utilities (`text-primary`, `text-muted-foreground`, etc.).

---

## 8. Component Guidelines

*   **Use Tailwind CSS:** All new components and refactored pages should primarily use Tailwind utility classes. Avoid custom CSS where a Tailwind utility exists.
*   **Consistency:** Apply colors, typography, spacing, and rounding according to this guide.
*   **Refactor Legacy:** Gradually refactor components using shadcn/ui defaults or older custom styles to align with this guide.
*   **Mobile-First & Responsive:** Ensure components are usable and look good on mobile screens first.
*   **Accessibility:** Use semantic HTML (e.g., `<button>`, `<nav>`), provide `alt` text for images, use ARIA attributes where necessary.
*   **Custom Utilities:** Use custom classes from `globals.css` (e.g., `.mobile-scroll-view`) judiciously. Consider replacing them with standard Tailwind if possible.

---

## 9. Theming & Dark Mode

*   The setup uses CSS variables and Tailwind's `dark:` variant (via `darkMode: ["class"]` in `tailwind.config.js`).
*   Ensure components correctly adapt colors and backgrounds in dark mode by using the semantic color names (e.g., `bg-background`, `text-foreground`).

---

## 10. Branding Assets

*   Use official logo, icons, and imagery provided by the brand team.
*   Maintain consistent spacing and sizing relative to brand assets.

---

## 11. Example Components

**Button:**

```jsx
<button className="bg-primary text-primary-foreground rounded-btn px-4 py-2 shadow-btn hover:bg-primary-dark hover:shadow-btn-hover transition-all duration-300 font-primary text-sm font-medium">
  Primary Button
</button>
```

**Card:**

```jsx
<div className="bg-card text-card-foreground rounded-card shadow-card p-6">
  <h3 className="text-lg font-semibold font-secondary mb-2">Card Title</h3>
  <p className="text-sm text-muted-foreground font-primary">
    Card content goes here, using the defined typography and colors.
  </p>
</div>
```

---

For implementation details, refer to `tailwind.config.js` and `src/app/globals.css`. For questions or updates, contact the design lead.
