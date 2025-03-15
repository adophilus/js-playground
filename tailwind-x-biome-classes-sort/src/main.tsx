import { createRoot } from "react-dom/client";
import "./style.css";

const App = () => <div className="px-2 foo p-4 bar">This is from the App</div>;

createRoot(document.querySelector("#root")!).render(<App />);
