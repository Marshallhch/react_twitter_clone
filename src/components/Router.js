import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// Switch cant't use in ver 6, so need to down grade react-router-dom to ver 5. I need to study how to use changed react-router-dom.
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
        <Redirect from='*' to='/' />
      </Switch>
    </Router>
  );
};

export default AppRouter;
