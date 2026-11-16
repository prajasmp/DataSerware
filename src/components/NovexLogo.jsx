import React from 'react';
import DataSerwareLogo from './DataSerwareLogo';

/**
 * Rebranded from NovexLogo to DataSerwareLogo.
 * Kept for backwards-compatible imports across legacy pages.
 */
export default function NovexLogo(props) {
  return <DataSerwareLogo {...props} />;
}
