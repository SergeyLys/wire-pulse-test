import { useRouteError } from "react-router-dom";
import "./styles.css";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div className="flex align-center justify-center flex-column flex-grow-1">
    <div className="error-container">
      <h1 className="error-title">Oops!</h1>
      <p className="error-subtitle">
        Sorry, an unexpected error has occurred.
      </p>
      {error && <p className="error-text">
        <i>{error.statusText || error.message}</i>
      </p>}
    </div>
  </div>
  );
}

export default ErrorPage;