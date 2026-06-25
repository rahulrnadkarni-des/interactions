import { type ComponentType } from 'react'
import JoystickSVG from '../components/joystick/JoystickSVG'

export interface Experiment {
  slug: string
  title: string
  tool: string
  date: string
  preview: ComponentType
}

export const experiments: Experiment[] = [
  {
    slug: 'joystick',
    title: 'Haptic Joystick',
    tool: 'React + Framer Motion',
    date: '24 Jun 2026',
    preview: JoystickSVG,
  },
]
