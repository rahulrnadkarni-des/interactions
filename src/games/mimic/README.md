# MIMIC

Single-mechanic top-down arena game. A mimic replays your exact movement history — tracing every step you took, in order. Collect enough orbs to wipe its memory and reset it. Every reset it comes back faster.

## Controls

| Input | Action |
|---|---|
| WASD / Arrow keys | Move player |
| Physical joystick | Move player (arcade mode) |
| Esc / ⏸ button | Pause |

## Mechanic

The mimic is not AI. It is you, delayed. On each reset, the delay window shrinks:

| Wave | Delay |
|---|---|
| 1 | 5000ms |
| 2 | 4500ms |
| 3 | 3750ms |
| 4 | 2750ms |
| 5 | 1500ms |
| 6+ | 400ms (floor) |

The spawn countdown also shrinks: `max(2000, 5000 - resetCount × 500)ms`.

## File

`public/games/mimic/index.html` — self-contained. No build step, no dependencies except Google Fonts. Works standalone in a browser or inside the arcade iframe.

## Integration

The arcade shell posts joystick input via postMessage:
```javascript
{ type: 'JOYSTICK', x: -1..1, y: -1..1 }
```

When running inside an iframe (`window !== window.top`), the in-game virtual joystick is hidden automatically.

## Design decisions

- Spawn delay shrinks with resets (avoids dead-time calm at high waves)
- Orb count to reset stays at 6 (speed escalation is pressure enough)
- No audio (Web Audio API requires user gesture; tricky in iframe context)
