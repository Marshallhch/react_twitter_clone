import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// Switch cant't use in ver 6, so need to down grade react-router-dom to ver 5. I need to study how to use changed react-router-dom.
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route exact path='/'>
            <Home />
          </Route>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
