import React from 'react';
import DataForm from './DataForm.jsx';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class App extends React.Component {
  render(){
    return(
      <div>
        <Welcome name="World" />
        <DataForm />
      </div>
    )
  }
}
export default App;
