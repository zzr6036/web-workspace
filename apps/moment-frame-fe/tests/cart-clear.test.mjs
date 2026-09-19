import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const cartPage = await readFile(new URL('../app/components/cart/CartPage.tsx', import.meta.url), 'utf8');
const cartButton = await readFile(new URL('../app/components/cart/CartButton.tsx', import.meta.url), 'utf8');
const globalStyles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('CartPage includes Clear all button with confirmation and clearCart dispatch', () => {
  assert.match(cartPage, /className="cart-clear-button"/);
  assert.match(cartPage, /clearCart\(\)/);
  assert.match(cartPage, /window\.confirm/);
  assert.match(cartPage, /items\.length > 0/);
});

test('CartButton drawer includes Clear all button in drawer heading actions', () => {
  assert.match(cartButton, /className="cart-drawer-heading-actions"/);
  assert.match(cartButton, /className="cart-drawer-clear-button"/);
  assert.match(cartButton, /clearCart\(\)/);
  assert.match(cartButton, /window\.confirm/);
});

test('globals.css includes styles for cart clear actions and page title row', () => {
  assert.match(globalStyles, /\.cart-clear-button \{/);
  assert.match(globalStyles, /\.cart-drawer-clear-button \{/);
  assert.match(globalStyles, /\.cart-page-title-row \{/);
  assert.match(globalStyles, /\.cart-drawer-heading-actions \{/);
});
