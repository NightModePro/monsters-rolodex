import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import MyWork from './pages/my-work/my-work.component';
import Homepage from './pages/hopepage/homepage.component';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/my-work/' component={MyWork} />
      </BrowserRouter>
    );
  };
}



export default App;
