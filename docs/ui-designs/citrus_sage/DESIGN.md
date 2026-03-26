# Design System Document: Boutique Food Delivery Experience

## 1. Overview & Creative North Star
### The Creative North Star: "The Digital Maître D’"
This design system rejects the cluttered, "utility-first" aesthetic of mass-market delivery apps. Our North Star is **The Digital Maître D’**—an experience that feels curated, calm, and high-end. We move beyond a standard grid by using "Editorial Minimalism."

To break the "template" look, we employ:
*   **Intentional Asymmetry:** Hero images and category chips aren't always perfectly centered; they breathe through varying horizontal offsets.
*   **Layered Sophistication:** We treat the interface as a physical table setting—fine paper (surfaces) layered upon stone (backgrounds).
*   **Typographic Authority:** Large, boutique-style headlines (Plus Jakarta Sans) contrast with ultra-functional body text (Inter) to create a "food magazine" feel.

---

## 2. Colors & Tonal Depth
Our palette is rooted in the appetizing energy of `primary` (#a83100 / #FF4F00), balanced by a sophisticated grayscale that favors warmth over sterile blues.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts.
*   *Example:* A product card (`surface_container_lowest`) sits on a category section (`surface_container_low`), which sits on the main app background (`surface`). The transition is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested tiers to define importance:
*   **Level 0 (Base):** `surface` (#f5f6f7) - The "tablecloth."
*   **Level 1 (Sections):** `surface_container_low` (#eff1f2) - Large groupings or scroll areas.
*   **Level 2 (Cards):** `surface_container_lowest` (#ffffff) - Individual menu items or restaurant cards. This creates a "lifted" effect without shadows.

### The "Glass & Gradient" Rule
To add boutique polish, floating navigation bars and checkout summaries must use **Glassmorphism**:
*   **Token:** `surface_bright` at 80% opacity with a 20px Backdrop Blur.
*   **Signature Texture:** Use a subtle linear gradient for Primary CTAs: `primary` (#a83100) to `primary_container` (#ff784c) at a 135° angle. This adds "soul" and depth that flat hex codes lack.

---

## 3. Typography
We use a dual-typeface system to balance editorial flair with high-speed legibility.

*   **Display & Headlines (Plus Jakarta Sans):** Used for "The Hook." Restaurant names, "Afiyet Olsun" greetings, and promotional banners. It feels bespoke and modern.
    *   *Headline-LG:* 2rem, Semi-bold.
*   **Title & Body (Inter):** Used for "The Details." Food descriptions, prices, and courier instructions. Inter’s high x-height ensures 100% legibility in outdoor courier environments.
    *   *Body-LG (Standard):* 1rem (16px) — **Minimum size** for all user descriptions to ensure premium readability.
    *   *Label-MD:* 0.75rem — Used for "Ders Notu" or "Teslimat Süresi" metadata.

---

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. The slight shift in brightness creates a soft, natural edge.
*   **Ambient Shadows:** For "Floating" elements (e.g., a "Sepete Ekle" button), use a 24px blur with 4% opacity of the `on_surface` color. It should feel like a soft glow, not a drop shadow.
*   **The Ghost Border:** If a boundary is required for accessibility (e.g., search inputs), use `outline_variant` at 15% opacity. **Never use 100% opaque borders.**
*   **Depth via Blur:** Use backdrop blurs on top-app-bars so food photography subtly bleeds through as the user scrolls, maintaining a sense of place.

---

## 5. Components

### Buttons (Butonlar)
*   **Primary:** Gradient (`primary` to `primary_container`), 16px (`xl`) rounded corners. Text: `on_primary`. High-impact, Appetizing.
*   **Secondary:** `surface_container_high` background with `primary` text. No border.
*   **Tertiary:** Transparent background, `on_surface` text, used for "Vazgeç" or "Daha Fazla."

### Cards & Lists (Kartlar ve Listeler)
*   **Food Cards:** Use `surface_container_lowest`. Forbid dividers. Use `spacing-6` (2rem) of vertical white space to separate items. 
*   **Courier Tasks:** Use high-contrast `secondary_container` for active delivery tasks to differentiate the Courier variant from the Customer variant instantly.

### Inputs (Giriş Alanları)
*   **Search/Text Fields:** `surface_container_low` background, 16px radius. Placeholder text in `on_surface_variant`. On focus, transition the background to `surface_container_lowest` with a "Ghost Border."

### Chips (Etiketler)
*   **Selection:** Used for "Mutfak Türü" (e.g., Burger, Kebap). Unselected: `surface_container_high`. Selected: `primary` with `on_primary` text.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use Turkish copy that matches the boutique feel (e.g., instead of "Satın Al," use "Lezzeti Keşfet").
*   **Do** prioritize "Negative Space." If a screen feels crowded, increase the spacing from `spacing-4` to `spacing-8`.
*   **Do** use `surface_tint` sparingly to highlight active states in the navigation bar.

### Don’t
*   **Don’t** use black (#000000) for text. Always use `on_surface` (#2c2f30) for a softer, more premium look.
*   **Don’t** use 1px dividers between list items. Use the spacing scale to create a "Visual Gap."
*   **Don’t** use standard Material shadows. If it looks like a "box," the shadow is too heavy. It should look like "light."
*   **Don’t** shrink body text below 16px for the Customer app. Accessibility is boutique; squinting is not.

---

## 7. Spacing & Rhythm
Rhythm is controlled by a strict 0.7rem-based scale.
*   **Container Padding:** Use `spacing-4` (1.4rem) for all screen edges.
*   **Component Gap:** Use `spacing-2` (0.7rem) for related elements (Label + Input).
*   **Section Gap:** Use `spacing-8` (2.75rem) to define new content areas.

This system ensures that whether the user is ordering a 5-course meal or a courier is navigating a delivery, the experience remains breathable, intentional, and unmistakably high-end.