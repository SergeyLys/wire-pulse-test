import { memo } from "react";

const Current = ({currentPage, totalPages}: {currentPage?: number, totalPages?: number}) => <div data-testid="pagination-current-page" className="current">{currentPage} of {totalPages}</div>;

export default memo(Current);