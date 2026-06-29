# AGENTS.md

Repository-wide engineering guidelines for AI coding agents

These instructions apply to all AI coding agents working in this repository (Claude Code, Codex, Cursor, Copilot, Gemini CLI, Aider, etc.).

The objective is to produce production-quality, maintainable software, not just working code.

## Technology Stack

- React
- TypeScript (strict mode)
- Vite
- Framer Motion

## Core Principles

In order of priority:

1. Correctness
2. Maintainability
3. Simplicity
4. Readability
5. Performance

Prefer simple, boring, predictable solutions over clever ones.

Write code that another engineer can understand quickly without context.

## Before Writing Code

Before implementing any feature:

- Understand existing architecture first
- Read relevant files before making changes
- Reuse existing components and utilities when possible
- Avoid duplicating logic
- Prefer modifying existing code over adding new files
- Do not start coding until the structure and location are clear
- If unclear, reason about architecture before implementation

## Definition of Done

A task is complete only when:

- TypeScript compiles with zero errors
- Linting passes
- No unused imports remain
- No dead code remains
- No TODO comments are introduced
- No debugging code remains
- Existing behavior is preserved unless explicitly changed
- Implementation matches project architecture
- Related code has been cleaned up where necessary

## Testing

Testing is encouraged when it provides long-term value.

Prefer testing:

- Pure game logic
- Utility functions
- State machines
- Scoring systems
- Collision detection logic
- Input handling logic
- Randomized systems (with deterministic control when possible)
- Win/loss conditions
- Serialization and persistence logic

Avoid testing:

- UI layout and styling
- Framer Motion animations
- Simple presentational components
- Trivial React rendering logic
- Over-snapshotting components

Guidelines:

- Extract testable logic out of React components
- Prefer testing logic over UI
- If code is not testable, consider refactoring it
- Do not create artificial or low-value tests solely for coverage

## Repository Structure

Preferred structure:

```
src/
├── assets/
├── components/
├── games/
│   └── game-name/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── logic/
│       ├── types/
│       └── README.md
├── hooks/
├── lib/
├── pages/
├── services/
├── types/
└── utils/
```

Rules:

- components: reusable UI components
- pages: page composition only
- games: isolated game modules
- hooks: reusable React logic
- services: external integrations
- utils: pure functions
- types: shared type definitions
- lib: shared internal framework code

Do not create arbitrary or duplicated folder structures.

## React Guidelines

Prefer:

- Functional components
- Composition over inheritance
- Small focused components
- Early returns

Avoid:

- Large monolithic components
- Deep prop drilling
- Anonymous components
- Excessive nesting
- Mixing multiple responsibilities in one component

If a component becomes large or unclear, split it.

## State Management

- Keep state local whenever possible
- Do not lift state unless required
- Do not store derived values in state
- Avoid unnecessary useEffect usage
- Extract custom hooks for complex state logic

## TypeScript Rules

Strict mode is required.

Never:

- use any
- ignore TypeScript errors
- suppress type checking

Prefer:

- interfaces for object shapes
- discriminated unions for state
- reusable shared types
- explicit return types for exported functions

Types must represent domain logic, not bypass the compiler.

## Functions

Functions should:

- Do one thing
- Have clear, descriptive names
- Minimize side effects
- Be as pure as possible

Avoid large multi-purpose functions.

## Components

Components should focus on rendering UI only.

Business logic belongs in:

- hooks
- services
- utils

Do not embed complex logic inside JSX.

If JSX becomes hard to read, extract subcomponents.

## Framer Motion

Use Framer Motion for animations.

Rules:

- Animations should improve UX, not distract
- Prefer subtle motion
- Avoid duplicating animation objects across components
- Extract reusable animation variants when repeated
- Respect reduced motion preferences when practical

## Styling

- Keep styling consistent
- Avoid large inline styles
- Avoid duplication in CSS
- Avoid arbitrary values without justification
- Prefer reusable patterns over one-off styles

## Games Architecture

Each game must be fully isolated.

A game may include:

- components
- hooks
- logic
- assets
- types
- README.md

Rules:

- Game logic must not depend on global UI components
- Business logic must be separated from rendering
- Games should be self-contained modules

## Naming Conventions

Use clear, descriptive names.

Good:

- PlayerCard
- useJoystick
- calculateScore
- gameState

Bad:

- temp
- data
- obj
- foo
- thing

Names must express intent.

## Import Rules

- Group imports consistently:
  1. React
  2. External libraries
  3. Internal modules
  4. Styles

- Remove unused imports immediately
- Avoid circular dependencies

## Error Handling

- Do not ignore errors silently
- Avoid empty catch blocks
- Provide meaningful error messages
- Handle failure cases explicitly

## Performance

Optimize only when necessary.

Avoid premature optimization.

Do not:

- add unnecessary memoization
- overuse useMemo or useCallback
- optimize before correctness

Prefer readable code first.

## Refactoring Rules

When modifying code:

- Remove duplication
- Improve naming
- Simplify logic
- Improve type safety
- Delete dead code
- Reduce complexity

Leave code cleaner than before.

## Dependencies

Before adding a dependency:

- Check if the feature can be implemented simply
- Prefer minimal dependency usage
- Ensure the library is maintained and necessary

## Documentation

Document:

- Complex logic
- Architectural decisions
- Non-obvious behavior

Do not document obvious code.

Code should remain self-explanatory.

## AI Workflow

For every task:

1. Understand existing code and structure
2. Decide where changes belong
3. Explain approach if needed
4. Implement changes
5. Refactor surrounding code if required
6. Ensure consistency with architecture

Do not generate code without understanding context.

## Allowed Improvements During Work

AI is allowed to:

- Improve naming
- Remove duplication
- Extract reusable logic
- Improve types
- Simplify logic
- Remove dead code

Do not perform unrelated large refactors unless explicitly requested.

## Git Hygiene

- One logical change per commit
- Keep commits focused

Never commit:

- secrets or tokens
- environment files
- local cache/state
- editor files
- build artifacts
- temporary debugging code

## Forbidden Practices

Do not:

- use `any`
- disable TypeScript
- disable lint rules
- duplicate logic
- leave commented-out code
- introduce global mutable state unnecessarily
- mix business logic and UI concerns
- add unnecessary dependencies
- bypass architecture without justification

## Final Checklist

Before finishing a task:

- Architecture remains consistent
- Components are small and focused
- No duplicated logic exists
- Types are correct and strict
- Imports are clean
- Naming is clear and intentional
- Dead code is removed
- Styling is consistent
- Logic is testable where appropriate
- Implementation is minimal and maintainable
