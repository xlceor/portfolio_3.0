# Portfolio 2.0: UI/UX Refinement Plan

This document outlines the strategy for evolving the portfolio into a more high-end, "Industrial/Precision" aesthetic while maintaining a strong identity.

## 1. Design Direction: "The Industrial Minimalist"
We will blend the **Industrial** (Option A) and **Midnight/Minimalist** (Option C) directions. We will keep a dark, professional base but shift away from the "soft organic" greens toward a "high-precision instrument" aesthetic.

*   **Palette:**
    *   **Background:** True Deep Black (`#050505`) to create depth.
    *   **Surface:** Matte Carbon (`#121212`) for card containers.
    *   **Primary Text:** Off-white (`#e0e0e0`) for readability.
    *   **Accent (The "Precision" Green):** A sharper, more "Electric/Neon" Lime Green (`#39FF14`) or a "Signal" Cyan (`#00F5FF`). Let's go with a **Vivid Phosphor Green (`#39FF14`)** for a high-tech/hardware feel.
    *   **Borders:** Subtle Slate (`#262626`).

## 2. Phased Execution Plan

### Phase 1: Core Design System Update
- [ ] Update `globals.css` with the new color variables.
- [ ] Refactor `tailwind.config.ts` to map these colors to utility classes (`bg-surface`, `text-accent`, etc.).
- [ ] Remove all hardcoded colors and `[color:var(--example)]` strings in favor of these Tailwind classes.

### Phase 2: Component Refinement
- [ ] **`card.tsx`**: 
    - Standardize to `16/9` aspect ratio.
    - Implement a more "hardware-focused" hover effect (e.g., a subtle border glow instead of a full lift).
- [ ] **`modal.tsx`**:
    - Re-layout the tech pill section to include icons or more visual structure.
    - Standardize padding for better mobile/desktop consistency.
- [ ] **Global UI**:
    - Simplify the nav bar transition.
    - Refine button styles to look like "Hardware Switches/Controls" (maybe a subtle `border-l-2` effect).

### Phase 3: Technical Cleanup
- [ ] Ensure all SVGs in `GradientSvgIcon.tsx` are updated to match the new Phosphor Green.
- [ ] Audit all pages for contrast accessibility (WCAG compliance with the new dark background).
- [ ] Add `metadata` for better social sharing preview.

## 3. Immediate Priorities
1.  Establish the new CSS/Tailwind variables.
2.  Apply the dark-mode-first aesthetic across all components.
3.  Enhance the project cards to feel like "Industrial UI units."

---
*Status: Ready to begin Phase 1.*
