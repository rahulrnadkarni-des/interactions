import { lazy, LazyExoticComponent } from 'react'

export interface Experiment {
  slug: string
  title: string
  tool: string
  date: string
  preview: LazyExoticComponent<object>
}

export const experiments: Experiment[] = [
  {
    slug: 'joystick',
    title: 'Haptic Joystick',
    tool: 'React + Framer Motion',
    date: '24 Jun 2026',
    preview: lazy(() => import('../components/joystick/JoystickPreview')),
  },
]
