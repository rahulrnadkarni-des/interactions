import { Suspense } from 'react'
import { experiments } from '../experiments'
import './Gallery.css'

export default function Gallery() {
  return (
    <div className="gallery">
      <h1 className="gallery-title">Daily AI Challenge</h1>
      <div className="gallery-grid">
        {experiments.map((exp) => {
          const Preview = exp.preview
          return (
            <div key={exp.slug} className="gallery-card">
              <div className="card-image">
                <Suspense fallback={null}>
                  <Preview />
                </Suspense>
              </div>
              <div className="card-meta">
                <div className="card-text">
                  <span className="card-name">{exp.title}</span>
                  <span className="card-date">{exp.date}</span>
                </div>
                <div className="card-divider" />
                <span className="card-tag">{exp.tool}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
