import React from "react";
import "../styles/button.css";
export const Button = ({
    onClick,
    children
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <button onClick={onClick} className="buttonStyle">
        {children}
      </button>
    );
  };