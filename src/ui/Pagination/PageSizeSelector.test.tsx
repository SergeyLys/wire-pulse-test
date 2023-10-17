import { render, screen, fireEvent } from '@testing-library/react';
import PageSizeSelector, { PageSizeOption, PageSizeSelectorProps } from './PageSizeSelector';

const Component = (props: PageSizeSelectorProps & {pageSizeOptions: PageSizeOption[]}) => (
  <PageSizeSelector {...props} />
);

const setupComponent = (props?: Record<string, any>) => {
  const defaultProps = {
    handleSizeChange: jest.fn(),
    pageSizeOptions: [{id: 10, value: '10'}, {id: 20, value: '20'}, {id: 100, value: '100'}],
    defaultPageSize: 10
  };

  const mergedProps = {...defaultProps, ...props};

  return <Component {...mergedProps} />;
}

describe('PaginationPageSelector component', () => {

  it('should trigger handleSizeChange props on change', () => {
    const props = {
      handleSizeChange: jest.fn()
    }
    const mockOnChange = jest.spyOn(props, 'handleSizeChange');

    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('pagination-page-size-selector'));

    expect(screen.getAllByTestId('pagination-page-size-selector-item')).toHaveLength(3);

    fireEvent.click(screen.getAllByTestId('pagination-page-size-selector-item')[1]);

    expect(mockOnChange).toHaveBeenCalledWith({id: 20, value: '20'});
  });
});
