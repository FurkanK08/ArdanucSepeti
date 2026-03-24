# Design System Strategy: The Culinary Curator

This document outlines the visual language and structural logic for our multi-tenant food marketplace. We are moving away from the "utility-grid" look of standard delivery apps toward a high-end, editorial experience. We treat food not as a commodity, but as a destination.

---

### 1. Overview & Creative North Star: "The Digital Curator"
The Creative North Star for this design system is **The Digital Curator**. Unlike traditional marketplaces that feel like a warehouse of options, our interface must feel like a premium lifestyle magazine. 

We break the "template" look through:
*   **Intentional Asymmetry:** Utilizing staggered card heights and off-center typography to create a sense of movement.
*   **Breathing Room:** Using the `spacing-10` (2.5rem) and `spacing-12` (3rem) tokens to separate major vendors, allowing the eye to rest.
*   **Typographic Authority:** Large-format Inter headlines that command attention, shifting the focus from "ordering" to "discovering."

---

### 2. Colors & Tonal Depth
We use a sophisticated palette that balances high-energy "Appetizing Orange" with professional, muted neutrals.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate a vendor's menu from the background, shift the background from `surface` (#f8f9fb) to `surface-container-low` (#f2f4f6). Boundaries are felt through tone, not seen through lines.
*   **Surface Hierarchy:**
    *   **Base:** `surface` (#f8f9fb) for the main application background.
    *   **Panels:** `surface-container-low` (#f2f4f6) for secondary UI elements like search bars and filter strips.
    *   **Cards:** `surface-container-lowest` (#ffffff) for the highest prominence items (featured dishes).
*   **The "Glass & Gradient" Rule:** Floating action buttons (FABs) and navigation bars should utilize a "Glassmorphism" effect. Use `surface-container-lowest` at 85% opacity with a `backdrop-filter: blur(20px)`.
*   **Signature Textures:** For Primary CTAs, do not use a flat hex. Apply a subtle linear gradient from `primary` (#a93100) to `primary-container` (#d34000) at a 135-degree angle to give the button "soul" and weight.

---

### 3. Typography: Editorial Impact
We utilize **Inter** to bridge the gap between technical precision and high-fashion editorial.

*   **Display & Headlines:** Use `display-md` (2.75rem) for hero category headers (e.g., "Midnight Cravings"). Keep tracking tight (-0.02em) to maintain a premium feel.
*   **Title Scale:** Use `title-lg` (1.375rem) for restaurant names. This high-contrast black text against white surfaces ensures immediate legibility.
*   **Body:** The minimum size is `body-md` (0.875rem/14px). Never go smaller. Information density is the enemy of a premium experience.
*   **Labeling:** Use `label-md` in all-caps with 0.05em letter spacing for "Estimated Delivery Time" or "Nutritional Info" to create an authoritative, metadata-driven look.

---

### 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." We achieve depth through the **Layering Principle**.

*   **Stacking:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f6) background. This creates a natural 16px radius lift without a single pixel of shadow.
*   **Ambient Shadows:** Where floating is required (e.g., the Cart Summary), use a shadow color tinted with the `primary` hue: `rgba(169, 49, 0, 0.06)` with a 32px blur and 12px Y-offset.
*   **The "Ghost Border" Fallback:** If high-key imagery obscures a card edge, use a "Ghost Border": `outline-variant` (#e6beb2) at 15% opacity.
*   **Glassmorphism:** Use semi-transparent `surface-container-lowest` for top navigation bars to allow the vibrant food photography to "bleed" through as the user scrolls, maintaining a sense of place.

---

### 5. Components
All components must adhere to the `rounded-lg` (16px/1rem) corner radius.

*   **Buttons:**
    *   *Primary:* Gradient-filled (Orange), 16px internal padding, `title-sm` bold text.
    *   *Tertiary:* Ghost style. No background, no border. Only `on-surface` text with a trailing icon.
*   **Cards:** Forbid the use of divider lines. Separate "Price," "Rating," and "Distance" using `spacing-4` (1rem) horizontal gaps.
*   **Input Fields:** Use `surface-container-low` as the fill. On focus, transition the background to `surface-container-lowest` and apply a 2px `primary` ghost border (20% opacity).
*   **Selection Chips:** For "Vegan," "Gluten-Free," etc., use `surface-container-highest` for unselected and `primary` for selected.
*   **Marketplace Multi-Tenancy:** Each vendor section should be wrapped in a `surface-container-low` "Bay." This allows different vendor branding to coexist without clashing.

---

### 6. Do's and Don'ts

#### Do:
*   **Do** use asymmetrical margins. If the left margin is `spacing-4`, try a `spacing-8` right margin for featured content to create an editorial flow.
*   **Do** use "Appetizing Orange" (#FF4F00) sparingly. If everything is orange, nothing is important. Use it only for the "Final Action" and "Active State."
*   **Do** prioritize high-resolution imagery. The UI is the frame; the food is the art.

#### Don't:
*   **Don't** use 1px dividers to separate list items (e.g., individual items in a cart). Use `spacing-6` vertical white space instead.
*   **Don't** use pure black (#000000). Always use `on-surface` (#191c1e) to keep the contrast high but the feel sophisticated.
*   **Don't** use standard "drop shadows" on buttons. Use the Tonal Layering or tinted Ambient Shadows mentioned above.