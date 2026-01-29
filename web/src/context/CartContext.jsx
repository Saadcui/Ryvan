'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

const STORAGE_KEY = 'cart_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Normalize old shape -> new shape: ensure `title` and `size` keys exist
    return parsed.map((it) => ({
      id: it.id,
      variantId: it.variantId || (it.id && it.size ? `${it.id}::${it.size}` : it.id),
      size: it.size || null,
      title: it.title || it.name || it.title || 'Product',
      price: Number(it.price || 0),
      image: it.image || it.images?.[0]?.url || null,
      qty: Number(it.qty || 0),
    }));
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

// Item shape: { id, name, price, image, qty }
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0), 0),
    [items]
  );

  function addToCart(product, qty = 1) {
    const rawId = product?._id || product?.id;
    if (!rawId) return;

    // Support composite variant ids like `<productId>::<size>` coming from product pages
    const idStr = String(rawId);
    const parts = idStr.split('::');
    const baseId = parts[0];
    const size = parts[1] || product?.size || null;

    const availableStock = typeof product?.availableStock !== 'undefined'
      ? Number(product.availableStock || 0)
      : undefined;

    setItems((prev) => {
      const existing = prev.find((p) => p.id === baseId && (p.size || null) === (size || null));
      if (!existing) {
        const image = product?.images?.[0]?.url || product?.image || null;
        const requested = Number(qty || 1);
        const toAdd = typeof availableStock === 'number' ? Math.min(requested, availableStock) : requested;
        if (toAdd <= 0) return prev;
        return [
          {
            id: baseId,
            variantId: idStr,
            size,
            title: product?.title || product?.name || 'Product',
            price: Number(product?.price || 0),
            image,
            qty: toAdd,
          },
          ...prev,
        ];
      }

      // If item exists, ensure we don't exceed availableStock
      if (typeof availableStock === 'number') {
        const canAdd = Math.max(0, availableStock - Number(existing.qty || 0));
        if (canAdd <= 0) return prev; // nothing to add
        const inc = Math.min(canAdd, Number(qty || 1));
        return prev.map((p) => (p.id === baseId && (p.size || null) === (size || null) ? { ...p, qty: Number(p.qty || 0) + inc } : p));
      }

      return prev.map((p) => (p.id === baseId && (p.size || null) === (size || null) ? { ...p, qty: Number(p.qty || 0) + Number(qty || 1) } : p));
    });
  }

  // Flexible setQty/remove that supports optional `size` variant argument:
  // setQty(id, qty) OR setQty(id, size, qty)
  function setQty(id, a, b) {
    let size = null;
    let qty = b === undefined ? a : b;
    if (b !== undefined) size = a;
    const next = Number(qty);
    setItems((prev) => {
      if (isNaN(next) || next <= 0) {
        // remove matching variant(s)
        return prev.filter((p) => !(p.id === id && (size ? (p.size || null) === size : true)));
      }
      return prev.map((p) => (p.id === id && (size ? (p.size || null) === size : true) ? { ...p, qty: next } : p));
    });
  }

  // remove(id) OR remove(id, size)
  function remove(id, size) {
    setItems((prev) => prev.filter((p) => !(p.id === id && (size ? (p.size || null) === size : true))));
  }

  const value = { items, cartCount, addToCart, setQty, remove };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
