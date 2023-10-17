import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown, {Props} from './Dropdown';

const Component = (props: Props<any> & {shouldUseDefaultOption: boolean}) => (
  <Dropdown
    placeholder={props.placeholder}
    onChange={props.onChange}
  >
    <div data-testid="element-to-trim" />
    <Dropdown.Option default={props.shouldUseDefaultOption} value={10}>
      Option 1
    </Dropdown.Option>
  </Dropdown>
);

const setupComponent = (props?: Record<string, any>) => {
  const defaultProps = {
    onChange: jest.fn(),
    shouldUseDefaultOption: true
  };

  const mergedProps = {...defaultProps, ...props};

  return <Component {...mergedProps} />;
}

describe('Dropdown component', () => {

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

  it('should render placeholder if default option is not set', () => {
    const props = {
      shouldUseDefaultOption: false,
      placeholder: "Dropdown placeholder"
    };
    render(setupComponent(props));
    expect(screen.getByText('Dropdown placeholder')).toBeInTheDocument();
  });

  it('should trigger onChange fn on change', () => {
    const props = {
      onChange: jest.fn()
    }
    const mockOnChange = jest.spyOn(props, 'onChange');

    render(setupComponent(props));

    fireEvent.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getAllByTestId('dropdown-option')).toHaveLength(1);

    fireEvent.click(screen.getByTestId('dropdown-option'));

    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  it('should close by document click', () => {
    render(setupComponent());

    fireEvent.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getAllByTestId('dropdown-option')).toHaveLength(1);

    fireEvent.click(document);

    expect(screen.queryByTestId('dropdown-option')).not.toBeInTheDocument();
  });
});
