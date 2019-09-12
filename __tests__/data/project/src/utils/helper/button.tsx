import React from "react";

console.log("utils.helper.button");

export function delay(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default ({ text: propText }: { text: string }): React.ReactNode => {
  const [text, setText] = React.useState(propText);
  React.useEffect(() => {
    setText(propText);
  }, [propText]);

  return <button>{text}</button>;
};
