import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination, { Props, PageSizeOption } from './Pagination';

const Component = (props: Props & {pageSizeOptions: PageSizeOption[]}) => (
  <Pagination {...props}>
    <div data-testid="element-to-trim" />
    <Pagination.PageSizeSelector pageSizeOptions={props.pageSizeOptions} />
    <Pagination.Arrow direction='left' />
    <Pagination.Current />
    <Pagination.Arrow direction='right' />
  </Pagination>
);

const setupComponent = (props?: Record<string, any>) => {
  const defaultProps = {
    total: 100,
    defaultPageSize: 10,
    current: 1,
    onChange: jest.fn(),
    pageSizeOptions: [{id: 10, value: '10'}, {id: 20, value: '20'}, {id: 100, value: '100'}]
  };

  const mergedProps = {...defaultProps, ...props};

  return <Component {...mergedProps} />;
}

describe('Pagination component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      setupComponent()
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render only related components', () => {
    render(setupComponent());

    expect(screen.queryByTestId('element-to-trim')).not.toBeInTheDocument();
  });

  it('should increase current page', () => {
    const props = {
      onChange: jest.fn()
    }
    const mockOnChange = jest.spyOn(props, 'onChange');
    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('pagination-arrow-next'));

    expect(mockOnChange).toHaveBeenCalledWith(2, 10);
    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent('2')
  });

  it('should decrease current page', () => {
    const props = {
      current: 10,
      onChange: jest.fn()
    }
    const mockOnChange = jest.spyOn(props, 'onChange');

    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('pagination-arrow-prev'));

    expect(mockOnChange).toHaveBeenCalledWith(9, 10);
    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent('9')
  });

  it('should not decrease current page if it is 1', () => {
    render(setupComponent());

    fireEvent.click(screen.getByTestId('pagination-arrow-prev'));

    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent('1')
  });

  it('should not increase current page if it is last', () => {
    render(setupComponent({current: 10}));

    fireEvent.click(screen.getByTestId('pagination-arrow-next'));

    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent('10')
  });

  it('should render page size correctly', () => {
    render(setupComponent());

    expect(screen.getByTestId('pagination-page-size-selector')).toBeInTheDocument();
  });

  it('should react on page size change', () => {
    const props = {
      onChange: jest.fn()
    }
    const mockOnChange = jest.spyOn(props, 'onChange');
    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('pagination-page-size-selector'));
    fireEvent.click(screen.getAllByTestId('pagination-page-size-selector-item')[1]);
    expect(mockOnChange).toHaveBeenCalledWith(1, 20);
  });

  it('should calculate pages amount if it is higher than total elements', () => {
    const props = {
      onChange: jest.fn(),
      current: 10
    }
    const mockOnChange = jest.spyOn(props, 'onChange');
    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('pagination-page-size-selector'));
    fireEvent.click(screen.getAllByTestId('pagination-page-size-selector-item')[1]);
    expect(mockOnChange).toHaveBeenCalledWith(5, 20);
  });
});
