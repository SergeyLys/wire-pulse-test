import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Error, CableTypes } from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CableTypes />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
