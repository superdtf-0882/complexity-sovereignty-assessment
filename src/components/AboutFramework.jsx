import { useState } from 'react'

export default function AboutFramework() {
  const [open, setOpen] = useState(false)

  return (
    <div className="about-framework">
      <button className="about-toggle" onClick={() => setOpen(o => !o)}>
        About this framework — methodology and scoring criteria
        <span className={`about-toggle-icon${open ? ' open' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="about-content">
          <h3>Complexity Assessment (5 questions, 0–10 scale)</h3>
          <ol>
            <li>
              <strong>Export uniqueness.</strong> Do your top exports require capabilities that fewer than five other countries can replicate at scale? Score 2 if yes (aerospace, advanced semis, specialty chemicals, precision machinery). Score 1 if partially (mid-tier manufacturing, some proprietary technology). Score 0 if primarily commodities, low-value assembly, or services with easy substitutes.
            </li>
            <li>
              <strong>Trajectory.</strong> Is the complexity of your export basket increasing? Score 2 if clear upward movement over the past decade (new sectors, rising ECI, growing R&D-intensive exports). Score 1 if flat or mixed. Score 0 if declining (deindustrialization, commodity dependence growing).
            </li>
            <li>
              <strong>Dutch disease resistance.</strong> Is your industrial base insulated from commodity-export crowding? Score 2 if minimal commodity exposure or effective insulation. Score 1 if commodity rents present but manufacturing still competitive. Score 0 if commodity dependence actively eroding manufacturing capacity.
            </li>
            <li>
              <strong>Brain drain direction.</strong> Are you a net importer of high-skill talent? Score 2 if yes (talent magnet in key sectors). Score 1 if roughly neutral. Score 0 if significant net outflow of technical and scientific talent.
            </li>
            <li>
              <strong>FDI quality.</strong> Is inbound foreign investment building productive capacity, or extracting rents? Score 2 if predominantly technology transfer, R&D, or advanced manufacturing FDI. Score 1 if mixed. Score 0 if predominantly extractive or financial.
            </li>
          </ol>

          <h3>Sovereignty Assessment (10 questions, 0–10 scale)</h3>
          <ol>
            <li>
              <strong>Airframe and engine sovereignty.</strong> Can you design, build, and field a frontline combat aircraft with a domestically produced engine? Score 1 if full sovereign capability. Score 0.5 if airframe domestic but engine foreign, or if only trainer/light aircraft. Score 0 if fully foreign-dependent.
            </li>
            <li>
              <strong>Nuclear deterrent.</strong> Do you possess an operationally deployed nuclear deterrent under your sole command authority? Score 1 if yes. Score 0 if no, regardless of civilian nuclear capability.
            </li>
            <li>
              <strong>Arms export freedom.</strong> Can you sell weapons to any buyer without requiring third-party permission? Score 1 if yes (no ITAR-equivalent dependency in your key systems). Score 0.5 if partial (some systems restricted, others free). Score 0 if your primary military exports require US or other-power licenses.
            </li>
            <li>
              <strong>Software sovereignty.</strong> Are the operating systems, communications infrastructure, and command-and-control software in your military systems domestically developed or fully audited? Score 1 if yes. Score 0.5 if partially (some sovereign, some foreign-sourced). Score 0 if primarily foreign software in critical systems.
            </li>
            <li>
              <strong>Others seek your technology.</strong> Are foreign militaries or defense industries seeking to acquire, license, or copy your systems? Score 1 if yes — you are a technology exporter in defense. Score 0.5 if niche or limited cases. Score 0 if not applicable.
            </li>
            <li>
              <strong>Consistent strategic doctrine.</strong> Does your state have a coherent, publicly articulated strategic doctrine that has been applied consistently over more than a decade? Score 1 if yes. Score 0.5 if partial or recently developed. Score 0 if strategic policy is reactive, outsourced, or incoherent.
            </li>
            <li>
              <strong>Domestic procurement.</strong> Is the majority of your military equipment domestically designed and manufactured? Score 1 if yes (&gt;60% by value, including major platforms). Score 0.5 if mixed (significant domestic programs alongside foreign purchases). Score 0 if primarily foreign-sourced.
            </li>
            <li>
              <strong>Survive without alliance.</strong> Could your state credibly defend its territory against a major adversary for more than 30 days without allied support? Score 1 if yes. Score 0 if no — alliance dependency is existential.
            </li>
            <li>
              <strong>Edge chip access.</strong> Do you produce or have guaranteed sovereign access to leading-edge semiconductors (sub-5nm) for defense applications? Score 1 if domestic production. Score 0.5 if allied production with no demonstrated denial risk. Score 0 if dependent on potentially hostile or unreliable suppliers.
            </li>
            <li>
              <strong>Autonomous systems operations.</strong> Have you fielded autonomous or semi-autonomous systems in actual combat operations, not just exercises? Score 1 if yes with demonstrated effect. Score 0.5 if fielded but limited operational record. Score 0 if not yet operationally deployed.
            </li>
          </ol>

          <p style={{ marginTop: 16 }}>
            <strong>Binding constraint</strong> = min(complexity total, sovereignty total). The lower score governs strategic agency — a country cannot exercise sovereignty it cannot fund, and cannot sustain economic complexity it cannot defend.
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>Tier classification:</strong> Binding constraint ≥7 = Tier 1 (full-spectrum power), ≥5 = Tier 2 (regional sovereign), ≥3 = Tier 3 (partial sovereign), {'<'}3 = Tier 4 (dependent actor).
          </p>
        </div>
      )}
    </div>
  )
}
