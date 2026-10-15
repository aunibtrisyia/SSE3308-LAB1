import { useMemo, useState } from 'react'
import './App.css'

const locations = [
  { id: 'kl-city', state: 'Kuala Lumpur', area: 'Kuala Lumpur City Centre', region: 'Central', aqi: 128, pm25: 46, temperature: 32, humidity: 71, updated: '8 min ago' },
  { id: 'putrajaya', state: 'Putrajaya', area: 'Presint 9', region: 'Central', aqi: 82, pm25: 26, temperature: 31, humidity: 74, updated: '12 min ago' },
  { id: 'shah-alam', state: 'Selangor', area: 'Shah Alam', region: 'Central', aqi: 116, pm25: 41, temperature: 32, humidity: 72, updated: '5 min ago' },
  { id: 'petaling-jaya', state: 'Selangor', area: 'Petaling Jaya', region: 'Central', aqi: 94, pm25: 31, temperature: 31, humidity: 75, updated: '9 min ago' },
  { id: 'klang', state: 'Selangor', area: 'Klang', region: 'Central', aqi: 153, pm25: 58, temperature: 32, humidity: 78, updated: '6 min ago' },
  { id: 'seremban', state: 'Negeri Sembilan', area: 'Seremban', region: 'Central', aqi: 72, pm25: 22, temperature: 30, humidity: 79, updated: '14 min ago' },
  { id: 'ayer-keroh', state: 'Melaka', area: 'Ayer Keroh', region: 'Southern', aqi: 86, pm25: 27, temperature: 31, humidity: 78, updated: '13 min ago' },
  { id: 'ipoh', state: 'Perak', area: 'Ipoh', region: 'Northern', aqi: 64, pm25: 19, temperature: 30, humidity: 81, updated: '11 min ago' },
  { id: 'george-town', state: 'Penang', area: 'George Town', region: 'Northern', aqi: 108, pm25: 37, temperature: 31, humidity: 77, updated: '7 min ago' },
  { id: 'alor-setar', state: 'Kedah', area: 'Alor Setar', region: 'Northern', aqi: 48, pm25: 12, temperature: 30, humidity: 82, updated: '16 min ago' },
  { id: 'kangar', state: 'Perlis', area: 'Kangar', region: 'Northern', aqi: 39, pm25: 9, temperature: 29, humidity: 84, updated: '18 min ago' },
  { id: 'kota-bharu', state: 'Kelantan', area: 'Kota Bharu', region: 'East Coast', aqi: 57, pm25: 17, temperature: 29, humidity: 85, updated: '13 min ago' },
  { id: 'kuala-terengganu', state: 'Terengganu', area: 'Kuala Terengganu', region: 'East Coast', aqi: 44, pm25: 11, temperature: 29, humidity: 83, updated: '15 min ago' },
  { id: 'kuantan', state: 'Pahang', area: 'Kuantan', region: 'East Coast', aqi: 91, pm25: 29, temperature: 30, humidity: 80, updated: '10 min ago' },
  { id: 'johor-bahru', state: 'Johor', area: 'Johor Bahru', region: 'Southern', aqi: 137, pm25: 49, temperature: 32, humidity: 73, updated: '4 min ago' },
  { id: 'batu-pahat', state: 'Johor', area: 'Batu Pahat', region: 'Southern', aqi: 68, pm25: 21, temperature: 31, humidity: 77, updated: '17 min ago' },
  { id: 'kota-kinabalu', state: 'Sabah', area: 'Kota Kinabalu', region: 'East Malaysia', aqi: 52, pm25: 15, temperature: 29, humidity: 82, updated: '12 min ago' },
  { id: 'sandakan', state: 'Sabah', area: 'Sandakan', region: 'East Malaysia', aqi: 34, pm25: 8, temperature: 29, humidity: 86, updated: '19 min ago' },
  { id: 'kuching', state: 'Sarawak', area: 'Kuching', region: 'East Malaysia', aqi: 76, pm25: 24, temperature: 30, humidity: 81, updated: '9 min ago' },
  { id: 'miri', state: 'Sarawak', area: 'Miri', region: 'East Malaysia', aqi: 42, pm25: 10, temperature: 29, humidity: 84, updated: '16 min ago' },
  { id: 'labuan', state: 'Labuan', area: 'Victoria', region: 'East Malaysia', aqi: 29, pm25: 7, temperature: 29, humidity: 82, updated: '20 min ago' },
]

const states = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang',
  'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
  'Kuala Lumpur', 'Labuan', 'Putrajaya',
]

const filters = [
  { value: 'all', label: 'All readings' },
  { value: 'critical', label: 'Critical' },
  { value: 'mid', label: 'Mid' },
  { value: 'low', label: 'Low' },
]

const trendHours = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', 'Now']
const trendOffsets = [-28, -21, -13, 4, 12, 0]

function getSeverity(aqi) {
  if (aqi <= 50) return 'low'
  if (aqi <= 100) return 'mid'
  return 'critical'
}

function getSeverityLabel(severity) {
  return { low: 'Low', mid: 'Mid · Moderate', critical: 'Critical' }[severity]
}

function App() {
  const [selectedId, setSelectedId] = useState('kl-city')
  const [selectedState, setSelectedState] = useState('All states')
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortByHighest, setSortByHighest] = useState(true)

  const selected = locations.find((location) => location.id === selectedId) ?? locations[0]
  const counts = locations.reduce((result, location) => {
    result[getSeverity(location.aqi)] += 1
    return result
  }, { critical: 0, mid: 0, low: 0 })

  const visibleLocations = useMemo(() => {
    const query = search.trim().toLowerCase()
    return locations
      .filter((location) => selectedState === 'All states' || location.state === selectedState)
      .filter((location) => activeFilter === 'all' || getSeverity(location.aqi) === activeFilter)
      .filter((location) => !query || `${location.area} ${location.state} ${location.region}`.toLowerCase().includes(query))
      .sort((first, second) => sortByHighest ? second.aqi - first.aqi : first.aqi - second.aqi)
  }, [activeFilter, search, selectedState, sortByHighest])

  const trendValues = trendOffsets.map((offset) => Math.max(12, Math.min(190, selected.aqi + offset)))
  const highestTrend = Math.max(...trendValues)

  function clearFilters() {
    setSelectedState('All states')
    setActiveFilter('all')
    setSearch('')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand-wrap" href="#overview" aria-label="HazeWatch home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>
            <span className="brand-name">haze<span>watch</span></span>
            <span className="brand-tag">Malaysia air quality tracker</span>
          </span>
        </a>

        <nav className="topnav" aria-label="Main navigation">
          <a className="nav-active" href="#overview">Overview</a>
          <a href="#stations">Stations</a>
          <a href="#health-guide">Health guide</a>
        </nav>

        <div className="data-badge"><span /> Demo dashboard</div>
      </header>

      <main className="page">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <p className="eyebrow"><span className="live-dot" /> NATIONAL AIR QUALITY · MALAYSIA</p>
            <h1>A clearer view of the air <span>around you.</span></h1>
            <p className="lead">
              Explore sample Air Pollutant Index (API) readings by state and town.
              Know what the numbers mean and make a safer plan for your day.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#stations">Explore locations <span aria-hidden="true">↓</span></a>
              <span className="sample-note"><span className="info-icon">i</span> Educational sample data — not live readings</span>
            </div>
          </div>

          <article className={`hero-panel severity-${getSeverity(selected.aqi)}`} aria-label={`Selected reading for ${selected.area}`}>
            <div className="hero-panel-top">
              <div>
                <span className="panel-kicker">SELECTED LOCATION</span>
                <h2>{selected.area}</h2>
                <p>{selected.state}, Malaysia</p>
              </div>
              <span className={`severity-pill ${getSeverity(selected.aqi)}`}>{getSeverityLabel(getSeverity(selected.aqi))}</span>
            </div>
            <div className="aqi-display">
              <div className="aqi-number">{selected.aqi}</div>
              <div>
                <span className="aqi-caption">AIR POLLUTANT INDEX</span>
                <p>{selected.aqi <= 50 ? 'Air quality is good' : selected.aqi <= 100 ? 'Generally acceptable' : 'Sensitive groups take care'}</p>
              </div>
            </div>
            <div className="aqi-scale" aria-label="API scale from low to critical">
              <span className="scale-low" />
              <span className="scale-mid" />
              <span className="scale-critical" />
              <span className="scale-marker" style={{ left: `${Math.min(selected.aqi / 2, 98)}%` }} />
            </div>
            <div className="scale-labels"><span>Low 0–50</span><span>Mid 51–100</span><span>Critical 101+</span></div>
            <div className="hero-panel-foot"><span>◷ {selected.updated}</span><span>Sample station reading</span></div>
          </article>
        </section>

        <section className="stats-grid" aria-label="Malaysia sample overview">
          <article className="stat-card">
            <div className="stat-icon icon-purple">⌖</div>
            <div><p>Sample stations</p><h2>{locations.length}<span> locations</span></h2><small>Across 16 states &amp; territories</small></div>
          </article>
          <article className="stat-card critical-stat">
            <div className="stat-icon icon-red">!</div>
            <div><p>Critical API</p><h2>{counts.critical}<span> stations</span></h2><small>Above 100 · take precautions</small></div>
          </article>
          <article className="stat-card mid-stat">
            <div className="stat-icon icon-amber">◒</div>
            <div><p>Mid API</p><h2>{counts.mid}<span> stations</span></h2><small>51–100 · sensitive groups take care</small></div>
          </article>
          <article className="stat-card low-stat">
            <div className="stat-icon icon-green">✓</div>
            <div><p>Low API</p><h2>{counts.low}<span> stations</span></h2><small>0–50 · air quality is good</small></div>
          </article>
        </section>

        <section className="locations-panel" id="stations">
          <div className="section-heading">
            <div>
              <p className="eyebrow small">EXPLORE THE COUNTRY</p>
              <h2>Conditions by location</h2>
              <p className="section-subtitle">Choose a state or search for a town to see its sample reading.</p>
            </div>
            <label className="state-select-label">
              <span>Filter by state</span>
              <select value={selectedState} onChange={(event) => setSelectedState(event.target.value)}>
                <option>All states</option>
                {states.map((state) => <option key={state}>{state}</option>)}
              </select>
            </label>
          </div>

          <div className="location-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter readings by API level">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={`filter-tab ${activeFilter === filter.value ? 'active' : ''} ${filter.value}`}
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.value !== 'all' && <span className={`filter-dot ${filter.value}`} />}
                  {filter.label}
                  {filter.value !== 'all' && <span className="filter-count">{counts[filter.value]}</span>}
                </button>
              ))}
            </div>
            <div className="toolbar-actions">
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search town or state"
                  aria-label="Search town, state, or region"
                />
              </label>
              <button className="sort-button" type="button" onClick={() => setSortByHighest((value) => !value)}>
                <span aria-hidden="true">↕</span> API {sortByHighest ? 'high to low' : 'low to high'}
              </button>
            </div>
          </div>

          <div className="results-line">
            <span>Showing <strong>{visibleLocations.length}</strong> of {locations.length} sample stations</span>
            {(selectedState !== 'All states' || activeFilter !== 'all' || search) && (
              <button type="button" onClick={clearFilters}>Clear filters <span aria-hidden="true">×</span></button>
            )}
          </div>

          {visibleLocations.length > 0 ? (
            <div className="location-grid">
              {visibleLocations.map((location) => {
                const severity = getSeverity(location.aqi)
                return (
                  <button
                    key={location.id}
                    type="button"
                    className={`location-card ${selectedId === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedId(location.id)}
                    aria-pressed={selectedId === location.id}
                  >
                    <span className={`location-status ${severity}`} />
                    <span className="location-card-top">
                      <span className="location-area">{location.area}</span>
                      <span className={`severity-pill ${severity}`}>{getSeverityLabel(severity)}</span>
                    </span>
                    <span className="location-state">{location.state} <span>·</span> {location.region}</span>
                    <span className="location-card-bottom">
                      <span className="location-aqi"><strong>{location.aqi}</strong><span>API</span></span>
                      <span className="location-pm">PM2.5 <strong>{location.pm25} µg/m³</strong></span>
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>No locations match your filters</h3>
              <p>Try another town or clear the selected filters.</p>
              <button type="button" onClick={clearFilters}>Clear filters</button>
            </div>
          )}
          <p className="data-disclaimer">All readings shown are illustrative sample data for a student project and do not represent current official API measurements.</p>
        </section>

        <section className="insights-grid">
          <article className="trend-card">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow small">DAILY PATTERN · SAMPLE</p>
                <h2>API through the day</h2>
                <p className="section-subtitle">Illustrative trend for {selected.area}</p>
              </div>
              <span className={`severity-pill ${getSeverity(selected.aqi)}`}>Current {selected.aqi}</span>
            </div>
            <div className="trend-chart" role="img" aria-label={`Illustrative API trend for ${selected.area}: ${trendValues.join(', ')}`}>
              {trendValues.map((value, index) => (
                <div className="trend-column" key={trendHours[index]}>
                  <span className="trend-value">{value}</span>
                  <div className="trend-track"><span className={`trend-bar ${getSeverity(value)}`} style={{ height: `${Math.max(10, value / highestTrend * 100)}%` }} /></div>
                  <span className="trend-hour">{trendHours[index]}</span>
                </div>
              ))}
            </div>
            <div className="trend-foot"><span><i className="trend-legend" /> API reading</span><span>Sample trend · not a forecast</span></div>
          </article>

          <article className="guide-card" id="health-guide">
            <p className="eyebrow small">KNOW YOUR API</p>
            <h2>What should I do?</h2>
            <p className="section-subtitle">Simple steps for the selected reading.</p>
            <div className={`guidance-callout ${getSeverity(selected.aqi)}`}>
              <span className="guidance-icon">{selected.aqi > 100 ? '!' : selected.aqi > 50 ? '◒' : '✓'}</span>
              <div>
                <strong>{getSeverityLabel(getSeverity(selected.aqi))} · API {selected.aqi}</strong>
                <p>{selected.aqi > 100
                  ? 'Limit prolonged outdoor activity. Children, older adults, and people with breathing or heart conditions should take extra care.'
                  : selected.aqi > 50
                    ? 'Most people can continue usual activities. Sensitive individuals should consider reducing strenuous outdoor exercise.'
                    : 'Enjoy outdoor activities as usual. Keep checking local conditions as they can change.'}</p>
              </div>
            </div>
            <p className="health-note">If you experience breathing difficulty or persistent symptoms, seek advice from a healthcare professional.</p>
          </article>
        </section>

        <footer className="footer">
          <a className="brand-wrap footer-brand" href="#overview">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="brand-name">haze<span>watch</span></span>
          </a>
          <p>Know the air. Make a safer choice. <span>·</span> Student project demonstration</p>
          <a className="back-top" href="#overview">Back to top ↑</a>
        </footer>
      </main>
    </div>
  )
}

export default App
