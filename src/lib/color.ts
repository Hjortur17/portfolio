/* Plate colours.
 *
 * The hero-plate system (design_handoff/hero-plates.md) pulls one colour from
 * the client's product and derives everything else from it: the field is that
 * colour darkened ~60%, the third block is it lightened ~15%. Deriving here
 * means a project names one colour instead of three, and the two tones can
 * never drift out of the same hue.
 *
 * Both are overridable in frontmatter — a derived tone occasionally fights a
 * real brand, and the handoff ships exact triples for its four sanctioned hues.
 */

type RGB = [number, number, number];
type HSL = [number, number, number];

/** Field lightness. Matched against the handoff's four authored triples —
 *  #C0392B lands on #491610 here against an authored #4A1610. */
const FIELD_LIGHTNESS = 0.175;

/** Block lift, in lightness points. The authored pairs span +10 to +14. */
const BLOCK_LIFT = 0.13;

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: RGB): string {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl([r, g, b]: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return [0, 0, l];

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;

  return [(h * 60 + 360) % 360, s, l];
}

function hslToRgb([h, s, l]: HSL): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] =
    hp < 1
      ? [c, x, 0]
      : hp < 2
        ? [x, c, 0]
        : hp < 3
          ? [0, c, x]
          : hp < 4
            ? [0, x, c]
            : hp < 5
              ? [x, 0, c]
              : [c, 0, x];

  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/** The cover plate's field — the brand colour taken down to a near-black tone
 *  that a #141A2E window still separates from. */
export function deriveField(brand: string): string {
  const [h, s] = rgbToHsl(hexToRgb(brand));
  return rgbToHex(hslToRgb([h, s, FIELD_LIGHTNESS]));
}

/** The lighter of the two bleeding blocks. */
export function deriveBlock(brand: string): string {
  const [h, s, l] = rgbToHsl(hexToRgb(brand));
  return rgbToHex(hslToRgb([h, s, Math.min(1, l + BLOCK_LIFT)]));
}
