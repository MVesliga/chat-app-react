import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from './Layout/Layout';
import Home from './Layout/Home/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Chat from './Chat/Chat';
import NoMatch from './NoMatch';
import ChatConsole from './Chat/ChatConsole';


function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/chat" component={Chat} /> 
            <Route path="/chatConsole" component={ChatConsole}/>
            <Route component={NoMatch}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
