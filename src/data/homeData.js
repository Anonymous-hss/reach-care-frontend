// Mock data for Home page — will be replaced with API calls later

export const userProfile = {
  name: 'Priya',
  fullName: 'Priya Rao',
  role: 'Strategy lead',
  initials: 'PR',
};

export const greetingStats = [
  {
    id: 'active-signals',
    label: 'Active signals',
    value: '12',
  },
  {
    id: 'budget-review',
    label: 'Budget under review',
    value: '$8.0M',
  },
  {
    id: 'lives-projected',
    label: 'Lives projected',
    value: '142k',
  },
  {
    id: 'sources-monitored',
    label: 'Sources monitored',
    value: '187',
  },
];

export const pulseSignals = [
  {
    id: 1,
    text: 'Maternal mortality in Turkana up 18%',
    time: '2h',
    severity: 'critical',
  },
  {
    id: 2,
    text: 'ICMR CHW trial doubles control rates',
    time: '5h',
    severity: 'critical',
  },
  {
    id: 3,
    text: 'Brazil opens R$1.2B co-funding window',
    time: '1d',
    severity: 'emerging',
  },
];

export const compassRecommendation = {
  region: 'Northern Kenya',
  allocation: '$3.2M',
  score: 92,
  lives: '18,400 lives / $1M',
  sources: '7 sources',
  progressPercent: 92,
};

export const studioScenarios = [
  {
    id: 1,
    name: 'Scenario A — CHW-heavy India',
    change: '+11%',
    trend: 'up',
  },
  {
    id: 2,
    name: 'Scenario B — Brazil co-fund match',
    change: '+24%',
    trend: 'up',
  },
  {
    id: 3,
    name: 'Scenario C — Defensive risk hedge',
    change: '-3%',
    trend: 'down',
  },
];

export const askConversations = [
  {
    id: 1,
    text: 'Workforce strategy maternal health',
    time: '1h',
  },
  {
    id: 2,
    text: 'CVD intervention cost effectiveness',
    time: '2d',
  },
  {
    id: 3,
    text: 'Kenya drought displacement impact',
    time: '3d',
  },
];

export const agentActivity = [
  {
    id: 'ingestion',
    label: 'Ingestion',
    value: '2,341 docs',
    icon: 'download',
    color: '#185FA5',
  },
  {
    id: 'validation',
    label: 'Validation',
    value: '97.2% pass',
    icon: 'check-circle',
    color: '#2B8A1A',
  },
  {
    id: 'reasoning',
    label: 'Reasoning',
    value: '12 insights',
    icon: 'lightbulb',
    color: '#D97706',
  },
  {
    id: 'recommend',
    label: 'Recommend',
    value: '4 updates',
    icon: 'target',
    color: '#6B48A8',
  },
];

export const suggestedAction = {
  text: 'The Turkana signal combined with the Brazil co-funding window may justify rebalancing your Q2 allocation. Run a scenario in Studio?',
};

export const boardMeeting = {
  text: 'Board meeting in 3 days',
  detail: '2 briefs in draft, 1 pending review.',
  link: 'Open briefs',
};

export const trendStats = [
  {
    cardId: 'active-signals',
    value: '4.5%',
    label: 'Since Yesterday',
    direction: 'up',
  },
  {
    cardId: 'budget-review',
    value: '4.5%',
    label: 'than last year',
    direction: 'up',
  },
];
