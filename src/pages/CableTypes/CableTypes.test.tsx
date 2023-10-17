import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CableTypes from './CableTypes';

describe('CableTypes page', () => {
  it('renders correclty', () => {
    render(<CableTypes />);

    const errorMessage = screen.getByText('Cable types');
    expect(errorMessage).toBeInTheDocument();

    const tree = renderer.create(<CableTypes />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
