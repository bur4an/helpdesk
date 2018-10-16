import React from 'react';
import FetchForm from './FetchForm.jsx'
const REACT_VERSION = React.version;

class App extends React.Component {
  render(){
    return(
      <div>
          <div align="center"> React version: {REACT_VERSION} </div>
          <FetchForm />
      </div>
    )
  }
}

export default App;
