/**
 * Utility functions for safely handling user input and HTML escaping
 * Prevents XSS and HTML injection vulnerabilities
 */

/**
 * Escapes HTML special characters to prevent injection attacks
 * Used when user input is displayed in HTML attributes or content
 */
export const escapeHtml = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  
  const htmlEscapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return str.replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char);
};

/**
 * Escapes XML special characters for XML/sitemap generation
 */
export const escapeXml = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  
  const xmlEscapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };
  
  return str.replace(/[&<>"']/g, (char) => xmlEscapeMap[char] || char);
};

/**
 * Safely sanitizes user input by:
 * - Trimming whitespace
 * - Removing null bytes
 * - Limiting length to prevent DoS
 */
export const sanitizeInput = (input: string, maxLength: number = 2000): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove null bytes and control characters
  let cleaned = input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  // Limit length
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  
  return cleaned;
};

/**
 * Validates URL format to prevent invalid URLs
 */
export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(sanitizeInput(urlString));
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Safely gets URL parts without crashing on invalid URLs
 */
export const safeGetUrlParts = (urlString: string): { hostname: string; pathname: string } | null => {
  try {
    const url = new URL(sanitizeInput(urlString));
    return { hostname: url.hostname, pathname: url.pathname };
  } catch {
    return null;
  }
};

/**
 * Safely parses JSON without throwing errors
 */
export const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    if (!jsonString || typeof jsonString !== 'string') return defaultValue;
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.warn('JSON parse error:', e);
    return defaultValue;
  }
};

/**
 * Generates a valid meta tag HTML string with escaped attributes
 */
export const createMetaTag = (props: { [key: string]: string }): string => {
  const attributes = Object.entries(props)
    .filter(([_, value]) => value && typeof value === 'string')
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(' ');
  
  return `<meta ${attributes} />`;
};

/**
 * Validates and normalizes crawl delay input
 */
export const validateCrawlDelay = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  const sanitized = sanitizeInput(value).replace(/[^0-9]/g, '');
  const num = parseInt(sanitized, 10);
  if (isNaN(num) || num < 0) return '';
  if (num > 3600) return '3600'; // Max 1 hour
  return String(num);
};

export default {
  escapeHtml,
  escapeXml,
  sanitizeInput,
  isValidUrl,
  safeGetUrlParts,
  safeJsonParse,
  createMetaTag,
  validateCrawlDelay
};
