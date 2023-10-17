import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import * as Router from 'react-router-dom';
import ErrorPage from './Error';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn()
}));

describe('ErrorPage component', () => {
  it('renders the error message', () => {
    jest.spyOn(Router, 'useRouteError').mockReturnValue({ statusText: 'Not Found' });

    render(<ErrorPage />);

    const errorMessage = screen.getByText('Not Found');
    expect(errorMessage).toBeInTheDocument();

    const tree = renderer.create(<ErrorPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default error message when no error is provided', () => {
    jest.spyOn(Router, 'useRouteError').mockReturnValue(null);

    render(<ErrorPage />);

    const defaultErrorMessage = screen.getByText('Sorry, an unexpected error has occurred.');
    expect(defaultErrorMessage).toBeInTheDocument();

    const tree = renderer.create(<ErrorPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
