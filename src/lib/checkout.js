const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FREE_SHIPPING_THRESHOLD = 2000;
export const FLAT_SHIPPING_FEE = 200;
export const SUPPORTED_PAYMENT_METHODS = ['COD'];

export function trimValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(trimValue(email));
}

export function toPositiveInteger(value) {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : null;
}

export function calculateShipping(subtotal) {
  return Number(subtotal || 0) > FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
}

export function normalizeShippingMethod(subtotal) {
  return calculateShipping(subtotal) === 0 ? 'Free' : 'Flat';
}

export function normalizeCheckoutCustomer(body, authedUser) {
  const email = trimValue(authedUser?.email || body?.email);
  const firstName = trimValue(body?.firstName);
  const lastName = trimValue(body?.lastName);
  const address = trimValue(body?.address);
  const city = trimValue(body?.city);
  const postalCode = trimValue(body?.postalCode);
  const phone = trimValue(body?.phone);
  const country = trimValue(body?.country) || 'Pakistan';
  const paymentMethod = trimValue(body?.paymentMethod) || 'COD';

  if (!email || !isValidEmail(email)) {
    return { error: 'A valid email address is required.' };
  }

  if (!firstName || !lastName || !address || !city || !phone) {
    return { error: 'Missing required customer details.' };
  }

  if (!SUPPORTED_PAYMENT_METHODS.includes(paymentMethod)) {
    return { error: 'Unsupported payment method.' };
  }

  return {
    customer: {
      userId: authedUser?.id ? String(authedUser.id) : null,
      userEmail: authedUser?.email ? trimValue(authedUser.email) : email,
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      country,
      paymentMethod,
    },
  };
}

export function normalizeCheckoutItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Your cart is empty.' };
  }

  const groupedItems = new Map();

  for (const rawItem of items) {
    const productId = trimValue(rawItem?.productId);
    const size = trimValue(rawItem?.size);
    const qty = toPositiveInteger(rawItem?.qty);

    if (!productId || !size || !qty) {
      return { error: 'Invalid cart item data.' };
    }

    const key = `${productId}::${size}`;
    const existingItem = groupedItems.get(key);
    const title = trimValue(rawItem?.title);
    const image = trimValue(rawItem?.image);

    groupedItems.set(key, {
      productId,
      size,
      qty: (existingItem?.qty || 0) + qty,
      title: existingItem?.title || title,
      image: existingItem?.image || image,
    });
  }

  return { items: [...groupedItems.values()] };
}

export function normalizeCheckoutPayload(body, authedUser) {
  const customerResult = normalizeCheckoutCustomer(body, authedUser);
  if (customerResult.error) {
    return customerResult;
  }

  const itemResult = normalizeCheckoutItems(body?.items);
  if (itemResult.error) {
    return itemResult;
  }

  return {
    ...customerResult,
    ...itemResult,
  };
}