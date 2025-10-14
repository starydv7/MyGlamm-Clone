/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} image
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} offerPrice - Currency string like "₹ 244" or "244"
 * @property {string} actualPrice - Currency string or empty when not applicable
 * @property {boolean} inStock
 * @property {number} rating
 */

/**
 * Parse a currency string like "₹ 244" or "244" to a number 244.
 * Returns NaN if parsing fails.
 * @param {string|number} value
 * @returns {number}
 */
export function parseCurrencyToNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  const numeric = value.replace(/[^0-9.]/g, '').trim();
  return numeric.length ? Number(numeric) : NaN;
}

/**
 * Format a numeric value into INR currency string like "₹ 244".
 * Falls back to the input if formatting fails.
 * @param {number|string} value
 * @returns {string}
 */
export function formatCurrencyINR(value) {
  const numberValue = typeof value === 'string' ? parseCurrencyToNumber(value) : value;
  if (!isFinite(numberValue)) return String(value ?? '');
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(numberValue);
  } catch {
    return `₹ ${numberValue}`;
  }
}

/**
 * Compute discount percentage from MRP to offer price.
 * Returns 0 if actual price is missing or invalid.
 * @param {string|number} offerPrice
 * @param {string|number} actualPrice
 * @returns {number}
 */
export function computeDiscountPercent(offerPrice, actualPrice) {
  const offer = parseCurrencyToNumber(offerPrice);
  const actual = parseCurrencyToNumber(actualPrice);
  if (!isFinite(offer) || !isFinite(actual) || actual <= 0 || offer >= actual) return 0;
  return Math.round(((actual - offer) / actual) * 100);
}

/**
 * Normalize a raw product into a richer shape with numeric prices and helpers.
 * @param {Product} product
 */
export function normalizeProduct(product) {
  const offerValue = parseCurrencyToNumber(product.offerPrice);
  const actualValue = parseCurrencyToNumber(product.actualPrice);
  return {
    ...product,
    offerPriceValue: isFinite(offerValue) ? offerValue : null,
    actualPriceValue: isFinite(actualValue) ? actualValue : null,
    discountPercent: computeDiscountPercent(product.offerPrice, product.actualPrice),
  };
}

/**
 * Get a concise availability label.
 * @param {Product} product
 * @returns {string}
 */
export function getAvailabilityLabel(product) {
  return product.inStock ? 'In stock' : 'Out of stock';
}

/**
 * Case-insensitive match across provided keys of a product.
 * @param {Product} product
 * @param {string} query
 * @param {Array<keyof Product>|string[]} keys
 * @returns {boolean}
 */
export function matchesSearch(product, query, keys) {
  const q = (query || '').toLowerCase();
  if (!q) return true;
  return keys.some((key) => String(product[key] ?? '').toLowerCase().includes(q));
}
