import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const header = await readFile(new URL('../app/layout/SiteHeader.tsx', import.meta.url), 'utf8');
const sidebar = await readFile(new URL('../app/components/shop/ShopSidebar.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('mobile navigation has an accessible disclosure control', () => {
  assert.match(header, /"use client"/);
  assert.match(header, /className="mobile-menu-toggle"/);
  assert.match(header, /aria-expanded=\{isMenuOpen\}/);
  assert.match(header, /aria-controls="main-navigation"/);
  assert.match(header, /className=\{isMenuOpen \? "is-open" : undefined\}/);
  assert.match(styles, /\.site-header nav\.is-open \{ display: grid/);
});

test('shop categories collapse into a mobile browse control', () => {
  assert.match(sidebar, /className="shop-sidebar-toggle"/);
  assert.match(sidebar, /aria-controls="shop-category-list"/);
  assert.match(sidebar, /className=\{isOpen \? "shop-sidebar-list is-open" : "shop-sidebar-list"\}/);
  assert.match(styles, /\.shop-sidebar-list \{ display: none/);
  assert.match(styles, /\.shop-sidebar-list\.is-open \{ display: grid/);
});

test('narrow screens protect drawers, dialogs, and product details from horizontal overflow', () => {
  assert.match(styles, /width: min\(400px, calc\(100vw - 24px\)\)/);
  assert.match(styles, /\.upload-modal-backdrop \{ padding: 12px/);
  assert.match(styles, /\.product-details dl > div \{ align-items: flex-start; flex-direction: column/);
  assert.match(styles, /\.upload-modal-actions, \.frame-preview-actions \{ grid-template-columns: 1fr/);
});
