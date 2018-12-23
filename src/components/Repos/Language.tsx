import React from "react";
import colors from "./languagesColor";

interface Props {
  language: string;
}

const Language = ({ language }: Props) => {
  const languageObject = (colors as any)[language];
  return (
    <a
      className="language"
      href={languageObject && languageObject.url}
      target="_blank"
    >
      <div
        className="language-color"
        style={{
          background: languageObject && languageObject.color
        }}
      />
      {language}
    </a>
  );
};

export default Language;
