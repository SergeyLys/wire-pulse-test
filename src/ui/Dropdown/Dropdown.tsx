import React, {
  useEffect,
  useState,
  Children,
  useRef,
  useCallback,
  memo,
} from "react";
import Option from "./Option";
import "./styles.css";

type DropdownComposition = {
  Option: typeof Option;
}

type Props<T> = TestingProps & {
  onChange: (item: T) => void;
  children?: React.ReactElement | React.ReactElement[];
  placeholder?: string;
}

type TestingProps = {
  openerTestId?: string;
}

function Dropdown<T>({
  children,
  onChange,
  placeholder,
  openerTestId
}: Props<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    (
      Children.toArray(children).find(
        (child) => (child as React.ReactElement).props.default,
      ) as React.ReactElement
    )?.props.children || placeholder,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(placeholder || selectedValue);
  }, [placeholder]);

  useEffect(() => {
    document.addEventListener("click", hideDropdown);
    return () => {
      document.removeEventListener("click", hideDropdown);
    };
  }, [isOpen]);

  const hideDropdown = (e: MouseEvent) => {
    if (e.target === containerRef.current || !isOpen)
      return;

    setIsOpen(false);
  };

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="dropdown">
      <div data-testid={openerTestId || "dropdown-trigger"} onClick={toggleDropdown}>
        <div
          ref={containerRef}
          className={`dropdown-button ${isOpen ? "open" : ""}`}
        >
          {selectedValue}
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {children && Children.map(children, (child) => {
            if (child.type === MemoizedDropdown.Option) {
              return React.cloneElement(child, {
                ...child.props,
                onSelect: (item: T) => {
                  toggleDropdown();
                  onChange(item);
                  setSelectedValue(child.props.children);
                },
              });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

//@ts-ignore
const MemoizedDropdown = memo(Dropdown) as React.NamedExoticComponent<Props<any>> & DropdownComposition;

MemoizedDropdown.Option = Option;

export type { Props };
export default MemoizedDropdown;
