interface ButtonInterface {
  label: string;
  butonType?: "filled" | "outlined";
  color: string;
  className?: string;
  type: "button" | "reset" | "submit";
  disabled?: true | false;
}
export const Button = ({
  label,
  butonType,
  color,
  className,
  type,
  disabled = false,
}: ButtonInterface) => {
  return (
    <button
      style={{ backgroundColor: !disabled ? color : "#BBBCBD" }}
      className={`px-6 py-2 font-medium rounded-full text-white ${className}`}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
