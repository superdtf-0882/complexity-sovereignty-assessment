import { useState } from 'react'
import countries from './data/countries.json'
import GridView from './components/GridView'
import DetailView from './components/DetailView'
import CompareView from './components/CompareView'
import AboutFramework from './components/AboutFramework'
import './index.css'
import './App.css'

export default function App() {
  const [view, setView] = useState('grid')
  const [selectedId, setSelectedId] = useState(null)
  const [sortKey, setSortKey] = useState('binding_constraint')
  const [sortDir, setSortDir] = useState('desc')
  const [tierFilter, setTierFilter] = useState(0)

  function getSortedFiltered() {
    let list = tierFilter ? countries.filter(c => c.tier === tierFilter) : [...countries]
    list.sort((a, b) => {
      let av, bv
      if (sortKey === 'name') { av = a.name; bv = b.name }
      else if (sortKey === 'complexity') { av = a.complexity.total; bv = b.complexity.total }
      else if (sortKey === 'sovereignty') { av = a.sovereignty.total; bv = b.sovereignty.total }
      else if (sortKey === 'gap') { av = a.gap; bv = b.gap }
      else { av = a.binding_constraint; bv = b.binding_constraint }
      if (sortKey === 'name') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      return sortDir === 'asc' ? av - bv : bv - av
    })
    return list
  }

  const sorted = getSortedFiltered()
  const selectedCountry = countries.find(c => c.id === selectedId)
  const selectedIdx = sorted.findIndex(c => c.id === selectedId)

  function openDetail(id) {
    setSelectedId(id)
    setView('detail')
  }

  function goBack() {
    setView('grid')
    setSelectedId(null)
  }

  function navDetail(dir) {
    const newIdx = selectedIdx + dir
    if (newIdx >= 0 && newIdx < sorted.length) {
      setSelectedId(sorted[newIdx].id)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-title-block">
            <h1 className="app-title">Complexity–Sovereignty Assessment</h1>
            <p className="app-subtitle">
              A companion tool to essays published at{' '}
              <a href="https://superdtf.substack.com" target="_blank" rel="noopener noreferrer">
                superdtf.substack.com
              </a>
            </p>
          </div>
          <nav className="app-tabs">
            <button
              className={`tab-btn${view === 'grid' ? ' active' : ''}`}
              onClick={() => setView('grid')}
            >Grid</button>
            <button
              className={`tab-btn${view === 'compare' ? ' active' : ''}`}
              onClick={() => setView('compare')}
            >Compare</button>
            {view === 'detail' && selectedCountry && (
              <button className="tab-btn active">{selectedCountry.name}</button>
            )}
          </nav>
        </div>
      </header>

      <div className="app-body">
        <div className="app-body-inner">
          <AboutFramework />

          {view === 'grid' && (
            <GridView
              countries={sorted}
              sortKey={sortKey}
              sortDir={sortDir}
              tierFilter={tierFilter}
              onSort={(key) => {
                if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
                else { setSortKey(key); setSortDir('desc') }
              }}
              onFilter={setTierFilter}
              onSelect={openDetail}
            />
          )}

          {view === 'detail' && selectedCountry && (
            <DetailView
              country={selectedCountry}
              onBack={goBack}
              onPrev={selectedIdx > 0 ? () => navDetail(-1) : null}
              onNext={selectedIdx < sorted.length - 1 ? () => navDetail(1) : null}
              prevName={selectedIdx > 0 ? sorted[selectedIdx - 1].name : null}
              nextName={selectedIdx < sorted.length - 1 ? sorted[selectedIdx + 1].name : null}
            />
          )}

          {view === 'compare' && (
            <CompareView countries={countries} />
          )}
        </div>
      </div>
    </div>
  )
}
