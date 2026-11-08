"use client";

import { useState } from "react";

export default function ShopActions() {
  const [quantity, setQuantity] = useState(1);
  const [bagOpen, setBagOpen] = useState(false);

  return (
    <>
      <div className="shop-actions">
        <div className="quantity" aria-label="Quantity selector">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
          <output aria-live="polite">{quantity}</output>
          <button type="button" onClick={() => setQuantity((value) => Math.min(12, value + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button className="add-button" type="button" onClick={() => setBagOpen(true)}>
          Add to bag <span>${quantity * 16}</span>
        </button>
      </div>

      {bagOpen && (
        <div className="cart-overlay" role="presentation" onMouseDown={() => setBagOpen(false)}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="cart-header">
              <div><span>Your bag</span><h2 id="cart-title">A little sunshine,<br />on its way.</h2></div>
              <button type="button" onClick={() => setBagOpen(false)} aria-label="Close cart">×</button>
            </div>
            <div className="cart-item">
              <div className="cart-thumb" aria-hidden="true">MH</div>
              <div><strong>Backyard Honey</strong><span>16 oz · Quantity {quantity}</span></div>
              <strong>${quantity * 16}.00</strong>
            </div>
            <div className="cart-totals">
              <p><span>Subtotal</span><strong>${quantity * 16}.00</strong></p>
              <p><span>Shipping</span><span>Calculated at checkout</span></p>
            </div>
            <a className="checkout-button" href="https://www.maihoney.com" target="_blank" rel="noreferrer">Continue to secure checkout <span aria-hidden="true">→</span></a>
            <p className="cart-footnote">Checkout opens our current secure shop in a new tab.</p>
          </aside>
        </div>
      )}
    </>
  );
}
