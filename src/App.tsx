import { FC } from "react";
import { Provider } from "react-redux";
import { CssBaseline, useTheme } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { Theme } from "@ui";
import store, { persistor } from "@root/redux";

import { TodosScreen } from "@modules/Todos";

import "@root/i18n";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Theme>
        <AppRootView />
      </Theme>
    </PersistGate>
  </Provider>
);

const AppRootView: FC = () => {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <TodosScreen />
      <ToastContainer
        limit={3}
        stacked
        closeOnClick
        theme={theme.palette.mode}
        position={"bottom-center"}
        transition={Slide}
        hideProgressBar
      />
    </>
  );
};

export default App;
