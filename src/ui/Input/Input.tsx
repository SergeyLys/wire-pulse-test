import { memo, useState } from "react";
import "./styles.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  testId?: string;
}

const Input: React.FC<Props> = ({ value, onChange, testId }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      data-testid={testId || "input-test-id"}
      className="input"
      type="text"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export type {Props};
export default memo(Input);
