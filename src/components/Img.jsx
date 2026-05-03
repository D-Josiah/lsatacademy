import React from 'react';

// Drop-in <img> replacement that serves a .webp from the same path
// when the src is a local .png/.jpg/.jpeg, falling back to the original
// for browsers without WebP support. For any other src (external URL,
// already-webp, svg, etc.) it renders a plain <img>.

const toWebp = (src) => {
  if (typeof src !== 'string') return null;
  if (!/\.(png|jpe?g)(\?.*)?$/i.test(src)) return null;
  return src.replace(/\.(png|jpe?g)(\?.*)?$/i, '.webp$2');
};

const Img = ({ src, ...rest }) => {
  const webp = toWebp(src);
  if (!webp) return <img src={src} {...rest} />;
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} {...rest} />
    </picture>
  );
};

export default Img;
