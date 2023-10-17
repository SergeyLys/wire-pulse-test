import { useMemo, useState } from "react";
import useCableTypes from "../../hooks/useCableTypes";
import { ListView, ColumnType, Pagination, Input } from "../../../../ui";
import debounce from "../../../../libs/debounce";
import "./styles.css";

const columns: ColumnType[] = [
  {
    name: 'Catid',
    styles: {width: 100},
    dataRef: 'catid',
    key: '0',
  },
  {
    name: 'Manufacturer',
    styles: {width: '70%'},
    dataRef: 'manufacturer',
    key: '1',
  },
  {
    name: 'Diameter',
    dataRef: 'diameter',
    key: '2',
    styles: {width: 120},
  }
];

const pageSizeOptions = [{id: 10, value: '10'}, {id: 20, value: '20'}, {id: 100, value: '100'}];

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

const CableTypesList = () => {
  const [pagination, setPagination] = useState({after: 0, currentPage: DEFAULT_CURRENT_PAGE, pageSize: DEFAULT_PAGE_SIZE});
  const [searchValue, setSearchValue] = useState('');
  const { list, isLoading, error, total } = useCableTypes(pagination.pageSize, pagination.after, searchValue);

  const handleSearch = useMemo(() => debounce((value: string) => {
    setSearchValue(value);
  }, 500), []);

  const handleChangePage = useMemo(() => debounce((page: number, pageSize: number) => {
    setPagination(() => ({after: (page - 1) * pageSize, currentPage: page, pageSize}));
  }, 500), []);

  const normalizedData = useMemo(() => list.map(item => ({
    key: item.catid,
    catid: item.catid,
    manufacturer: item.manufacturer.name,
    diameter: `${item.diameter.actual.value} ${item.diameter.actual.unit}`
  })), [list]);
  
  return (
    <div className="relative">
      <div className="list-controls">
        <div className="flex wrap">
          <div className="flex flex-column flex-grow-1 justify-center">
            <Input testId="cable-types-list-search-input" value="" onChange={handleSearch} />
          </div>
          <Pagination
            total={total} 
            defaultPageSize={DEFAULT_PAGE_SIZE}
            current={pagination.currentPage}
            onChange={handleChangePage}
          >
            <Pagination.PageSizeSelector styles={{marginRight: 15}} pageSizeOptions={pageSizeOptions} />
            <Pagination.Arrow direction="left" />
            <Pagination.Current />
            <Pagination.Arrow direction="right" />
          </Pagination>
        </div>
      </div>
      <ListView
        headerStyles={{
          position: 'sticky',
          top: '91px'
        }}
        columns={columns}
        data={normalizedData}
        error={error}
        isLoading={isLoading}
      />
    </div>
  )
}

export {DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE};
export default CableTypesList;