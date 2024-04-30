import { alpha } from "@mui/material";
import { InputHTMLAttributes, useEffect, useRef } from "react";

export interface AutoSelectTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function AutoSelectTextField(props: AutoSelectTextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // Current points to the mounted text input element
    inputRef.current?.select();
  };

  useEffect(() => {
    handleFocus();
  }, []);

  return (
    <input
      {...props}
      ref={inputRef}
      onFocus={handleFocus}
      autoFocus
      style={{
        width: "50px",
        textAlign: "right",
        fontSize: "16px", // Use font 16px prevent zooming on mobile
        border: "none",
        backgroundColor: alpha("#ffffff", 0.0),
      }}
    />
  );
}
