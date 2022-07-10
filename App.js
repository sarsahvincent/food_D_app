import { Provider } from "react-redux";
import ScreenNavigator from "./src/navigations/ScreenNavigator";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ScreenNavigator />
    </Provider>
  );
}
