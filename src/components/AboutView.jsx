import { useState } from 'react'

function Section({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="about-section">
      <button className="about-toggle" onClick={() => setOpen(o => !o)}>
        {title}
        <span className={`about-toggle-icon${open ? ' open' : ''}`}>▼</span>
      </button>
      {open && <div className="about-content">{children}</div>}
    </div>
  )
}

export default function AboutView() {
  return (
    <div className="about-view">

      <Section title="About this framework">
        <p>
          The Complexity–Sovereignty Assessment evaluates nations along two independent dimensions. <strong>Economic complexity</strong> measures the sophistication and uniqueness of a country's export basket — not the size of its economy, but the difficulty of replicating what it produces. <strong>Strategic sovereignty</strong> measures the degree to which a country can build, field, command, and sustain military systems without requiring permission, components, or doctrine from any external actor.
        </p>
        <p>
          The two scores produce a <strong>binding constraint</strong> — the lower of the two values — which governs actual strategic agency. A country cannot exercise sovereignty it cannot fund (the economy is the binding constraint), and cannot sustain economic complexity it cannot defend (the military is the binding constraint). The binding constraint is the number that matters most in this framework.
        </p>
        <p>
          The <strong>gap</strong> column measures the absolute difference between the two scores. A large gap indicates structural imbalance: the higher-scoring dimension cannot compensate for the lower. Germany's gap of 6 — 9 on complexity, 3 on sovereignty — is the most extreme in the dataset. Russia's gap of 5 runs in the opposite direction. Both represent strategic vulnerabilities, just different ones.
        </p>
      </Section>

      <Section title="The Complexity Assessment">
        <p>Five questions, each scored 0–2. Maximum total: 10.</p>
        <ol>
          <li>
            <strong>Export uniqueness.</strong> Do your top exports require capabilities that fewer than five other countries can replicate at scale? Score 2 if yes (aerospace, advanced semiconductors, specialty chemicals, precision machinery). Score 1 if partially (mid-tier manufacturing, some proprietary technology). Score 0 if primarily commodities, low-value assembly, or services with easy substitutes.
          </li>
          <li>
            <strong>Trajectory.</strong> Is the complexity of your export basket increasing? Score 2 if clear upward movement over the past decade (new sectors, rising Economic Complexity Index, growing R&amp;D-intensive exports). Score 1 if flat or mixed. Score 0 if declining (deindustrialisation, commodity dependence growing).
          </li>
          <li>
            <strong>Dutch Disease resistance.</strong> Is your industrial base insulated from commodity-export crowding? Score 2 if minimal commodity exposure or effective insulation (e.g. sovereign wealth fund as structural hedge). Score 1 if commodity rents present but manufacturing still competitive. Score 0 if commodity dependence is actively eroding manufacturing capacity.
          </li>
          <li>
            <strong>Brain drain direction.</strong> Are you a net importer of high-skill talent in the sectors that matter? Score 2 if yes (talent magnet in science, engineering, defence). Score 1 if roughly neutral. Score 0 if significant net outflow of technical and scientific talent to richer economies.
          </li>
          <li>
            <strong>FDI quality.</strong> Is inbound foreign investment building productive capacity, or extracting rents? Score 2 if predominantly technology transfer, R&amp;D, or advanced manufacturing FDI. Score 1 if mixed. Score 0 if predominantly extractive, financial, or real-estate FDI.
          </li>
        </ol>
      </Section>

      <Section title="The Sovereignty Assessment">
        <p>Ten questions, each scored 0–1 with partial credit (0.5) where a country partially meets the criterion. Maximum total: 10.</p>
        <ol>
          <li>
            <strong>Airframe and engine sovereignty.</strong> Can you design, build, and field a frontline combat aircraft with a domestically produced engine? Score 1 if full sovereign capability. Score 0.5 if airframe is domestic but engine is foreign-sourced, or if only trainer or light aircraft qualify. Score 0 if fully foreign-dependent.
          </li>
          <li>
            <strong>Nuclear deterrent.</strong> Do you possess an operationally deployed nuclear deterrent under your sole command authority? Score 1 if yes. Score 0 if no, regardless of civilian nuclear capability or hosted weapons.
          </li>
          <li>
            <strong>Arms export freedom.</strong> Can you sell weapons to any buyer without requiring third-party permission? Score 1 if yes — no ITAR-equivalent dependency in key systems. Score 0.5 if partial (some systems restricted by partner-nation approval requirements, others free). Score 0 if primary military exports require US or other-power licences.
          </li>
          <li>
            <strong>Software sovereignty.</strong> Are the operating systems, communications infrastructure, and command-and-control software in your military systems domestically developed or fully audited? Score 1 if yes. Score 0.5 if partially (some sovereign, some foreign-sourced). Score 0 if primarily foreign software in critical systems.
          </li>
          <li>
            <strong>Others seek your technology.</strong> Are foreign militaries or defence industries seeking to acquire, license, or copy your systems — at scale? Score 1 if yes (you are a meaningful technology exporter in defence). Score 0.5 if niche or emerging cases. Score 0 if not applicable.
          </li>
          <li>
            <strong>Consistent strategic doctrine.</strong> Does your state have a coherent, publicly articulated strategic doctrine that has been applied consistently across more than one government? Score 1 if yes. Score 0.5 if recently developed or partially coherent. Score 0 if strategic policy is reactive, outsourced, or incoherent across governments.
          </li>
          <li>
            <strong>Domestic procurement majority.</strong> Is the majority of your military equipment domestically designed and manufactured? Score 1 if yes (&gt;60% by value, including major platforms). Score 0.5 if significant domestic programmes alongside foreign purchases. Score 0 if primarily foreign-sourced.
          </li>
          <li>
            <strong>Survive without alliance.</strong> Could your state credibly defend its territory against a major adversary for more than 30 days without allied support? Score 1 if yes. Score 0 if no — alliance dependency is existential to the defence posture.
          </li>
          <li>
            <strong>Edge chip access.</strong> Do you produce, or have guaranteed sovereign access to, leading-edge semiconductors for defence applications? Score 1 if domestic production capability. Score 0.5 if allied production with no demonstrated denial risk. Score 0 if dependent on potentially hostile or structurally unreliable suppliers.
          </li>
          <li>
            <strong>Autonomous systems in operations.</strong> Have you fielded autonomous or semi-autonomous systems in actual combat operations, not exercises? Score 1 if yes with demonstrated operational effect. Score 0.5 if fielded but with limited operational record. Score 0 if not yet operationally deployed.
          </li>
        </ol>
      </Section>

      <Section title="About the author">
        <p>
          This tool is a companion to the essay series published at{' '}
          <a href="https://superdtf.substack.com" target="_blank" rel="noopener noreferrer">superdtf.substack.com</a>.
          The assessments were developed through research and analysis conducted in 2025–2026. Scores reflect conditions as assessed at time of publication and will be updated as the geopolitical landscape changes.
        </p>
      </Section>

      <Section title="Methodology notes">
        <ul>
          <li><strong>Binding constraint</strong> = the lower of the two scores (complexity and sovereignty).</li>
          <li><strong>Tier 1:</strong> BC ≥ 7. Full-spectrum power: capable of independent action across economic and military dimensions.</li>
          <li><strong>Tier 2:</strong> BC 5–6.5. Regional sovereign: meaningful independent capability in at least one domain.</li>
          <li><strong>Tier 3:</strong> BC 3–4.5. Partial sovereign: genuine but constrained agency; alliance or partner dependency significant.</li>
          <li><strong>Tier 4:</strong> BC &lt; 3. Dependent actor: sovereignty in one or both dimensions insufficient to sustain independent strategic action.</li>
          <li><strong>Gap</strong> = absolute difference between complexity and sovereignty scores. A large gap indicates structural imbalance — the higher-scoring dimension cannot compensate for the lower.</li>
          <li><strong>Partial credit (0.5)</strong> is awarded on sovereignty questions where a country partially meets the criterion.</li>
          <li><strong>Cohort labels:</strong> Original 14 = the first assessment cohort. NATO additions, Asia-Pacific, Contested, and Extended = subsequent cohorts added to the dataset.</li>
        </ul>
      </Section>

    </div>
  )
}
