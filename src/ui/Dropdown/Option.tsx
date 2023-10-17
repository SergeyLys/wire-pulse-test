import { memo } from "react";

type Props<T> = {
  onSelect?: (s: T) => void;
  value: T;
  default?: boolean;
  children: React.ReactNode;
}

type TestingProps = {
  testid?: string;
}

function Option<T>({ children, onSelect, value, testid }: Props<T> & TestingProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(value);
    }
  };
  return (
    <div data-testid={testid || "dropdown-option"} className="dropdown-option" onClick={handleClick}>
      {children}
    </div>
  );
}

export default memo(Option);