import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Editor from './Editor';
import Login from "./Login.js"
const App = () => (
  <div>
    <Header />
    <Switch>
      
      <Route exact path="/" component={Login} />
      <Route path="/editor" component={Editor} />
    </Switch>
    <Footer />
  </div>
);

export default App;
