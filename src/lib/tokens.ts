export const colors = {
  // Dark world backgrounds
  void: '#0a0a0a',       // hero background
  charcoal: '#141414',   // section backgrounds
  surface: '#1e1e1e',    // cards, elevated elements
  surfaceBorder: '#222222',

  // The only warmth
  orange: '#f05a28',     // letus orange — CTAs, glows, labels
  ember: '#8b2200',      // glow gradients only, never on text

  // Text
  white: '#ffffff',
  muted: '#777777',
  mutedDim: '#444444',    // decorative only — non-text (dividers, disabled). Fails AA for text.
  mutedDimmer: '#333333', // decorative only — non-text (structural). Fails AA for text.

  // Footer
  footer: '#0f0f0f',
} as const

export const fonts = {
  display: 'var(--font-unbounded)',
  body: 'var(--font-inter)',
} as const

export const easing = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  in: [0.7, 0, 1, 0.6] as [number, number, number, number],
} as const
