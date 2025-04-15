# Section Background & Shadow Consistency Checklist

This checklist will help you systematically update your homepage for a modern, visually appealing, and consistent look. For each section, review the background color and card shadow recommendations, and check off once completed.

---

## Global Setup
- [ ] Define custom section background color (e.g., `bg-section-bg` or `bg-[#f8faf3]`) in Tailwind config or global CSS
- [ ] Define a consistent card shadow class (e.g., `shadow-card`)

---

## Section-by-Section Checklist

| Section Name             | Needs White Background? | Needs Alternate BG? | Needs Card Shadow? | Done |
|-------------------------|:----------------------:|:-------------------:|:------------------:|:----:|
| Hero Section            |           ❌           |         ❌          |        ❌         | [ ]  |
| Feature Cards           |           ✅           |         ❌          |        ✅         | [ ]  |
| About Section           |           ✅           |         ❌          |        ✅         | [ ]  |
| Product Categories      |           ✅           |         ❌          |        ✅         | [ ]  |
| Featured Products       |           ✅           |         ❌          |        ✅         | [ ]  |
| Product Guarantee       |           ✅           |         ❌          |        ✅         | [ ]  |
| Gallery                 |           ✅           |         ❌          |        ✅         | [ ]  |
| Testimonials            |           ✅           |         ❌          |        ✅         | [ ]  |
| Blog/Info Cards         |           ✅           |         ❌          |        ✅         | [ ]  |
| Footer                  |           ❌           |         ❌          |        ❌         | [ ]  |

---

## Implementation Steps
1. **Update Tailwind/global CSS**: Add custom background and shadow utilities.
2. **Apply `bg-white` to all main content sections** (except hero/footer).
3. **Add `shadow-card` (or similar) to all cards/content blocks** within each section listed above.
4. **Test on mobile and desktop** for visual consistency.
5. **Tick off each section above as you complete the update.**

---

## Notes
- Alternate backgrounds (e.g., off-white) are not currently recommended based on your feedback, but can be added if you want more separation.
- Shadows should be soft and consistent throughout for a premium feel.
- Section containers should have enough vertical padding for breathing room.

---

**Use this checklist as your implementation guide. Create separate tasks for each section if needed.**
