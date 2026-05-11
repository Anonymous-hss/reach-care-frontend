// Mock data for Studio Modeling page

export const studioBudget = {
  total: '$10.0M',
  currentValue: 10.0,
  max: 20.0,
};

export const regionalAllocations = [
  {
    id: 'reg-1',
    label: 'Northeast IDU corridor',
    amount: '$4.0M',
    percent: 40,
  },
  {
    id: 'reg-2',
    label: 'EVTH high-burden (UP, Maha, AP, Bihar)',
    amount: '$3.0M',
    percent: 30,
  },
  {
    id: 'reg-3',
    label: 'Rising-epidemic (Arunachal, Tripura)',
    amount: '$1.8M',
    percent: 18,
  },
  {
    id: 'reg-4',
    label: 'Punjab + Karnataka mixed',
    amount: '$1.2M',
    percent: 12,
  },
];

export const workforceMix = {
  label: 'Community health workers / ASHA',
  percent: 70,
  description: 'Remaining 30% goes to ANM nurses + harm reduction specialists. WHO UHC 2025 data: health workforce density now in top-3 SCI drivers in SEAR.',
};

export const projectedOutcomes = [
  {
    id: 'out-1',
    label: 'PLHIV reached',
    value: '122,400',
    trend: 'neutral',
  },
  {
    id: 'out-2',
    label: 'Mothers (EVTH)',
    value: '5,540',
    trend: 'neutral',
  },
  {
    id: 'out-3',
    label: 'Cost per outcome',
    value: '$82',
    trend: 'neutral',
  },
];

export const studioObservation = {
  text: 'At current weights, your scenario matches Compass exactly. Move any slider to see how the outcomes shift against this baseline.',
};

export const studioSuggestedQuestions = [
  'Maximize EVTH outcomes',
  'All to Northeast — what breaks?',
  'Risk-balanced scenario',
];
