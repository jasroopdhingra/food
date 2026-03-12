# Real Food

**Live:** [real-food-app.vercel.app](https://real-food-app.vercel.app/)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Stack

- **Next.js 16** (Turbopack) with App Router
- **React 19** with server and client components
- **Tailwind CSS v4** — theme defined inline in `globals.css`
- **GSAP + ScrollTrigger** — scroll-driven stat counters and text reveals
- **Framer Motion (motion)** — entrance animations, parallax, layout transitions
- **Lenis** — smooth scroll with GSAP ticker integration

## Design Decisions

**Typography.** Playfair Display (serif) for headlines, Inter (sans) for body. The contrast mirrors editorial/government design language — authoritative but approachable.

**Scroll-driven text reveals.** Both the Manifesto and Closing Statement use GSAP ScrollTrigger to fade word-chunks from 12% to full opacity as they enter the viewport. This forces the user to read at scroll pace, increasing engagement.

**Triple stat rings.** Three SVG ring counters (50%, 60%, 90%) animate on scroll-enter using GSAP with `once: true`. Each ring's stroke-dashoffset maps directly to the count-up value for a synchronized visual.

**Text scramble heading.** The "Three easy steps" cycling heading uses a custom split-flap effect — characters shuffle using only letters from the actual phrases before resolving left-to-right.

**Infinite food marquee.** CSS-animated `translateX(-50%)` on a doubled card set creates a seamless loop. Pauses on hover. GPU-accelerated with `will-change: transform`.

**Floating section nav.** A pill-shaped nav bar appears after scrolling past the hero. Uses `requestAnimationFrame` throttling and ref-based diffing to avoid re-renders on every scroll event. Active section uses Framer Motion `layoutId` for smooth position transitions.

**Scroll progress bar.** A 3px golden bar fixed at the viewport top tracks page scroll percentage. Purely CSS-driven width.

**Dark section with rounded corners.** The pyramid/guidelines section uses a `scale(0.96) → scale(1)` entrance animation with `overflow-hidden` and rounded corners to create a card-like feel within the page flow.

**Guidelines sticky behavior.** The resources section uses `sticky: bottom-0` so it remains visible while the user scrolls through the dark section, then naturally scrolls away.

## Next Steps

- **last section** wanted to add a CTA with eat real food, but would probably add something in between the previous statement and the last CTA so its not too text clunky
- **More food images.** Only 6 food assets exist. Adding 15-20 more would allow for cooler animations.
- **Accessibility audit.** ARIA attributes and reduced-motion support are in place, but a full screen-reader and keyboard navigation audit would be valuable.
- **Performance.** Consider lazy-loading the pyramid and guidelines images since they're below the fold. The GSAP bundle could be code-split.
