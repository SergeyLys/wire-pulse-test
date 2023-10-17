import { memo } from "react";
import "./styles.css";

const Spinner = () => <div data-testid="spinner" className="circle-loader" />;

export default memo(Spinner);
