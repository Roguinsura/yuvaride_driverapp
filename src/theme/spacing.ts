/**
 * 8-point spacing scale.
 *
 * Fixed pixels, deliberately. The existing windowHeight()/windowWidth() helpers
 * in appConstant scale with screen size, which makes gaps grow on tablets and
 * makes two "equal" gaps unequal when one was authored against width and the
 * other against height. Layout rhythm should be constant; only type and touch
 * targets need to respond to screen size.
 *
 * Use these for margin, padding and gap. Reach outside the scale only for
 * genuine pixel alignment (hairline borders, optical centring), not because a
 * value "looks about right" — that is how 7/13/17/23 creep in.
 */
const spacing = {
  /** 4 — hugging pairs, e.g. icon to its own label in bottom navigation. */
  xxs: 4,
  /** 8 — icon to text, chip padding. The default small gap. */
  xs: 8,
  /** 12 — inside compact controls. */
  sm: 12,
  /** 16 — card padding, screen gutters. The default. */
  md: 16,
  /** 20 — between related blocks. */
  lg: 20,
  /** 24 — between sections. */
  xl: 24,
  /** 32 — major section breaks. */
  xxl: 32,
  /** 40 */
  xxxl: 40,
  /** 48 — hero spacing. */
  huge: 48,
} as const

/**
 * Icon sizes, kept here so icon and spacing decisions stay together — an icon's
 * size and the gap beside it are one visual decision.
 */
export const iconSizes = {
  /** 18-20 — inline beside body text. */
  inline: 20,
  /** 22-24 — bottom navigation. */
  navigation: 24,
  /** 24 — toolbar and action icons. */
  action: 24,
  /** 28-32 — feature icons. */
  feature: 30,
  /** 28-36 — emergency / SOS. */
  emergency: 32,
} as const

/** Gap between an icon and its adjacent text. 8 normally, 12 in large controls. */
export const iconTextGap = {
  default: 8,
  large: 12,
} as const

export default spacing
