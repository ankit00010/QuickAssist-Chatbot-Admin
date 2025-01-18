import { FC, CSSProperties, MouseEventHandler } from "react";
import "./style.css";

interface CustomButtonProps {
  text: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  color?: string;
  border?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: FC<CustomButtonProps> = ({
  text,
  width,
  height,
  backgroundColor,
  color,
  border,
  onClick,
}) => (
  <button
    className="btn-component"
    style={{ width, height, backgroundColor, color, border }}
    onClick={onClick}
  >
    {text}
  </button>
);

export default CustomButton;
