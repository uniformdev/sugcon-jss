import React from 'react';

export function Loading({ text = 'loading...' }) {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
}
