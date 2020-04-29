import React from 'react';
import { useSitecoreContext } from './SitecoreContextReactContext';

let emittedVI = false;
export const VisitorIdentification: React.FC = () => {
  const sitecoreContext: any = useSitecoreContext();

  if (!emittedVI && typeof document !== 'undefined' && sitecoreContext.visitorIdentificationTimestamp) {
    emittedVI = true;
    const script = document.createElement('script');
    script.src = `/layouts/system/VisitorIdentification.js`;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    return <meta name="VIcurrentDateTime" content={sitecoreContext.visitorIdentificationTimestamp} />;
  }

  return null;
};

VisitorIdentification.displayName = 'VisitorIdentification';
