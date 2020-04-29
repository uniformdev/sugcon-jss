import React from 'react';
import { ComponentFactoryReactContext } from '@sitecore-jss/sitecore-jss-react/dist/components/SitecoreContext';
import { ComponentFactory } from '@sitecore-jss/sitecore-jss-react/types/components/sharedTypes';

export { ComponentFactoryReactContext };

const ComponentFactoryContext = React.createContext<any>(undefined);

export interface ComponentFactoryContextProps {
  componentFactory: ComponentFactory;
}

export const useComponentFactory = () => {
  const context = React.useContext(ComponentFactoryContext);
  if (context === undefined) {
    throw new Error('useComponentFactory must be used within a ComponentFactoryContextProvider');
  }
  return context;
};

export const ComponentFactoryContextProvider: React.FC<ComponentFactoryContextProps> = ({
  componentFactory,
  children,
}) => {
  return (
    <ComponentFactoryReactContext.Provider value={componentFactory}>
      {children}
    </ComponentFactoryReactContext.Provider>
  );
};
