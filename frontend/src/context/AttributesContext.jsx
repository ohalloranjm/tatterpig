import { createContext, useState, useContext } from 'react';

export const AttributesContext = createContext();

const AttributesProvider = props => {
  const [attributes, setAttributes] = useState({});

  return (
    <AttributesContext.Provider value={{ attributes, setAttributes }}>
      {props.children}
    </AttributesContext.Provider>
  );
};

export function useAttributes() {
  return useContext(AttributesContext);
}

export default AttributesProvider;
