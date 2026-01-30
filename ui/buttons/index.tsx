import { SubTitle } from "ui/typography";
type ButtonsProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};
export function DefaultButton({ children, className, onClick, type }: ButtonsProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white  font-[700] font-[inter] block border-[1px] border-black ${className}`}
    >
      {children}
    </button>
  );
}

export function BlueButton({ children, className, onClick, type }: ButtonsProps) {
  return (
    <DefaultButton
      type={type}
      onClick={onClick}
      className={`bg-[var(--azul-800)] h-[140px] w-[140px] text-[32px] rounded-full ${className}`}
    >
      {children}
    </DefaultButton>
  );
}
export function GreenButton({ children, className, onClick, type }: ButtonsProps) {
  return (
    <DefaultButton
      type={type}
      onClick={onClick}
      className={`bg-[var(--green)] text-[24px] w-[220px] h-[80px] rounded-[36px] ${className}`}
    >
      {children}
    </DefaultButton>
  );
}
export function FucsiaButton({ children, className, onClick, type }: ButtonsProps) {
  return (
    <DefaultButton type={type} onClick={onClick} className={`bg-[var(--fucsia-A200)] ${className}`}>
      {children}
    </DefaultButton>
  );
}

export function EditButton({ children, className, onClick, type, disabled }: ButtonsProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`rounded-[8px]  block ${className}`}
    >
      <SubTitle>{children}</SubTitle>
    </button>
  );
}
