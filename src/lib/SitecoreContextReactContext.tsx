import React from 'react';

export const SitecoreContextReactContext = React.createContext<SitecoreContextProps>({} as SitecoreContextProps);

export interface SitecoreContextProps {
  pageEditing?: boolean;
  language: string;
}

export function useSitecoreContext() {
  const context = React.useContext(SitecoreContextReactContext);
  if (context === undefined) {
    throw new Error('useSitecoreContext must be used within a SitecoreContextReactContext Provider');
  }
  return context;
}
