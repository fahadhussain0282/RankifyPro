import React, { useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
};

const FALLBACK = '/images/fahad-hussain.jpg';

const normalizeSrc = (raw: string) => {
  try {
    // If already percent-encoded, decoding then encoding avoids double-encoding
    const decoded = decodeURIComponent(raw);
    return encodeURI(decoded);
  } catch (e) {
    try {
      return encodeURI(raw);
    } catch (e) {
      return raw;
    }
  }
};

const ImageWithFallback: React.FC<Props> = ({ src, alt = '', className = '', loading = 'lazy' }) => {
  const [current, setCurrent] = useState(() => normalizeSrc(src || FALLBACK));

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img
      src={current}
      alt={alt || 'image'}
      className={className}
      loading={loading}
      onError={() => setCurrent(FALLBACK)}
    />
  );
};

export default ImageWithFallback;
