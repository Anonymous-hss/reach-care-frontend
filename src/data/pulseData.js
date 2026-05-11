// Dummy Pulse data. Keep this shape aligned with the upcoming Pulse API response
// so the page can later swap this import for a fetch/hook with minimal changes.

export const pulseData = {
  header: {
    title: 'Pulse',
    subtitle: 'Live signals across your focus markets',
    agentStatus: '23 agents active',
  },
  filters: [
    { id: 'all', label: 'All signals' },
    { id: 'critical', label: 'Critical (4)', status: 'critical' },
    { id: 'maternal-health', label: 'Maternal health', topic: 'Maternal health' },
    { id: 'cardiovascular', label: 'Cardiovascular', topic: 'Cardiovascular' },
    { id: 'kenya', label: 'Kenya', region: 'Kenya' },
    { id: 'india', label: 'India', region: 'India' },
    { id: 'brazil', label: 'Brazil', region: 'Brazil' },
    { id: 'us', label: 'US', region: 'US' },
  ],
  metrics: [
    { id: 'new-signals', label: 'New signals today', value: '12' },
    { id: 'critical-alerts', label: 'Critical alerts', value: '4', tone: 'critical' },
    { id: 'sources-monitored', label: 'Sources monitored', value: '187' },
    { id: 'reports-ingested', label: 'Reports auto-ingested', value: '2,341' },
  ],
  feedTitle: "Today's signal feed",
  sortLabel: 'Sorted by strategic relevance',
  archiveSummary: '7 more signals from this week - Auto-archived after 30 days',
  archiveAction: 'View archive',
  signals: [
    {
      id: 'turkana-maternal-mortality',
      status: 'critical',
      topic: 'Maternal health',
      region: 'Kenya',
      timeAgo: '2 hours ago',
      relevance: 94,
      title: 'Maternal mortality in Turkana rose 18% in Q1, exceeding 3-year baseline',
      summary:
        'Kenya Ministry of Health quarterly bulletin published this morning shows the steepest regional increase since 2022. Drought displacement and clinic closures cited as primary drivers.',
      sources: ['Kenya MoH', 'WHO AFRO', 'UNICEF field report'],
      action: { id: 'take-action', label: 'Take action', path: '/pulse/signals/turkana-maternal-mortality/action' },
    },
    {
      id: 'icmr-chw-hypertension',
      status: 'emerging',
      topic: 'Cardiovascular',
      region: 'India',
      timeAgo: '5 hours ago',
      relevance: 87,
      title: 'ICMR study shows CHW-led hypertension screening doubles control rates in Bihar',
      summary:
        'Peer-reviewed real-world evidence from a 14-month trial of 42,000 patients suggests a 2.1x improvement vs nurse-only models. Directly relevant to your 2026 workforce strategy question.',
      sources: ['Lancet Global Health', 'ICMR'],
      action: { id: 'add-to-evidence', label: 'Add to evidence' },
    },
    {
      id: 'dhaka-dengue-count',
      status: 'critical',
      topic: 'Epidemiological',
      region: 'Bangladesh',
      timeAgo: '8 hours ago',
      relevance: 81,
      title: 'Dengue case count in Dhaka division crosses 2024 full-year total',
      summary:
        'DGHS daily surveillance dashboard updated. Outbreak trajectory now exceeds pre-monsoon projections by 34%. May divert local CHW capacity from maternal programs.',
      sources: ['DGHS Bangladesh', 'WHO SEARO'],
      action: { id: 'model-impact', label: 'Model impact', path: '/pulse/signals/dhaka-dengue-count/model-impact' },
    },
    {
      id: 'brazil-moh-cofunding',
      status: 'opportunity',
      topic: 'Funding',
      region: 'Brazil',
      timeAgo: '1 day ago',
      relevance: 76,
      title: 'Brazil MoH announces R$1.2B co-funding window for Northeast maternal programs',
      summary:
        'Federal matching scheme opens Q2. Aligns with your Maranhao signal - co-investment could effectively double your $1.6M Compass allocation in that region.',
      sources: ['Ministerio da Saude', 'Folha SP'],
      action: { id: 'rerun-compass', label: 'Re-run Compass', path: '/pulse/signals/brazil-moh-cofunding/rerun-compass' },
    },
    {
      id: 'cms-doula-medicaid',
      status: 'update',
      topic: 'Policy',
      region: 'US',
      timeAgo: '1 day ago',
      relevance: 62,
      title: 'CMS expands Medicaid coverage for doula services in 7 additional states',
      summary:
        'Federal rule change effective Q3. Shifts cost structure for community-based maternal care models in Mississippi, Alabama, and Georgia - three of your US focus states.',
      sources: [],
      action: null,
    },
  ],
};

export const pulseActionPages = {
  'turkana-maternal-mortality': {
    type: 'take-action',
    eyebrow: 'Detected 2 hours ago',
    meta: 'Relevance 94 / 100',
    summary:
      'Kenya MoH quarterly bulletin published this morning shows the steepest regional increase since 2022. Drought displacement and clinic closures cited as primary drivers.',
    stats: [
      { label: 'Current MMR', value: '594', detail: '/ 100k', note: '+18% vs baseline', tone: 'critical' },
      { label: 'Affected population', value: '926k', note: 'Turkana + Marsabit' },
      { label: 'Pregnancies at risk', value: '~31,200', note: 'Annual estimate' },
      { label: 'Clinics closed', value: '14', note: 'of 47 in region' },
    ],
    chart: {
      title: '3-year trend - Maternal mortality ratio',
      yAxis: ['600', '500', '400'],
      xAxis: ['2022', '2023', '2024', 'Q1 2026'],
      points: [470, 478, 486, 594],
      annotation: 'National avg 530',
      finalLabel: '594',
    },
    drivers: [
      { label: 'Drought displacement', value: 42, tone: 'critical' },
      { label: 'Clinic closures', value: 28, tone: 'warning' },
      { label: 'CHW shortage', value: 18, tone: 'blue' },
      { label: 'Other factors', value: 12, tone: 'muted' },
    ],
    recommendation: {
      title: 'Three options worth considering with your decision committee:',
      items: [
        'Mobile CHW deployment - Highest projected impact. WHO AFRO field data suggests mobile maternal care units in pastoralist regions reduce MMR by 31-43% within 12 months. Estimated cost $1.8M.',
        'Clinic reopening partnership - Medium impact, requires Kenya MoH coordination. Reopening 8 of 14 closed clinics estimated to reduce MMR by 22% over 18 months. Estimated cost $3.2M.',
        'Referral-tier midwife placement - Slower but more durable. Stationing 24 skilled birth attendants at district hubs estimated to reduce MMR by 19% within 24 months. Estimated cost $2.4M.',
      ],
      footer:
        'All three are non-exclusive. The platform recommends discussing a combined response with your committee, weighted toward option 1 given the urgency of drought conditions.',
    },
    evidence: [
      { title: 'Kenya MoH Quarterly Bulletin - Q1 2026', meta: 'Government - Primary source - Published this morning', quality: '0.96', tone: 'green' },
      { title: 'WHO AFRO - Horn of Africa Drought Health Impact', meta: 'Multilateral - Field report - 3 weeks ago', quality: '0.91', tone: 'green' },
      { title: 'UNICEF - Turkana Field Assessment', meta: 'NGO - Field report - 1 month ago', quality: '0.84', tone: 'amber' },
    ],
    relatedSignals: [
      { meta: 'Maternal health - Kenya - 4 days ago', title: 'Marsabit reports staff exodus from rural clinics' },
      { meta: 'Climate - Horn of Africa - 2 weeks ago', title: 'East Africa drought enters fifth consecutive season' },
    ],
    nextActions: [
      'Re-run Compass with this signal',
      'Model responses in Studio',
      'Investigate further in Ask',
      'Export committee brief',
    ],
  },
  'dhaka-dengue-count': {
    type: 'model-impact',
    eyebrow: 'External shock',
    title: 'How does the Dhaka dengue outbreak affect your portfolio?',
    subtitle:
      'DGHS surveillance shows case counts exceeding 2024 full-year total. Likely to divert CHW capacity from maternal programs in affected districts.',
    stats: [
      { label: 'Programs exposed', value: '3 of 14', note: 'Bangladesh portfolio' },
      { label: 'Investment at risk', value: '$0.6M', note: '75% of Bangladesh budget' },
      { label: 'Projected outcome loss', value: '-2,400', note: 'If no action taken', tone: 'critical' },
      { label: 'Time to impact', value: '6-10 wks', note: 'Peak season May-Aug' },
    ],
    exposure: [
      { risk: 'HIGH', title: 'Dhaka Division maternal CHW program', meta: '340 CHWs - 18,200 enrolled mothers', amount: '$320k at risk', outcome: '-1,400 outcomes projected' },
      { risk: 'MED', title: 'Sylhet rural antenatal expansion', meta: '180 CHWs - 9,400 enrolled mothers', amount: '$210k at risk', outcome: '-700 outcomes projected' },
      { risk: 'MED', title: 'Chittagong maternal nutrition initiative', meta: '90 CHWs - 4,800 enrolled mothers', amount: '$70k at risk', outcome: '-300 outcomes projected' },
    ],
    projection: {
      labels: ['Baseline 9,400', 'With mitigation 8,200', 'No action 6,500'],
      xAxis: ['Now', 'Jun', 'Aug', 'Oct', 'Dec'],
    },
    mitigations: [
      { badge: 'Recommended', title: 'Surge CHW capacity', body: 'Add 120 temporary CHWs for 4 months to backfill capacity diverted to dengue response.', cost: '$180k', preserved: '2,100 of 2,400', unitCost: '$86' },
      { title: 'Partner coordination', body: 'Coordinate with BRAC and icddr,b to share CHW load across dengue and maternal portfolios.', cost: '$40k', preserved: '1,400 of 2,400', unitCost: '$29' },
      { title: 'Rebalance to unaffected regions', body: 'Pause Dhaka expansion; redirect $200k to Sylhet and Kenya programs operating at capacity.', cost: '$0 net', preserved: '1,800 of 2,400', unitCost: 'Slower Bangladesh growth' },
    ],
    note:
      'Reasoning agent observation - Path 1 preserves the most outcomes but has the highest cost. Path 2 has the best cost efficiency but lower preservation. Path 3 is budget-neutral. Consider presenting all three to your committee.',
    nextActions: ['Export full model', 'Fine-tune in Studio', 'Outbreak context', 'Question in Ask'],
  },
  'brazil-moh-cofunding': {
    type: 'rerun-compass',
    title: 'Compass re-run with new signal',
    subtitle:
      'Comparing your current allocation against a re-computed allocation that factors in the Brazil R$1.2B co-funding window.',
    insight:
      'New signal incorporated - Brazil MoH federal matching scheme effectively doubles the impact of every dollar deployed in the Northeast region. The recommendation agent has rebalanced your allocation accordingly. Projected impact rises 18% with no increase in budget.',
    allocations: [
      {
        title: 'Previous allocation - 3 days ago',
        total: '142,400',
        rows: [
          { label: 'Northern Kenya', amount: '$3.2M', share: '40%', value: 40 },
          { label: 'Bihar & UP, India', amount: '$2.4M', share: '30%', value: 30 },
          { label: 'Northeast Brazil', amount: '$1.6M', share: '20%', value: 20 },
          { label: 'Rural Bangladesh', amount: '$0.8M', share: '10%', value: 10 },
        ],
      },
      {
        title: 'New allocation - with Brazil signal',
        total: '168,000',
        totalChange: '+18%',
        rows: [
          { label: 'Northern Kenya', amount: '$2.8M', share: '35%', delta: '-$0.4M', value: 35 },
          { label: 'Bihar & UP, India', amount: '$2.0M', share: '25%', delta: '-$0.4M', value: 25 },
          { label: 'Northeast Brazil up', amount: '$2.4M', share: '30%', delta: '+$0.8M', value: 30 },
          { label: 'Rural Bangladesh', amount: '$0.8M', share: '10%', delta: 'no change', value: 10 },
        ],
      },
    ],
    changes: [
      { title: 'Brazil tier raised from 20% to 30% allocation', body: 'Federal matching scheme effectively doubles cost-effectiveness in Maranhao and Piaui. Every dollar deployed in Q2 will be matched 1:1 by Brazil MoH, raising lives-per-$1M from 11,800 to 23,400.' },
      { title: 'Kenya and India tiers reduced proportionally', body: 'Both remain high-impact but the marginal dollar now produces more in Brazil. Kenya retains the highest impact score but its share drops because absolute lives-per-dollar in Brazil under the match scheme exceeds it for incremental funds.' },
    ],
    stats: [
      { label: 'Lives impact change', value: '+25,600', note: '142k -> 168k', tone: 'positive' },
      { label: 'Cost per life-year change', value: '-$8', note: '$56 -> $48', tone: 'positive' },
      { label: 'Risk profile', value: 'Stable', note: 'No material change' },
    ],
    nextActions: ['Export comparison PDF', 'Test variations in Studio', 'Review Brazil evidence', 'Question this in Ask'],
  },
};
