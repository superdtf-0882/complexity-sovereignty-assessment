import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts'

const COMPLEXITY_KEYS = [
  { key: 'q1_export_uniqueness', label: 'Export Uniq.' },
  { key: 'q2_trajectory', label: 'Trajectory' },
  { key: 'q3_dutch_disease', label: 'Dutch Disease' },
  { key: 'q4_brain_drain', label: 'Brain Drain' },
  { key: 'q5_fdi_quality', label: 'FDI Quality' },
]

const SOVEREIGNTY_KEYS = [
  { key: 'q1_airframe_engine', label: 'Airframe/Engine' },
  { key: 'q2_nuclear', label: 'Nuclear' },
  { key: 'q3_arms_sales_free', label: 'Arms Freedom' },
  { key: 'q4_software_sovereign', label: 'SW Sovereign' },
  { key: 'q5_others_seek_your_tech', label: 'Tech Pull' },
  { key: 'q6_consistent_doctrine', label: 'Doctrine' },
  { key: 'q7_build_domestically', label: 'Dom. Procure' },
  { key: 'q8_survive_without_alliance', label: 'No Alliance' },
  { key: 'q9_edge_chips', label: 'Edge Chips' },
  { key: 'q10_autonomous_ops', label: 'Autonomous Ops' },
]

export function buildRadarData(country) {
  return [
    ...COMPLEXITY_KEYS.map(({ key, label }) => ({
      subject: label,
      value: country.complexity[key] ?? 0,
      fullMark: 2,
    })),
    ...SOVEREIGNTY_KEYS.map(({ key, label }) => ({
      subject: label,
      value: country.sovereignty[key] ?? 0,
      fullMark: 1,
    })),
  ]
}

export default function CountryRadar({ country, height = 340 }) {
  const data = buildRadarData(country)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#6b6b6b' }}
        />
        <Radar
          name={country.name}
          dataKey="value"
          fill="rgba(24,95,165,0.2)"
          stroke="#185FA5"
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function CompareRadar({ countryA, countryB, height = 380 }) {
  const dataA = buildRadarData(countryA)
  const dataB = buildRadarData(countryB)

  const merged = dataA.map((d, i) => ({
    subject: d.subject,
    [countryA.name]: d.value,
    [countryB.name]: dataB[i].value,
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={merged} outerRadius="72%">
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#6b6b6b' }}
        />
        <Radar
          name={countryA.name}
          dataKey={countryA.name}
          fill="rgba(24,95,165,0.18)"
          stroke="#185FA5"
          strokeWidth={2}
        />
        <Radar
          name={countryB.name}
          dataKey={countryB.name}
          fill="rgba(59,109,17,0.18)"
          stroke="#3B6D11"
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
