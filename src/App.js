import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
//components
import Navigation from './components/Navigation'

//Pages
import Home from "./pages/Home"
import NewSmoothie from "./pages/NewSmoothie"
import Smoothies from "./pages/Smoothies"

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/smoothies">
          <Smoothies />
        </Route>
        <Route path="/new-smoothie">
          <NewSmoothie />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
