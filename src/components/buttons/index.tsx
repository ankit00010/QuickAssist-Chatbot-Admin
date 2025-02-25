import { FC, MouseEventHandler } from "react";
import "./style.css";

interface CustomButtonProps {
  text: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  color?: string;
  border?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "outline" | "danger";
}

const CustomButton: FC<CustomButtonProps> = ({
  text,
  width,
  height,
  backgroundColor,
  color,
  border,
  onClick,
  variant="primary",
  type
}) => (
  <button
    className={`btn-component ${type} ${variant} `}
    style={{ width, height, backgroundColor, color, border }}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export default CustomButton;
