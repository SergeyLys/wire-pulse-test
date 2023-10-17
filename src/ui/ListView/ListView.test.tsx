import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import ListView, { Props, ColumnType } from './ListView';

const Component = (props: Props<any>) => (
  <ListView {...props} />
);

const setupComponent = (props?: Record<string, any>) => {
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

  const data = [
    {
      key: 0,
      catid: 213,
      manufacturer: 'Manufactorer 1',
      diameter: `432 mAh`
    },
    {
      key: 1,
      catid: 43,
      manufacturer: 'Manufactorer 3',
      diameter: `432 mAh`
    },
    {
      key: 2,
      catid: 432,
      manufacturer: 'Manufactorer 3',
      diameter: `432 mAh`
    }
  ]

  const defaultProps = {
    columns,
    data,
    error: null,
    isLoading: false
  };

  const mergedProps = {...defaultProps, ...props};

  return <Component {...mergedProps} />;
}

describe('ListView component', () => {
  it('renders correctly', () => {
    const component = setupComponent();

    render(component);

    expect(renderer.create(component).toJSON()).toMatchSnapshot();
    expect(screen.getAllByTestId('listview-item')).toHaveLength(3);
  });

  it('should show loading state when isLoading === true', () => {
    const props = {
      isLoading: true
    }
    const component = setupComponent(props);

    render(component);

    expect(renderer.create(component).toJSON()).toMatchSnapshot();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should show error state when error is not null', () => {
    const props = {
      error: 'Not found'
    }
    const component = setupComponent(props);
    const tree = renderer.create(component).toJSON();

    render(component);

    expect(tree).toMatchSnapshot();
    expect(screen.getByText('Some error occured')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
