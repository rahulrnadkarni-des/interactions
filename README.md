# Daily AI Challenge

A personal arcade console UI built with React + Vite. Each experiment is a small interactive game or component built around a single haptic joystick.

Live at **[rahulrn-daily-ai.vercel.app](https://rahulrn-daily-ai.vercel.app)**

## Concept

The UI is modelled after a physical arcade cabinet — a dark red shell, a game screen, and a joystick control panel. Games are built to be controlled entirely through the joystick.

## Stack

- React + TypeScript + Vite
- Framer Motion — spring physics for joystick movement
- @use-gesture/react — drag input with circular clamping
- Vercel — deployment

## Structure

```
src/
  pages/
    ArcadeConsole.tsx   # main shell layout (screen + joystick panel)
    Gallery.tsx         # experiment card grid at /gallery
  components/
    joystick/
      JoystickSVG.tsx   # self-contained haptic joystick component
  experiments/
    index.ts            # experiment registry
```

## Experiments

| Slug | Title | Date |
|------|-------|------|
| `joystick` | Haptic Joystick | 24 Jun 2026 |

## Running locally

```bash
npm install
npm run dev
```

## Adding a new experiment

1. Build your component under `src/components/`
2. Register it in `src/experiments/index.ts`
3. It will appear automatically in the gallery at `/gallery`
