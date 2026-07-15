import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000/page-consult.html';
const width = parseInt(process.argv[3] || '1920', 10);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1080 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const data = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height };
  };
  const visual = q('.consult-hero__visual');
  const card = q('.consult-hero__card');
  const afterStyle = visual ? getComputedStyle(visual, '::after') : null;
  return {
    rem: parseFloat(getComputedStyle(document.documentElement).fontSize),
    visual: rect(visual),
    card: rect(card),
    after: afterStyle ? {
      content: afterStyle.content,
      top: afterStyle.top, right: afterStyle.right,
      width: afterStyle.width, height: afterStyle.height,
      background: afterStyle.backgroundColor,
    } : null,
  };
});

const rem = data.rem;
const toRem = (px) => (px / rem).toFixed(2);
console.log('rem(px):', rem.toFixed(3));
console.log('viewport width:', width);
console.log('CARD  rect:', JSON.stringify(data.card));
console.log('VISUAL rect:', JSON.stringify(data.visual));
console.log('AFTER computed:', JSON.stringify(data.after));
if (data.card) console.log('CARD height rem:', toRem(data.card.height));
if (data.card && data.after) {
  const afterTopPx = parseFloat(data.after.top);
  const afterHeightPx = parseFloat(data.after.height);
  const backingBottomFromCardTop = afterTopPx + afterHeightPx;
  console.log('backing top from visual(=card) top rem:', toRem(afterTopPx));
  console.log('backing height rem:', toRem(afterHeightPx));
  console.log('backing bottom from card top rem:', toRem(backingBottomFromCardTop));
  console.log('card bottom from card top rem:', toRem(data.card.height));
  console.log('=> OVERHANG below card rem:', toRem(backingBottomFromCardTop - data.card.height));
}
await browser.close();
