/**
 * Kiddy Learn - Professional Vector Asset & Icon Engine
 * Combines crisp Lucide UI vector icons with Twemoji SVG educational asset library.
 * Fully replaces raster drawings & text emojis with genuine CDN vector SVGs.
 */

const CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/';
const CDN_FALLBACK = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/';

// Utility to convert UTF-16 surrogate pairs into hyphenated hex codepoints for Twemoji
export function toCodePoint(str) {
  if (!str) return '';
  const r = [];
  let c = 0, p = 0, i = 0;
  while (i < str.length) {
    c = str.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
      p = 0;
    } else if (0xD800 <= c && c <= 0xDBFF) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.filter(x => x !== 'fe0f').join('-');
}

function svg(viewBox, content, defaultClass = 'kiddy-icon') {
  return `<svg class="${defaultClass}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

// Crisp modern vector UI icons (Lucide / Tabler inspired)
export const UI_ICONS = {
  'brand-logo': svg('0 0 24 24', `
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'star': svg('0 0 24 24', `
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#FBBF24" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'star-filled': svg('0 0 24 24', `
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#FBBF24" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'star-empty': svg('0 0 24 24', `
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'flame': svg('0 0 24 24', `
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" fill="#F97316" stroke="#EA580C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'trophy': svg('0 0 24 24', `
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 22h16" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 14.66V17c0 .55-.45.98-.96 1.2-1.11.48-1.79 1.14-2.04 1.8H17c-.25-.66-.93-1.32-2.04-1.8-.51-.22-.96-.65-.96-1.2v-2.34" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" fill="#FBBF24" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'medal': svg('0 0 24 24', `
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="15" r="5" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
  `),

  'analytics': svg('0 0 24 24', `
    <path d="M3 3v18h18" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 17V9" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 17V5" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 17v-3" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'certificate': svg('0 0 24 24', `
    <rect width="18" height="18" x="3" y="3" rx="2" fill="#FFFBEB" stroke="#D97706" stroke-width="2"/>
    <path d="m9 12 2 2 4-4" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 7h8M8 17h8" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
  `),

  'speaker': svg('0 0 24 24', `
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#3B82F6" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'speaker-muted': svg('0 0 24 24', `
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#94A3B8" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="22" x2="16" y1="9" y2="15" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" x2="22" y1="9" y2="15" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
  `),

  'hint': svg('0 0 24 24', `
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" stroke="#EAB308" stroke-width="2" stroke-linecap="round"/>
    <path d="M9 18h6M10 22h4" stroke="#EAB308" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2v2M2 12h2M20 12h2" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
  `),

  'close': svg('0 0 24 24', `
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'check': svg('0 0 24 24', `
    <path d="M20 6 9 17l-5-5" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'lock': svg('0 0 24 24', `
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'unlock': svg('0 0 24 24', `
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="#10B981" stroke="#059669" stroke-width="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'play': svg('0 0 24 24', `
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
  `),

  'replay': svg('0 0 24 24', `
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 3v5h5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'trash': svg('0 0 24 24', `
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'crown': svg('0 0 24 24', `
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" fill="#FBBF24" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'rocket': svg('0 0 24 24', `
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="#EF4444"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
    <circle cx="15.5" cy="8.5" r="1.5" fill="#FEF08A"/>
  `),

  // Course Categories
  'math-course': svg('0 0 24 24', `
    <rect width="18" height="18" x="3" y="3" rx="3" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke="#6366F1" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="8" x2="12" y2="16" stroke="#6366F1" stroke-width="2" stroke-linecap="round"/>
  `),

  'science-course': svg('0 0 24 24', `
    <path d="M10 2v7.31L4.17 18.5A2 2 0 0 0 5.86 21.5h12.28a2 2 0 0 0 1.69-3L14 9.31V2" fill="#ECFDF5" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="8.5" y1="2" x2="15.5" y2="2" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 9.3 8.5 18" stroke="#34D399" stroke-width="2"/>
  `),

  'aptitude-course': svg('0 0 24 24', `
    <path d="M12 2a8 8 0 0 0-8 8c0 3 2 5.5 4 7v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3c2-1.5 4-4 4-7a8 8 0 0 0-8-8z" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/>
    <path d="M9 18h6M10 22h4" stroke="#D97706" stroke-width="1.5" stroke-linecap="round"/>
  `),

  'demo-course': svg('0 0 24 24', `
    <rect width="20" height="13" x="2" y="5.5" rx="6" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/>
    <line x1="6" x2="10" y1="12" y2="12" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <line x1="8" x2="8" y1="10" y2="14" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <circle cx="15" cy="12.5" r="1.2" fill="#EC4899"/>
    <circle cx="18" cy="10.5" r="1.2" fill="#EC4899"/>
  `),

  // Engine Types
  'cards-grid': svg('0 0 24 24', `
    <rect width="7" height="7" x="3" y="3" rx="1.5" fill="#3B82F6"/>
    <rect width="7" height="7" x="14" y="3" rx="1.5" fill="#60A5FA"/>
    <rect width="7" height="7" x="3" y="14" rx="1.5" fill="#93C5FD"/>
    <rect width="7" height="7" x="14" y="14" rx="1.5" fill="#2563EB"/>
  `),

  'drag-drop-zones': svg('0 0 24 24', `
    <rect width="8" height="16" x="3" y="4" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/>
    <rect width="8" height="16" x="13" y="4" rx="2" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
  `),

  'matching-pairs': svg('0 0 24 24', `
    <circle cx="5" cy="6" r="3" fill="#EC4899"/>
    <circle cx="19" cy="6" r="3" fill="#EC4899"/>
    <circle cx="5" cy="18" r="3" fill="#3B82F6"/>
    <circle cx="19" cy="18" r="3" fill="#3B82F6"/>
    <path d="M8 6h8M8 18h8" stroke="#6366F1" stroke-width="2" stroke-linecap="round"/>
  `),

  'balance-scale': svg('0 0 24 24', `
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
    <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `),

  'rebus-keypad': svg('0 0 24 24', `
    <rect width="18" height="18" x="3" y="3" rx="3" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    <path d="M8 7h.01M12 7h.01M16 7h.01M8 12h.01M12 12h.01M16 12h.01M8 17h.01M12 17h.01M16 17h.01" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
  `),

  'spatial-3d': svg('0 0 24 24', `
    <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" fill="#6366F1" stroke="#4F46E5" stroke-width="1.5"/>
    <path d="m3.27 6.96 8.73 4.93 8.73-4.93M12 22V12" stroke="#FFFFFF" stroke-width="1.5"/>
  `),

  'sudoku-matrix': svg('0 0 24 24', `
    <rect width="18" height="18" x="3" y="3" rx="2" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="#334155" stroke-width="1.5"/>
  `),

  'outline-trace': svg('0 0 24 24', `
    <path d="M12 2 2 7l10 5 10-5-10-5z" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.5"/>
    <path d="m2 17 10 5 10-5M2 12l10 5 10-5" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>
  `),

  'memory-cards': svg('0 0 24 24', `
    <rect width="10" height="14" x="3" y="3" rx="2" fill="#8B5CF6"/>
    <rect width="10" height="14" x="11" y="7" rx="2" fill="#EC4899" stroke="#FFFFFF" stroke-width="1.5"/>
  `),

  'listen-and-choose': svg('0 0 24 24', `
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `)
};

// Named educational asset to Twemoji hex codepoints
const ASSET_HEX_MAP = {
  // Fruits & Vegetables
  'broccoli': '1f966',
  'cucumber': '1f952',
  'lettuce': '1f96c',
  'strawberry': '1f353',
  'apple': '1f34e',
  'apples': '1f34e',
  'banana': '1f34c',
  'orange': '1f34a',
  'carrot': '1f955',
  'watermelon': '1f349',
  'grape': '1f347',
  'tomato': '1f345',
  
  // Animals
  'puppy': '1f436',
  'dog': '1f436',
  'kitten': '1f431',
  'cat': '1f431',
  'bunny': '1f430',
  'rabbit': '1f430',
  'elephant': '1f418',
  'lion': '1f981',
  'giraffe': '1f992',
  'zebra': '1f993',
  'dolphin': '1f42c',
  'shark': '1f988',
  'tiger': '1f42f',
  'monkey': '1f412',
  'bear': '1f43b',
  'penguin': '1f427',
  'bird': '1f426',
  'parrot': '1f99c',
  'butterfly': '1f98b',
  'fish': '1f41f',
  'whale': '1f40b',
  'frog': '1f438',
  'fly': '1fab0',
  'panda': '1f43c',
  'bamboo': '1f38b',

  // Environments & Objects
  'ocean': '1f30a',
  'jungle': '1f334',
  'rocket': '1f680',
  'sun': '2600',
  'moon': '1f319',
  'star': '2b50',
  'stars': '2b50',
  'heart': '2764',
  'diamond': '1f48e',
  'triangle': '1f53a',
  'cube': '1f4e6',
  'car': '1f697',
  'bus': '1f68c',
  'train': '1f682',
  'airplane': '2708',
  'balloon': '1f388',
  'balloons': '1f388',
  'pizza': '1f355',
  'coin': '1fa99',

  // Shapes & Concepts
  'shape-star': '2b50',
  'shape-heart': '2764',
  'shape-triangle': '1f53a',
  'shape-diamond': '1f48e',
  'shape-moon': '1f319',
  'shape-butterfly': '1f98b'
};

function singleTwemojiImg(hex, altText = '', className = 'kiddy-icon') {
  const src = `${CDN_BASE}${hex}.svg`;
  const fallbackSrc = `${CDN_FALLBACK}${hex}.svg`;
  return `<img class="kiddy-vector-img ${className}" src="${src}" alt="${altText}" onerror="this.onerror=null;this.src='${fallbackSrc}';" loading="lazy" />`;
}

/**
 * Get an SVG icon string or high-resolution Twemoji SVG vector asset.
 * Supports:
 * - Direct UI icon keys (e.g. 'trophy', 'star', 'speaker', 'hint')
 * - Named assets (e.g. 'broccoli', 'puppy', 'strawberry')
 * - Single unicode emojis (e.g. '🍎', '🥦', '🐶')
 * - Repeated emojis (e.g. '🍎🍎🍎', '⭐⭐⭐⭐')
 * - Math and numeric expressions (e.g. '6 + 4', '1/2', '5 kg')
 */
export function getSvgIcon(keyOrEmoji, className = 'kiddy-icon') {
  if (keyOrEmoji === undefined || keyOrEmoji === null || keyOrEmoji === '') return '';

  const cleanKey = String(keyOrEmoji).trim();

  // 1. Check UI vector icons
  if (UI_ICONS[cleanKey]) {
    if (className !== 'kiddy-icon') {
      return UI_ICONS[cleanKey].replace('class="kiddy-icon"', `class="kiddy-icon ${className}"`);
    }
    return UI_ICONS[cleanKey];
  }

  // 2. Check named educational asset
  const lowerKey = cleanKey.toLowerCase();
  if (ASSET_HEX_MAP[lowerKey]) {
    return singleTwemojiImg(ASSET_HEX_MAP[lowerKey], cleanKey, className);
  }

  // 3. Handle math expressions or numbers (e.g. "6 + 4", "9 - 4", "11", "3 × 3")
  if (/^[-+×÷0-9/.\s=kg]+$/.test(cleanKey) && !/[\uD800-\uDFFF\u2600-\u27FF]/.test(cleanKey)) {
    return `<span class="kiddy-math-badge ${className}">${cleanKey}</span>`;
  }

  // 4. Check if string is composed of multiple unicode glyphs / emojis (e.g. "🍎🍎🍎", "⭐⭐⭐⭐")
  const glyphs = Array.from(cleanKey);
  const isAllEmojis = glyphs.every(ch => {
    const cp = ch.codePointAt(0) || 0;
    return (cp >= 0x1F000 && cp <= 0x1FAFF) || (cp >= 0x2600 && cp <= 0x27BF) || (cp >= 0xFE00 && cp <= 0xFE0F) || ch === ' ' || ch === '️⃣';
  });

  if (isAllEmojis && glyphs.length > 0) {
    const renderedList = [];
    let currentEmoji = '';

    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      if (g === ' ') {
        renderedList.push('<span class="kiddy-icon-spacer"></span>');
        continue;
      }
      // Handle keycap combining
      if (glyphs[i + 1] === '️⃣' || glyphs[i + 1] === '\ufe0f') {
        currentEmoji = g + glyphs[i + 1];
        if (glyphs[i + 2] === '️⃣') {
          currentEmoji += glyphs[i + 2];
          i += 2;
        } else {
          i += 1;
        }
      } else {
        currentEmoji = g;
      }

      const hex = toCodePoint(currentEmoji);
      if (hex) {
        renderedList.push(singleTwemojiImg(hex, currentEmoji, className));
      }
    }

    if (renderedList.length === 1) {
      return renderedList[0];
    } else if (renderedList.length > 1) {
      return `<span class="kiddy-icon-group">${renderedList.join('')}</span>`;
    }
  }

  // 5. Fallback single unicode emoji
  const singleHex = toCodePoint(cleanKey);
  if (singleHex && singleHex.length >= 2 && !singleHex.includes('20')) {
    return singleTwemojiImg(singleHex, cleanKey, className);
  }

  // 6. Generic Text Pill
  return `<span class="kiddy-icon-badge ${className}">${cleanKey}</span>`;
}
