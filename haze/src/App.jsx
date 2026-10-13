import { useState } from 'react'
import './App.css'

const zoneData = {
  Downtown: {
    aqi: 168,
    status: 'Unhealthy',
    pm25: '87 µg/m³',
    humidity: '72%',
    visibility: '2.1 km',
    temperature: '30°C',
    checklist: [
      'Wear an N95 mask outdoors',
      'Limit intense exercise',
      'Keep windows closed if possible',
    ],
  },
  'School Zone': {
    aqi: 122,
    status: 'Sensitive groups',
    pm25: '62 µg/m³',
    humidity: '74%',
    visibility: '3.4 km',
    temperature: '29°C',
    checklist: [
      'Monitor children with asthma',
      'Reduce outdoor recess time',
      'Use clean-air rooms indoors',
    ],
  },
  'Coastal Road': {
    aqi: 93,
    status: 'Moderate',
    pm25: '41 µg/m³',
    humidity: '68%',
    visibility: '5.6 km',
    temperature: '31°C',
    checklist: [
      'Avoid peak-hour traffic',
      'Keep hydration levels up',
      'Check air quality before workouts',
    ],
  },
}

const keyMetrics = [
  { label: 'AQI', value: '168', note: 'Smoke concentration is elevated' },
  { label: 'PM2.5', value: '87', note: 'Fine particles remain hazardous' },
  { label: 'Visibility', value: '2.1 km', note: 'Reduced by suspended pollutants' },
]

const hazeTrend = [
  { hour: '6 AM', value: 42 },
  { hour: '9 AM', value: 58 },
  { hour: '12 PM', value: 74 },
  { hour: '3 PM', value: 94 },
  { hour: '6 PM', value: 88 },
  { hour: '9 PM', value: 69 },
]

const quickActions = [
  'Use a properly fitted mask whenever outside',
  'Keep ventilation systems filtered and windows shut during peak haze',
  'Reduce outdoor exercise for children and older adults',
  'Create cleaner indoor spaces with HEPA filtration where possible',
]

const symptoms = [
  'Irritated eyes, throat, or nose',
  'Dry cough, wheezing, or shortness of breath',
  'Headache, dizziness, or unusual fatigue',
  'Asthma flare-ups or worsening allergy symptoms',
]

const responseSteps = [
  'Activate air-quality alerts for staff and residents',
  'Schedule outdoor activities away from peak haze hours',
  'Keep emergency contact and health guidance ready',
]

function App() {
  const [activeZone, setActiveZone] = useState('Downtown')
  const current = zoneData[activeZone]

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">H</div>
          <div>
            <p className="brand-name">HazeWatch</p>
            <span className="brand-tag">Clearer air starts here</span>
          </div>
        </div>

        <nav className="topnav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#pattern">Regional pattern</a>
          <a href="#prepare">Preparedness</a>
        </nav>
      </header>

      <main className="page">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">Haze awareness</p>
            <h1>Air quality is changing. So should your response.</h1>
            <p className="lead">
              Smoke, dust, and fine particles can affect health quickly. Stay ahead of haze conditions,
              protect vulnerable groups, and plan safer routines before air quality worsens.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#conditions">View air conditions <span aria-hidden="true">↗</span></a>
              <a href="#prepare" className="secondary-link">Preparedness guide</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Air quality overview">
            <div className="sample-label">Sample dashboard data</div>
            <div className="aqi-ring">
              <div className="aqi-content">
                <span>Current AQI</span>
                <strong>{current.aqi}</strong>
                <small>{current.status}</small>
              </div>
            </div>
            <div className="mini-bars" aria-hidden="true">
              <span style={{ height: '38%' }} />
              <span style={{ height: '52%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '64%' }} />
              <span style={{ height: '83%' }} />
              <span style={{ height: '92%' }} />
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Key haze indicators">
          {keyMetrics.map((metric) => (
            <article key={metric.label} className="stat-card">
              <p>{metric.label}</p>
              <h2>{metric.value}</h2>
              <span>{metric.note}</span>
            </article>
          ))}
        </section>

        <section className="overview-panel" id="conditions">
          <div className="panel-header">
            <div>
              <p className="eyebrow small">Regional outlook · Sample data</p>
              <h2>Air quality around you</h2>
            </div>
            <span className="alert-tag">{current.status}</span>
          </div>

          <div className="zone-layout">
            <div className="zone-switcher" aria-label="Choose a location">
              {Object.keys(zoneData).map((zone) => (
                <button
                  key={zone}
                  type="button"
                  className={zone === activeZone ? 'zone-btn active' : 'zone-btn'}
                  onClick={() => setActiveZone(zone)}
                >
                  {zone}
                </button>
              ))}
            </div>

            <div className="status-card">
              <div className="status-head">
                <span className="status-label">Selected area</span>
                <strong>{activeZone}</strong>
              </div>

              <div className="status-body">
                <div>
                  <span>Temperature</span>
                  <strong>{current.temperature}</strong>
                </div>
                <div>
                  <span>Humidity</span>
                  <strong>{current.humidity}</strong>
                </div>
                <div>
                  <span>Visibility</span>
                  <strong>{current.visibility}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="condition-grid">
            <div className="condition-main">
              <div className="reading-row">
                <span>PM2.5</span>
                <strong>{current.pm25}</strong>
              </div>
              <div className="reading-row">
                <span>Humidity</span>
                <strong>{current.humidity}</strong>
              </div>
              <div className="reading-row">
                <span>Visibility</span>
                <strong>{current.visibility}</strong>
              </div>
            </div>

            <div className="checklist-box">
              {current.checklist.map((item) => (
                <div key={item} className="check-item">
                  <span className="check-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="trend-card" id="pattern">
          <div className="panel-header">
            <div>
              <p className="eyebrow small">Haze trend</p>
              <h2>24-hour air quality pattern</h2>
            </div>
            <span className="alert-tag">Peak at 3 PM</span>
          </div>

          <div className="trend-chart" aria-hidden="true">
            {hazeTrend.map((point) => (
              <div key={point.hour} className="trend-column">
                <div className="trend-bar" style={{ height: `${point.value}%` }} />
                <span>{point.hour}</span>
              </div>
            ))}
          </div>

          <p className="trend-summary">
            PM2.5 levels rise sharply during the afternoon and remain elevated into the evening,
            meaning outdoor exposure should be reduced and cleaner indoor spaces should be prioritized.
          </p>
        </section>

        <section className="info-grid" id="prepare">
          <article className="info-card">
            <p className="eyebrow small">Preparedness</p>
            <h3>Recommended actions</h3>
            <ul className="tip-list">
              {quickActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </article>

          <article className="info-card">
            <p className="eyebrow small">Health watch</p>
            <h3>Early warning signs</h3>
            <ul className="tip-list warning-list">
              {symptoms.map((symptom) => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="response-panel">
          <div>
            <p className="eyebrow small">Response framework</p>
            <h3>Practical planning for schools, teams, and communities</h3>
          </div>

          <div className="response-grid">
            {responseSteps.map((step, index) => (
              <div key={step} className="response-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
