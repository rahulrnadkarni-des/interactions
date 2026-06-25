import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ArcadeConsole from './pages/ArcadeConsole'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArcadeConsole />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )
}
