import { MainPage } from "@/pages/main";
import { Provider } from "react-redux";
import { store } from "./store";

export function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
