import React, { useState } from 'react';


// Define the type for the children prop to include the onSelect function and isSelected state
type InjectedProps = {
  onSelect: () => void;
  isSelected: boolean;
};

type WithSelectedStateProps = {
  defaultSelected?: boolean;
};
// The HOC function
function withSelectedState<P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>,
  { defaultSelected = false }: WithSelectedStateProps = {}
) {
  // The component that wraps the original component
  const WithSelectedStateComponent: React.FC<Omit<P, keyof InjectedProps>> = (props) => {
    const [isSelected, setIsSelected] = useState(defaultSelected);

    const handleSelect = () => {
      console.log(getDisplayName(WrappedComponent), !isSelected)
      setIsSelected(!isSelected);
    };

    return <WrappedComponent {...(props as P) } isSelected={isSelected} onSelect={handleSelect} />;
  };

  WithSelectedStateComponent.displayName = `WithSelectedState(${getDisplayName(WrappedComponent)})`;

  return WithSelectedStateComponent;
}

// Helper function to get the display name of a component
function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// Usage example (assuming you have a component that expects onSelect and isSelected props)
// const EnhancedComponent = withSelectedState(MyComponent);

export {withSelectedState};