import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store"; // Import store as named export
import App from "./App.tsx";
import { ToastProvider } from "@radix-ui/react-toast";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ToastProvider />
  </Provider>
);
