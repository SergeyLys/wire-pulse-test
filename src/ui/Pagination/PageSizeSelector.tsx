import { memo } from "react";
import { Dropdown } from "../Dropdown";

type PageSizeOption = {
  id: number;
  value: string;
}

type PageSizeSelectorProps = {
  handleSizeChange?: (pageSize: number) => void;
  pageSizeOptions: PageSizeOption[];
  defaultPageSize?: number;
  styles?: Record<string, any>;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({handleSizeChange, pageSizeOptions, defaultPageSize, styles}) => {
  return (
    <div style={styles}>
      <Dropdown
        openerTestId="pagination-page-size-selector"
        onChange={(pageSize: number) => handleSizeChange!(pageSize)}
      >
        {pageSizeOptions.map((option: PageSizeOption, i) => (
          <Dropdown.Option testid="pagination-page-size-selector-item" default={option.id === defaultPageSize} key={option.id} value={option}>
            {option.value}
          </Dropdown.Option>
        ))}
      </Dropdown>
    </div>
  )
}

export type {PageSizeOption, PageSizeSelectorProps};
export default memo(PageSizeSelector);