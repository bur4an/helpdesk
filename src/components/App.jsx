import React from 'react';
import Form from './Form.jsx'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class App extends React.Component {
  render(){
    return(
      <div>
          <Welcome name="eBayer" />
          <Form />
      </div>
    )
  }
}

export default App;
