import type { ReactElement } from 'react'
import { experiments, type Experiment } from '../experiments'
import './Gallery.css'

function PreviewCard({ exp }: { exp: Experiment }): ReactElement {
  const Component = exp.preview
  return (
    <div className="gallery-card">
      <div className="card-image">
        <Component />
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
}

export default function Gallery(): ReactElement {
  return (
    <div className="gallery">
      <h1 className="gallery-title">Daily AI Challenge</h1>
      <div className="gallery-grid">
        {experiments.map((exp) => (
          <PreviewCard key={exp.slug} exp={exp} />
        ))}
      </div>
    </div>
  )
}
