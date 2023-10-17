import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Input, {Props} from './Input';

const Component = (props: Props) => (
  <Input {...props} />
);

const setupComponent = (props?: Record<string, any>) => {
  const defaultProps = {
    value: '',
    onChange: jest.fn()
  };

  const mergedProps = {...defaultProps, ...props};

  return <Component {...mergedProps} />;
}

describe('Input component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(setupComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should display correct value if value is provided', () => {
    render(setupComponent({value: 'Test value'}))

    expect(screen.getByTestId('input-test-id')).toHaveValue('Test value');
  });

  it('should react on change function', () => {
    const props = {
      value: '',
      onChange: jest.fn()
    }

    const mockOnChange = jest.spyOn(props, 'onChange');

    render(setupComponent(props));

    fireEvent.change(screen.getByTestId('input-test-id'), {
      target: {
        value: 'some typed text'
      }
    });

    expect(screen.getByTestId('input-test-id')).toHaveValue('some typed text');
    expect(mockOnChange).toHaveBeenCalledWith('some typed text');
  });
});
