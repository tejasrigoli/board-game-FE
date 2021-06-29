import React from "react";
import GameBoard from "./components/board/GameBoard";
import RegistrationComponent from "./components/registration/RegistrationComponent";
import Header from "./components/registration/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Background from "./images/background.jpg"
function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <RegistrationComponent />
      </div>
      {/* <GameBoard /> */}
    </React.Fragment>
  );
}

export default App;