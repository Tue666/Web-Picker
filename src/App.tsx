import React from "react";
import { Modal } from "./components";
import { MainPage } from "./pages";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Modal />
      <MainPage />
    </React.Fragment>
  );
};

export default App;
