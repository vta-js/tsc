import React from "react";

console.log("utils.button");

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default ({ text: propText }) => {
  const [text, setText] = React.useState(propText);
  React.useEffect(() => {
    setText(propText);
  }, [propText]);

  return <button>{text}</button>;
};
