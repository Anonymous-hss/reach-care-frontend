// Mock data for Compass Strategic Investment page

export const compassQuestion = "Where should we invest our $10M HIV / maternal health budget across India in 2026?";

export const nationalStats = [
  {
    id: 'stat-1',
    label: 'PLHIV (India 2024)',
    value: '25.61L',
    subtext: 'UB 21.89-30.67L',
    color: '#EB1700'
  },
  {
    id: 'stat-2',
    label: 'High-priority districts',
    value: '193',
    subtext: 'of 762 nationwide',
    color: '#EB1700'
  },
  {
    id: 'stat-3',
    label: 'EVTH need (mothers)',
    value: '18,473',
    subtext: 'UB 15,269-22,842',
    color: '#EB1700'
  },
  {
    id: 'stat-4',
    label: 'Cost per outcome',
    value: '$82',
    subtext: 'Modeled',
    color: '#EB1700'
  },
];

export const recommendedAllocations = [
  {
    id: 1,
    title: 'Northeast IDU corridor — Mizoram, Nagaland, Manipur',
    tag: 'Highest prevalence',
    allocation: '$4.0M',
    impactScore: '96 / 100',
    statLabel: 'Adult prevalence',
    statValue: '1.0%–1.5% (NACO)',
    workforceLabel: 'Best workforce',
    workforceValue: 'CHWs + harm reduction',
    evidenceLabel: 'Evidence',
    evidenceValue: '8 sources',
    progress: 100,
  },
  {
    id: 2,
    title: 'EVTH push — UP, Maharashtra, Andhra Pradesh, Bihar',
    tag: 'Highest absolute need',
    allocation: '$3.0M',
    impactScore: '85 / 100',
    statLabel: 'Mothers in need',
    statValue: '7,263 (39%)',
    workforceLabel: 'Best workforce',
    workforceValue: 'ASHA + ANM nurses',
    evidenceLabel: 'Evidence',
    evidenceValue: '6 sources',
    progress: 75,
  },
  {
    id: 3,
    title: 'Rising-epidemic intervention — Arunachal Pradesh, Tripura',
    tag: '400%+ rise',
    allocation: '$1.8M',
    impactScore: '79 / 100',
    statLabel: 'Trend',
    statValue: '↑ ↑ ↑ contrary to national',
    workforceLabel: 'Best workforce',
    workforceValue: 'CHWs + outreach testing',
    evidenceLabel: 'Evidence',
    evidenceValue: '5 sources',
    progress: 45,
  },
  {
    id: 4,
    title: 'Punjab + Karnataka concentration — emerging risk + scaling proof',
    tag: 'Mixed signal',
    allocation: '$1.2M',
    impactScore: '68 / 100',
    statLabel: 'Punjab',
    statValue: '↑ rising prev. + mortality',
    workforceLabel: 'Karnataka',
    workforceValue: 'Near 5% EVTH target',
    evidenceLabel: 'Evidence',
    evidenceValue: '7 sources',
    progress: 30,
  },
];

export const allocationExplanation = "Why this allocation — 40% to the Northeast IDU corridor where prevalence exceeds 1% (NACO confirmed) is justified by impact-per-dollar. 30% to EVTH high-burden states uses NACO's identified five-state concentration that holds 52% of need. The 12% to Arunachal/Tripura is corrective: these are the only states where the epidemic is moving the wrong direction. WHO UHC 2025 data shows CHW density correlates strongly with SCI gains in SEAR — supporting the workforce mix.";

export const compassChatData = {
  welcome: "Hi Priya — I've built this allocation from the NACO 2025 Technical Report and the WHO/World Bank UHC 2025 monitoring data. Ask me to defend any number, swap regions, or model alternatives.",
  suggestedQuestions: [
    'Why 40% to the Northeast and not more to EVTH?',
    'What if I cut Punjab/Karnataka and add to Arunachal?',
    'Show me the cost-per-outcome math',
  ]
};
