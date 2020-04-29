import React from 'react';

export function Error({ error = {}, errorMessage = 'An error occurred: ' }) {
  return <div>{`${errorMessage}${error.toString()}`}</div>;
}
