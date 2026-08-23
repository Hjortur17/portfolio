/* retro-fx — the two page-wide effects.
 *
 * 1. [data-pixel="N"] wrappers: draw a pixelated, colour-crushed copy of the
 *    image over it. Hover (or tap, on coarse pointers) fades to full res.
 * 2. [data-reveal] elements: step-fade + rise as they enter the viewport.
 *
 * Ported from the handoff's retro-fx.js with four deliberate changes:
 *   - reads a real <img>, not the design tool's shadow-DOM <image-slot>
 *   - no 700ms setInterval poll (that existed only for the drop-slot)
 *   - tap-to-toggle on coarse pointers, which the handoff lists as must-fix
 *   - canvases initialise lazily, so offscreen images cost nothing on load
 */

const LEVELS = 6; // colour steps per channel — the "8-bit palette" crush

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarsePointer = window.matchMedia('(hover: none)');

function setupPixel(wrap: HTMLElement) {
  if (wrap.dataset.pixelReady) return;
  const img = wrap.querySelector('img');
  if (!img) return;
  wrap.dataset.pixelReady = 'true';

  const block = Number(wrap.dataset.pixel) || 8;
  const touch = coarsePointer.matches;

  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '3',
    opacity: '0',
    imageRendering: 'pixelated',
    transition: reduceMotion.matches ? 'none' : 'opacity .22s steps(4, end)',
  } as Partial<CSSStyleDeclaration>);
  wrap.appendChild(cv);

  const tag = document.createElement('span');
  tag.textContent = touch ? 'TAP FOR FULL RES' : '8-BIT — HOVER FOR FULL RES';
  Object.assign(tag.style, {
    position: 'absolute',
    left: '10px',
    bottom: '10px',
    zIndex: '4',
    font: "8px 'Press Start 2P', monospace",
    letterSpacing: '1px',
    color: '#080A14',
    background: 'var(--accent, #4CC9F0)',
    padding: '6px 8px',
    pointerEvents: 'none',
    opacity: '0',
    transition: reduceMotion.matches ? 'none' : 'opacity .18s steps(3, end)',
  } as Partial<CSSStyleDeclaration>);
  wrap.appendChild(tag);

  let revealed = false;
  let lastKey = '';

  function paint() {
    cv.style.opacity = revealed ? '0' : '1';
    tag.style.opacity = revealed ? '0' : '1';
  }

  function draw(force: boolean) {
    const rect = wrap.getBoundingClientRect();
    if (!img || !img.naturalWidth || !rect.width) {
      cv.style.opacity = '0';
      tag.style.opacity = '0';
      lastKey = '';
      return;
    }

    const key = `${img.currentSrc || img.src}|${Math.round(rect.width)}x${Math.round(rect.height)}`;
    if (!force && key === lastKey) {
      paint();
      return;
    }
    lastKey = key;

    const cw = Math.max(6, Math.round(rect.width / block));
    const ch = Math.max(6, Math.round(rect.height / block));
    cv.width = cw;
    cv.height = ch;

    const ctx = cv.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    // cover-crop
    const sc = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * sc;
    const dh = img.naturalHeight * sc;
    ctx.clearRect(0, 0, cw, ch);
    try {
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    } catch {
      return;
    }

    // The palette crush — this is what reads as 8-bit rather than merely blurry.
    try {
      const d = ctx.getImageData(0, 0, cw, ch);
      const a = d.data;
      const step = 255 / (LEVELS - 1);
      for (let i = 0; i < a.length; i += 4) {
        a[i] = Math.round(Math.round(a[i] / step) * step);
        a[i + 1] = Math.round(Math.round(a[i + 1] / step) * step);
        a[i + 2] = Math.round(Math.round(a[i + 2] / step) * step);
      }
      ctx.putImageData(d, 0, 0);
    } catch {
      /* cross-origin image — ship the pixelation without the crush */
    }

    paint();
  }

  if (touch) {
    // No hover on touch: tap toggles, and the wrapper announces itself.
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('tabindex', '0');
    /* No aria-label. The chip already reads "TAP FOR FULL RES"; an aria-label
       of "Toggle full resolution image" replaced that with a name the user
       cannot see, which fails WCAG 2.5.3 Label in Name — a speech-input user
       saying what is on screen would not hit this control. aria-pressed
       carries the state instead. */
    wrap.setAttribute('aria-pressed', 'false');
    const toggle = () => {
      revealed = !revealed;
      wrap.setAttribute('aria-pressed', revealed ? 'true' : 'false');
      paint();
    };
    wrap.addEventListener('click', toggle);
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  } else {
    wrap.addEventListener('pointerenter', () => {
      revealed = true;
      paint();
    });
    wrap.addEventListener('pointerleave', () => {
      revealed = false;
      paint();
    });
  }

  if (window.ResizeObserver) {
    new ResizeObserver(() => draw(true)).observe(wrap);
  }

  if (img.complete && img.naturalWidth) {
    draw(true);
  } else {
    img.addEventListener('load', () => draw(true), { once: true });
  }
}

/* Only build canvases for images that come near the viewport. */
const pixelIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      setupPixel(e.target as HTMLElement);
      pixelIO.unobserve(e.target);
    }
  },
  { rootMargin: '200px' }
);

/* Scroll reveal. The hidden state is in CSS behind html.js; this only adds the
   class that releases it, and never repeats. */
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      // `boundingClientRect.top < 0` catches elements the viewport has already
      // moved past — landing on /#work, reloading mid-page, or a restored
      // scroll position all skip elements that would otherwise never intersect
      // and would stay invisible forever.
      if (!e.isIntersecting && e.boundingClientRect.top >= 0) continue;
      e.target.classList.add('is-revealed');
      revealIO.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
);

function scan() {
  document.querySelectorAll<HTMLElement>('[data-pixel]').forEach((el) => {
    if (el.dataset.pixelReady) return;
    // Above-the-fold images are set up straight away — they are visible on
    // load, so there is nothing to defer, and it keeps the hero's pixelation
    // off the observer's critical path.
    if (el.dataset.pixelPriority !== undefined) {
      setupPixel(el);
      return;
    }
    pixelIO.observe(el);
  });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.dataset.revealReady) return;
    el.dataset.revealReady = 'true';
    revealIO.observe(el);
  });
}

scan();
