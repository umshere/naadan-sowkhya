# Style Guide

This style guide documents the visual standards for the Sowkhya brand website, focusing on mobile-first, brand consistency, and unified component styling.

---

## 1. Color Palette

**Primary Colors:**
- `primary.light`: #e8f4ea
- `primary.DEFAULT`: hsl(var(--primary))
- `primary.dark`: #1a4d2e
- `primary.foreground`: hsl(var(--primary-foreground))

**Secondary Colors:**
- `secondary.DEFAULT`: hsl(var(--secondary))
- `secondary.foreground`: hsl(var(--secondary-foreground))

**Tertiary Colors:**
- `tertiary.DEFAULT`: #a3b899
- `tertiary.light`: #e9f0e4

**Neutrals & Accents:**
- `cream`: #FAF8F5
- `earth.terracotta`: #c87941
- `earth.brown`: #664e33
- `earth.khaki`: #bfb58f
- `background`: hsl(var(--background))
- `foreground`: hsl(var(--foreground))
- `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `card`, `popover`, `chart.*`: all use `hsl(var(--...))` for theme flexibility

> **Usage:** Use semantic color names in components. Prefer CSS variables for easy theming and dark mode support.

---

## 2. Typography

- **Font Family:** (Use system UI or specify in Tailwind config if customized)
- **Font Sizes:** Follow Tailwind’s default scale unless overridden.
- **Font Weights:** Use `font-semibold` for headings, `font-normal` or `font-light` for body.
- **Line Height:** Use Tailwind defaults for readability.

> **Usage:** Use consistent heading hierarchy (`h1`, `h2`, etc.). Avoid inline styles; use Tailwind classes.

---

## 3. Spacing & Layout

- **Spacing:** Use Tailwind’s spacing scale (`p-`, `m-`, `gap-`, etc.)
- **Container:** Use `max-w-screen-md` or `max-w-screen-lg` for main content on desktop, with `px-4` or `px-6` for mobile padding.
- **Custom Height:** `h-screen-dynamic` for mobile viewport height (100dvh).

---

## 4. Border Radius & Shadows

- **Border Radius:**
  - Card: `rounded-card` (`0.75rem`)
  - Button: `rounded-btn` (`0.5rem`)
  - Large: `rounded-lg` (`var(--radius)`)
  - Medium: `rounded-md` (`calc(var(--radius) - 2px)`)
  - Small: `rounded-sm` (`calc(var(--radius) - 4px)`)
- **Shadows:**
  - Card: `shadow-card`
  - Card Hover: `shadow-card-hover`
  - Bottom Nav: `shadow-bottom-nav`
  - Button: `shadow-btn`, `shadow-btn-hover`

---

## 5. Responsive Breakpoints

- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

> **Usage:** Design for mobile first; use responsive utilities (`sm:`, `md:`, etc.) to scale up.

---

## 6. Animations

- `slide-up`, `slide-down`, `fade-in`, `fade-out` (see Tailwind config for keyframes)

---

## 7. Component Guidelines

- Use only Tailwind CSS for new components and pages.
- Refactor existing shadcn/ui or custom-styled components to match Tailwind utility classes and this style guide.
- All components must be mobile-responsive by default.
- Use semantic HTML and accessible patterns.

---

## 8. Theming & Dark Mode

- Use CSS variables and Tailwind’s `dark` mode class for theming.
- Ensure all colors and backgrounds adapt for dark mode.

---

## 9. Branding Assets

- Use official logo, icons, and imagery as provided by the brand team.
- Maintain consistent spacing and sizing for all brand assets.

---

## 10. Example Component

```jsx
<button className="bg-primary text-primary-foreground rounded-btn px-4 py-2 shadow-btn hover:shadow-btn-hover transition">Button</button>
```

---

For questions or updates, refer to `tailwind.config.js` or contact the design lead.
