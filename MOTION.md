# MOTION.md — Dhiraj Kumar

Read this before designing, generating or animating anything for this brand. Built from the live site's own styles and one motion reference: the page-load intro of graysunderland.com (a loader line with a travelling dot, then a giant wordmark rising letter by letter in masks, the dot landing as its full stop). There were no frames in `examples/`; where the site and the reference say nothing, this file says ASK ME.

## 1. Colour

| Hex | Role |
| --- | --- |
| `#F7F2EB` ecru | The canvas. Every intro and overlay sits on it, so it blends into the page. |
| `#2B302C` charcoal | Type, rules and lines. |
| `#1C201D` charcoal deep | Pressed states and the darkest type. |
| `#58615B` charcoal muted | Secondary copy and mono labels. |
| `#7E8A82` charcoal faded | Hairlines, counters and tertiary labels. |
| `#D4A066` amber | The one accent: the dot, the progress head, a single highlight. Never a fill behind text. |
| `#B58249` amber dark | Amber on ecru when it must pass contrast (small text, icons). |
| `#EFE7DC` / `#E5DACB` ecru 200/300 | Tracks, borders and quiet panels. |

There is one accent per frame, and it is amber.

## 2. Type

- **Plus Jakarta Sans 800**, tight tracking (`-0.045em`), for display: the intro name and headlines. Size the intro name to the viewport (`clamp(3.5rem, 11vw, 12rem)`, or `14.5vw` on phones, where it fills the width between the 16px gutters). The designation under it is 600 weight at 0.22× the name size (0.26× on phones). The logo next to the name is 1.55× the name size (1.9× on phones, where it sits above the name). The splash logo at the start is up to 560px.
- **Plus Jakarta Sans 400–600** for body, 16–18px.
- **JetBrains Mono 500–600**, 11–12px, for labels, counters and role lines.
- **Caveat** is a handwritten accent only. It is never used in motion. ASK ME before animating it.

## 3. Timing

- **In:** a masked rise. Each letter or word rises from `y: 104%` to `0` inside an `overflow: hidden` mask over 1.05s, staggered 0.06s per letter or 0.03s per word.
- **Hold:** the finished lockup (logo, name and designation) holds about 1s, so the name and role can be read.
- **Out:** lines retract toward the side they did not start from (draw from left, retract to the right). Panels leave upward. Exits are 0.6–0.8s and faster than the entrance.
- **Total page-load intro:** written as an 8.4s timeline and played at 0.8× on a first visit, so about 10.5s; the finished lockup holds until about 9.3s. On a repeat visit in the same session it plays at 1.5×, about 5.6s. The scene times below are timeline seconds. Any wheel, key, pointer or touch input multiplies the speed by 5. It speeds through rather than cutting, so the visitor still sees the motion resolve.

## 4. How things move

- Browser-native at the display refresh rate (60–120fps). No motion on twos.
- **Easing:**
  - Entrances: `expo.out` → `cubic-bezier(0.16, 1, 0.3, 1)`
  - Line draws: `power3.inOut` → `cubic-bezier(0.65, 0, 0.35, 1)`
  - Exits: `expo.inOut` → `cubic-bezier(0.87, 0, 0.13, 1)`
  - Pops (dot and anchors): `back.out(2.5)` → `cubic-bezier(0.34, 1.8, 0.64, 1)`, 0.3–0.5s
- **One carried shape:** the logo. It is drawn big at the centre, shrinks, slides into the lockup, then flies into the navbar logo's place. Nothing else crosses scenes.
- **The logo is a cricket shot:** the left swoosh is the bat, the outer D is the pot, and the amber circle is the ball. When the logo moves on its own, it tells that story: the bat strikes the ball into the pot. ASK ME before giving the logo any other story.
- **Handmade feel:** the loading counter moves in uneven steps (0 → 18 → 46 → 71 → 90 → 100%), like real loading. The ball lands with a squash and one small bounce.

## 5. Texture and finish

- Flat ecru with the site's faint grid (`rgba(43,48,44,0.04)`, 32px) at most.
- Shadows only as the site defines them (`subtle`, `elevated`, `glow-amber`), plus the intro logo's soft drop shadow (`0 6px 10px rgba(43,48,44,0.16)`).
- **The ball is always flat 2D amber (`#D6A65F`), never shaded as a 3D sphere.** In the intro only, the pot and bat use a subtle top-lit charcoal gradient (`#555B55` → `#3F443F` → `#2A2E2A`). Everywhere else the logo is flat.
- No gradients on type, no blur-ins, no grain. ASK ME before adding texture anywhere else.

## 6. Never

1. Never block the page. The intro is skippable by any input and is skipped entirely under `prefers-reduced-motion`.
2. Never play sound on load.
3. Never use a second accent colour, neon, glow trails or gradients on text.
4. Never fade text in on its own. Text arrives through a mask or not at all.
5. Never cut to the site. The last frame of the intro must already be the first frame of the page: same canvas, same dot.

## 7. Done right: the page-load intro, shot by shot

Built in `src/components/IntroLoader.tsx`; the logo pieces come from `src/data/logoPaths.ts`.

1. **0.0s.** Ecru canvas with the faint grid. Mono labels at top-left rise: "Portfolio — Dhiraj Kumar" and "Ahmedabad, India". "Loading 000%" rises at bottom-right.
2. **0.2–1.6s.** The logo draws itself big at the centre (about half the screen): first the pot's outline, then the bat's, as 1.5px charcoal lines (`power3.inOut`).
3. **1.35–2.0s.** The fills flood in and the outlines fade away.
4. **1.8–3.6s. The shot.** The bat cocks back. The ball is bowled in from off-screen left, meets the bat at 2.44s, and the bat snaps through. The ball arcs up, drops into the pot, squashes, bounces once and settles. The counter hits 100%.
5. **3.4–4.35s.** The counter lifts away. The logo shrinks in place.
6. **4.4–5.35s.** The logo slides left into the lockup. "Dhiraj Kumar" rises letter by letter beside it (0.045s apart). "AI Engineer — Agentic Systems & Vision AI" rises below, and a hairline draws under it. On phones the logo sits above the name instead.
7. **6.6–7.4s.** The finished lockup holds so it can be read.
8. **7.4s.** Hand-off: the text lifts out of its masks, the panel leaves upward, and the logo flies into the navbar logo's place. The hero rises word by word as the panel clears. The intro is over, with no cut.

## 8. Scroll and interaction motion

Built from the primitives in `src/components/motion/`. Reach for these before writing new motion:
- `tokens.ts`: the easings and `VIEWPORT`.
- `primitives.tsx`:
  - `RiseText`: one masked block of text.
  - `MaskedWords`: a heading that rises word by word.
  - `Reveal`: a card that rises.
  - `Stagger` with `staggerItem` or `popItem`: lists.
  - `SectionRule`: the drawn top line of a section.
  - `CountUpText`: numbers that count up.
  - `TypeText`: typed text.
- `PipelineRail.tsx`: the ball travelling a row of stages.
- `DrawnLogo.tsx`: the logo drawing itself.

**Rules**
- Scroll reveals play **once**, when the element is about 12% inside the viewport (`VIEWPORT`). Nothing replays on scroll-up.
- **Section openings:**
  1. The top hairline draws left to right (1.2s, `power3.inOut`).
  2. The small label rises.
  3. The heading rises word by word, 0.035s apart.
  4. The description rises 0.25s after the label.
- **Cards and rows** rise 24–40px with opacity (0.85–0.9s, `expo.out`), staggered 0.05–0.1s. Only cards may fade; text never fades in on its own.
- **Selected states slide.** The navbar marker, scenario pills and project filters share one amber highlight that springs from the old choice to the new one (stiffness 420, damping 36).
- **The ball is the progress marker everywhere:**
  - It rides the reading-progress hairline under the navbar.
  - It travels the pipeline rail as Run Pipeline steps (one hop per 0.65s stage).
  - It travels the architecture rail in a case study.
  - It rides the tip of the Journey timeline, which is drawn by the scroll position itself (the only scroll-scrubbed motion besides the hero parallax).
- **Numbers count up** from zero on arrival (1.6s, `expo.out`). Only the digits change; the surrounding words stay put.
- **Case studies grow out of the card that opened them** (0.6s, `expo.inOut`) and shrink back into it on close.
- **Typing:** queries and log lines type out at about 18ms (logs 10ms) per character, capped at about 1.4s per line, with an amber caret.
- **Reduced motion:** `MotionConfig reducedMotion="user"` in `App.tsx` drops all movement. Count-ups and typing show their final text at once.
- **The handwritten quote** (Caveat) is the one place the handwriting moves: it writes itself left to right with a clip wipe (1.6s). Do not animate Caveat anywhere else without asking.

## 9. The arcade (Agentic Token Defender)

`src/components/ArcadeGame.tsx` is the interface. `src/components/arcade/engine.ts` holds the rules and canvas drawing.

- **Palette:** the site's colours, plus one exception. The danger colour `#C2573E` is allowed **only inside the arcade**, for bugs, hallucinations, damage and "WASTED". Good things are ecru (data tokens) or amber (the MCP shield, shots, combos).
- **The player is the logo.** It is drawn from the real logo geometry. Its ball is the ammunition: it launches as an amber shot and grows back in as the fire cooldown (0.2s) refills.
- **Game feel:**
  - Each shot leaves an amber trail.
  - Sparks burst with gravity.
  - Points rise as popups (amber once the combo multiplier is above ×1).
  - Being hit triggers 0.09s of hit-stop, a camera shake and a danger-coloured vignette, then 1.4s of blinking invulnerability.
  - The shield shows as a rotating dashed ring with an arc draining down its 6 seconds.
- **Pacing:**
  - Layers advance every 25 seconds survived (not on score). Each layer adds 12% fall speed and spawns faster.
  - The combo multiplier rises by 1 for every 8 good actions in a row, up to ×4.
  - Shooting a data token, or letting one fall, breaks the combo. That keeps holding down fire from being the best strategy.
- **Interface motion:**
  - The panel rises in and out (0.6s, `expo.inOut`).
  - Screen titles use `MaskedWords`.
  - 3-2-1-GO numbers pop in (`back.out`).
  - The score bumps on every change, and lives are amber balls that drop away when lost.
  - Layer banners rise through a mask with a drawn amber rule.
  - The final score counts up, and "NEW BEST" pops in with amber and ecru confetti.
- **Physics** use real time (dt, capped at 33ms), so the game plays the same at 60Hz and 120Hz. The canvas renders at device pixel ratio (up to 2×) inside a fixed 26:23 frame, so nothing stretches.
- **Reduced motion:** no camera shake or damage flash. Everything else still plays, because the game needs it.
- **Controls:**
  - Keyboard: arrows or A/D, Space to fire, P to pause, Esc to close, Enter to start.
  - Pointer: steer by mouse or drag; holding down fires.
  - Phones: on-screen buttons.
  - Hiding the tab pauses the run.
