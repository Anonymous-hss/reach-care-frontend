// Mock data for Ask Chatbot page

export const chatConversation = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'Should we use community health workers or nurses for maternal care in our 2026 Kenya and India programs?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    text: `Short answer: the optimal mix differs significantly between the two markets, and the evidence supports a hybrid strategy rather than a single workforce model.

**India (Bihar & UP) — lean CHW-heavy.** The ICMR Bihar trial across 42,000 patients showed CHW-led screening and follow-up achieved a 2.1× improvement in hypertension control versus nurse-only models. ASHA networks already cover 87% of target districts and cost roughly 1/4 of nurse midwife deployment.

**Kenya (Turkana & Marsabit) — CHW-anchored but supplemented.** Kenya's MoH data shows CHW-delivered antenatal care reaches 73% of pastoralist communities where facility-based care reaches only 31%. However, the 18% maternal mortality spike Pulse flagged this morning suggests CHWs alone may be insufficient during drought displacement — a referral-tier nurse midwife presence becomes critical.

Based on these signals, the platform recommends roughly 75% CHW / 25% nurse in India, and 60% CHW / 40% nurse in Kenya. The Kenya tilt accounts for the active drought-displacement signal.`,
    citations: [
      { id: 'c1', label: 'Lancet GH 2024', color: '#888780' },
      { id: 'c2', label: 'NHM India 2025', color: '#888780' },
      { id: 'c3', label: 'Kenya MoH Q4', color: '#888780' },
      { id: 'c4', label: 'WHO AFRO', color: '#888780' },
    ],
    actions: [
      {
        id: 'act-1',
        type: 'compass',
        title: 'Open in Compass',
        subtitle: 'Get the full ranked allocation with budget figures',
      },
      {
        id: 'act-2',
        type: 'studio',
        title: 'Model in Studio',
        subtitle: 'Test alternative ratios and see projected outcomes',
      },
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    text: 'What happens to the India recommendation if the ICMR study has methodology concerns?',
  },
  {
    id: 'msg-4',
    role: 'assistant',
    text: `Fair pushback — and worth checking. The validation agent flagged the ICMR trial as high-quality (peer-reviewed, randomized, n=42,000, 14-month follow-up), but the effect size is large enough to warrant a sensitivity check.

If we downweight the ICMR finding by 50%, the CHW recommendation for India drops from 75% to roughly 58% — still CHW-leaning, because three other independent sources support directionally similar findings. The recommendation is robust to single-study uncertainty.`,
    pinnedNote: {
      text: 'CHW-heavy India recommendation holds even if ICMR evidence is downweighted 50%.',
      label: 'Pinned to thread',
    },
  },
];

export const suggestedQuestions = [
  'What training infrastructure do CHWs need in Turkana?',
  'How do Brazil agentes comunitários compare to ASHA workers on cost per outcome?',
  'What are the failure modes of CHW-only models?',
];
