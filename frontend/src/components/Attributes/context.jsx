import { createContext, useContext, useState } from 'react';

export const AttributeContext = createContext();

export default function AttributeProvider(props) {
  const [opened, open] = useState(null);
  const [contentId, setContentId] = useState(null);
  const [content, setContent] = useState(null);

  const show = function (component = null, id = null) {
    setContent(component);
    setContentId(id);
  };

  const display = function (component = null, id = null) {
    return function () {
      show(component, id);
    };
  };

  const toggle = function (component = null, id = null) {
    return function () {
      if (id === contentId) display()();
      else display(component, id)();
    };
  };

  const value = {
    content,
    setContent,
    toggle,
    display,
    contentId,
    setContentId,
    show,
  };

  return (
    <AttributeContext.Provider value={value}>
      {props.children}
    </AttributeContext.Provider>
  );
}

export function useAttributeSelection() {
  return useContext(AttributeContext);
}
