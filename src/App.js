import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";
import urlConfig from "./urlConfig.json";

export const config = {
  endpoint: `${urlConfig.backendUrl}/v2`,
};

function App(props) {
  return (
    <Switch>
      <Route path="/:name" render={(props) => <Country {...props} />} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
