import {
  createEmptyFigDoc,
  encodeFigParts,
  assembleCanvasFig,
  createFigZip,
  makeSolidPaint,
} from 'openfig-core';
import { compress as zstdCompress } from '@mongodb-js/zstd';
import { writeFileSync } from 'fs';

const COLORS = [
  {
    group: '基础色',
    items: [
      { name: '页面底色 / 米灰', hex: '#F4E9E1', token: 'background-gray', usage: 'body 全局背景' },
      { name: '黑色', hex: '#000000', token: 'color-black', usage: '主文字' },
      { name: '白色', hex: '#FFFFFF', token: 'background-white', usage: '导航语言切换' },
    ],
  },
  {
    group: '暖色系',
    items: [
      { name: '品牌黄', hex: '#FFB200', token: 'background-yellow', usage: '位置区 / rent 标签' },
      { name: '浅黄', hex: '#FFDB08', token: 'background-yellow-light', usage: '黄色辅助' },
      { name: '品牌橙', hex: '#FF5C38', token: 'background-orange', usage: '步行距离列表' },
      { name: '浅橙', hex: '#FF8E0A', token: 'background-orange-light', usage: '橙色辅助' },
      { name: '亮橙', hex: '#FF6100', token: 'icon-orange', usage: '页脚图标' },
    ],
  },
  {
    group: '绿色系',
    items: [
      { name: '品牌绿', hex: '#00AA3C', token: 'background-green', usage: 'WhatsApp 图标' },
      { name: '亮绿 CTA', hex: '#1BE349', token: 'background-green-light', usage: 'Book your Unit' },
      { name: '青绿动画', hex: '#267E6E', token: 'animation-teal', usage: '页面切换动画层 3' },
    ],
  },
  {
    group: '紫色系',
    items: [
      { name: '浅紫', hex: '#C79DFC', token: 'background-purple', usage: '360 view 按钮' },
      { name: '中紫', hex: '#AB54F7', token: 'background-purple-dark', usage: '顶部预订按钮' },
      { name: '深紫', hex: '#6C2FAD', token: 'background-purple-darker', usage: '图标线条' },
    ],
  },
  {
    group: '红 / 蓝',
    items: [
      { name: '品牌红', hex: '#EA3737', token: 'background-red', usage: '红色强调' },
      { name: '动画红', hex: '#E6313A', token: 'animation-red', usage: '页面切换动画层 2' },
      { name: '蓝色', hex: '#0072E3', token: 'background-blue', usage: '蓝色辅助' },
      { name: '深蓝', hex: '#004E9B', token: 'background-blue-dark', usage: 'Community 区块' },
    ],
  },
  {
    group: '页面切换动画三色',
    items: [
      { name: '动画黄', hex: '#FFB200', token: 'overlay-1', usage: '动画层 1' },
      { name: '动画红', hex: '#E6313A', token: 'overlay-2', usage: '动画层 2' },
      { name: '动画青绿', hex: '#267E6E', token: 'overlay-3', usage: '动画层 3' },
    ],
  },
];

const DARK_TEXT_ON = new Set(['#004E9B', '#6C2FAD', '#267E6E', '#00AA3C', '#0072E3']);
const LIGHT_BORDER = new Set(['#FFFFFF', '#F4E9E1']);

function labelColor(hex) {
  const h = hex.toUpperCase();
  if (h === '#000000') return '#FFFFFF';
  if (DARK_TEXT_ON.has(h)) return '#FFFFFF';
  return '#000000';
}

function textNode(base) {
  return {
    strokeWeight: 0,
    strokeAlign: 'OUTSIDE',
    textAutoResize: 'HEIGHT',
    textAlignVertical: 'TOP',
    styleIdForText: { guid: { sessionID: 4294967295, localID: 4294967295 } },
    lineHeight: { value: 1.2, units: 'RAW' },
    letterSpacing: { value: 0, units: 'PERCENT' },
    ...base,
    fontName: {
      family: base.fontName?.family ?? 'Inter',
      style: base.fontName?.style ?? 'Regular',
      postscript: '',
    },
  };
}

const doc = createEmptyFigDoc();
const pageGuid = { sessionID: 0, localID: 1 };
let nextId = 100;
const posChars =
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
let posIdx = 0;

function nextPos() {
  if (posIdx >= posChars.length) throw new Error('Ran out of position chars');
  return posChars[posIdx++];
}

function addNode(node) {
  doc.message.nodeChanges.push(node);
  doc.nodes.push(node);
  const id = `${node.guid.sessionID}:${node.guid.localID}`;
  doc.nodeMap.set(id, node);
  const pid = `${node.parentIndex.guid.sessionID}:${node.parentIndex.guid.localID}`;
  if (!doc.childrenMap.has(pid)) doc.childrenMap.set(pid, []);
  doc.childrenMap.get(pid).push(node);
}

const rootGuid = { sessionID: 1, localID: nextId++ };
addNode({
  guid: rootGuid,
  type: 'FRAME',
  phase: 'CREATED',
  name: 'Units Parkside — Color System',
  parentIndex: { guid: pageGuid, position: nextPos() },
  visible: true,
  opacity: 1,
  size: { x: 1440, y: 3600 },
  transform: { m00: 1, m01: 0, m02: 80, m10: 0, m11: 1, m12: 80 },
  fillPaints: [makeSolidPaint('#FFFFFF')],
  frameMaskDisabled: true,
});

addNode(textNode({
  guid: { sessionID: 1, localID: nextId++ },
  type: 'TEXT',
  phase: 'CREATED',
  name: 'Title',
  parentIndex: { guid: rootGuid, position: '!' },
  visible: true,
  opacity: 1,
  size: { x: 900, y: 48 },
  transform: { m00: 1, m01: 0, m02: 40, m10: 0, m11: 1, m12: 24 },
  fillPaints: [makeSolidPaint('#000000')],
  textData: { characters: 'Units Parkside Color Palette' },
  fontSize: 36,
  fontName: { family: 'Inter', style: 'Bold' },
  textAlignHorizontal: 'LEFT',
}));

addNode(textNode({
  guid: { sessionID: 1, localID: nextId++ },
  type: 'TEXT',
  phase: 'CREATED',
  name: 'Subtitle',
  parentIndex: { guid: rootGuid, position: nextPos() },
  visible: true,
  opacity: 1,
  size: { x: 900, y: 28 },
  transform: { m00: 1, m01: 0, m02: 40, m10: 0, m11: 1, m12: 72 },
  fillPaints: [makeSolidPaint('#6C2FAD')],
  textData: { characters: 'Extracted from units.gr/en/unit/units-parkside/' },
  fontSize: 14,
  fontName: { family: 'Inter', style: 'Regular' },
  textAlignHorizontal: 'LEFT',
}));

let y = 120;
for (const group of COLORS) {
  addNode(textNode({
    guid: { sessionID: 1, localID: nextId++ },
    type: 'TEXT',
    phase: 'CREATED',
    name: group.group,
    parentIndex: { guid: rootGuid, position: nextPos() },
    visible: true,
    opacity: 1,
    size: { x: 500, y: 36 },
    transform: { m00: 1, m01: 0, m02: 40, m10: 0, m11: 1, m12: y },
    fillPaints: [makeSolidPaint('#000000')],
    textData: { characters: group.group },
    fontSize: 24,
    fontName: { family: 'Inter', style: 'Bold' },
    textAlignHorizontal: 'LEFT',
  }));
  y += 48;

  for (let i = 0; i < group.items.length; i++) {
    const item = group.items[i];
    const col = i % 4;
    const rowNum = Math.floor(i / 4);
    const cx = 40 + col * 340;
    const cy = y + rowNum * 190;
    const text = labelColor(item.hex);
    const border = LIGHT_BORDER.has(item.hex.toUpperCase());

    addNode({
      guid: { sessionID: 1, localID: nextId++ },
      type: 'ROUNDED_RECTANGLE',
      phase: 'CREATED',
      name: item.hex,
      parentIndex: { guid: rootGuid, position: nextPos() },
      visible: true,
      opacity: 1,
      size: { x: 300, y: 110 },
      transform: { m00: 1, m01: 0, m02: cx, m10: 0, m11: 1, m12: cy },
      cornerRadius: 12,
      rectangleTopLeftCornerRadius: 12,
      rectangleTopRightCornerRadius: 12,
      rectangleBottomLeftCornerRadius: 12,
      rectangleBottomRightCornerRadius: 12,
      fillPaints: [makeSolidPaint(item.hex)],
      strokeWeight: border ? 1 : 0,
      strokeAlign: 'INSIDE',
      strokePaints: border ? [makeSolidPaint('#E0E0E0')] : undefined,
    });

    addNode(textNode({
      guid: { sessionID: 1, localID: nextId++ },
      type: 'TEXT',
      phase: 'CREATED',
      name: item.name,
      parentIndex: { guid: rootGuid, position: nextPos() },
      visible: true,
      opacity: 1,
      size: { x: 276, y: 22 },
      transform: { m00: 1, m01: 0, m02: cx + 12, m10: 0, m11: 1, m12: cy + 14 },
      fillPaints: [makeSolidPaint(text)],
      textData: { characters: item.name },
      fontSize: 15,
      fontName: { family: 'Inter', style: 'Semi Bold' },
      textAlignHorizontal: 'LEFT',
    }));

    addNode(textNode({
      guid: { sessionID: 1, localID: nextId++ },
      type: 'TEXT',
      phase: 'CREATED',
      name: `${item.hex} meta`,
      parentIndex: { guid: rootGuid, position: nextPos() },
      visible: true,
      opacity: 1,
      size: { x: 276, y: 56 },
      transform: { m00: 1, m01: 0, m02: cx + 12, m10: 0, m11: 1, m12: cy + 38 },
      fillPaints: [makeSolidPaint(text)],
      textData: {
        characters: `${item.hex}  ·  .${item.token}\n${item.usage}`,
      },
      fontSize: 12,
      fontName: { family: 'Inter', style: 'Regular' },
      textAlignHorizontal: 'LEFT',
    }));
  }

  const rows = Math.ceil(group.items.length / 4);
  y += rows * 190 + 48;
}

doc.meta = {
  file_name: 'Units Parkside Colors',
  version: 0,
};

const parts = encodeFigParts(doc);
const messageCompressed = new Uint8Array(await zstdCompress(Buffer.from(parts.messageRaw), 3));
const canvasFig = assembleCanvasFig({
  prelude: parts.prelude,
  version: parts.version,
  schemaCompressed: parts.schemaCompressed,
  messageCompressed,
  passThrough: parts.passThrough,
});
const figZip = createFigZip({ canvasFig, meta: doc.meta, thumbnail: doc.thumbnail });

writeFileSync('Units-Parkside-Colors.fig', figZip);
writeFileSync('units-parkside-tokens.json', JSON.stringify(buildTokens(), null, 2));
writeFileSync('units-parkside-colors.css', buildCss());
console.log(`Generated Units-Parkside-Colors.fig (${figZip.length} bytes, ${doc.message.nodeChanges.length} nodes)`);

function buildTokens() {
  const global = {};
  for (const group of COLORS) {
    const key = group.group.replace(/\s+/g, '-').toLowerCase();
    global[key] = {};
    for (const item of group.items) {
      const tokenKey = item.token.replace(/\./g, '');
      const r = parseInt(item.hex.slice(1, 3), 16);
      const g = parseInt(item.hex.slice(3, 5), 16);
      const b = parseInt(item.hex.slice(5, 7), 16);
      global[key][tokenKey] = {
        value: item.hex,
        type: 'color',
        $description: `${item.name} — ${item.usage}`,
        rgb: `rgb(${r}, ${g}, ${b})`,
      };
    }
  }
  return {
    $metadata: {
      tokenSetOrder: Object.keys(global),
      source: 'https://units.gr/en/unit/units-parkside/',
      extractedAt: '2026-07-02',
    },
    global,
  };
}

function buildCss() {
  const lines = [
    '/* Units Parkside — extracted color tokens */',
    ':root {',
  ];
  const seen = new Set();
  for (const group of COLORS) {
    for (const item of group.items) {
      const varName = '--units-' + item.token.replace(/^background-|^color-/, '').replace(/-/g, '-');
      if (seen.has(varName)) continue;
      seen.add(varName);
      lines.push(`  ${varName}: ${item.hex};`);
    }
  }
  lines.push('}');
  return lines.join('\n') + '\n';
}
