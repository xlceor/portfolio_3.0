# Portfolio 2.0: Light & Modern Minimalist Refinement

This plan shifts the portfolio from the current "Dark Industrial" aesthetic to a "Light & Modern Minimalist" aesthetic. The focus is on clarity, clean negative space, and professional sophistication.

## 1. Design Direction: "Modern Minimalist"

*   **Palette:**
    *   **Background:** Pure White (`#ffffff`) or Soft Off-White (`#f9f9f9`) for sections.
    *   **Surface/Cards:** Subtle light gray (`#f4f4f4`) or crisp white with soft shadows.
    *   **Primary Text:** Deep Charcoal (`#1a1a1a`) for high legibility.
    *   **Secondary Text/Muted:** Soft Slate (`#666666`).
    *   **Accent (Primary):** A sophisticated deep blue (`#2563eb`) or a muted slate green (`#0f766e`). Let's go with a **Deep Slate Blue (`#1e40af`)** for professional trust.
    *   **Borders:** Very subtle light gray (`#e5e7eb`).

## 2. Execution Plan

### Phase 1: Core Design System Update
- [ ] Refactor `tailwind.config.ts` to replace existing dark mode colors with the new light theme palette.
- [ ] Update `globals.css` to set the new light-mode defaults (remove dark background, etc.).

### Phase 2: Component & Page Refinement
- [ ] **Global UI**:
    - Ensure clean typography hierarchy.
    - Remove hover glows and replace with subtle lift-up effects or border shifts.
- [ ] **`card.tsx`**: 
    - Move to a white background with a thin, light gray border.
    - Remove the green glow on hover.
- [ ] **`modal.tsx`**:
    - Update modal backdrop to a lighter, more subtle blur (`bg-white/50`).
    - Use clean, structured spacing for content.

### Phase 3: Cleanup
- [ ] Audit all SVGs and icons to ensure they complement the light aesthetic.
- [ ] Remove all "dark mode" toggle logic as the site will now be light-mode native.
- [ ] Final accessibility pass for color contrast (WCAG AA).
---
*Status: Ready to begin Phase 1.*
