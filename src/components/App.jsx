import React from 'react';
import FetchForm from './FetchForm.jsx'

function Welcome(props) {
  return <h1>Hello, {props.name}. Make your choice !</h1>;
}

class App extends React.Component {
  render(){
    return(
      <div>
          <Welcome name="there" />
          <FetchForm />
      </div>
    )
  }
}

export default App;



{/* Sample react Component

import React from 'react';

const CSVList = (props) => (
  //Do something with the props
);

export default CSVList;

*/}
