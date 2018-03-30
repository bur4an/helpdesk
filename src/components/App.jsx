import React from 'react';
import DataForm from './DataForm.jsx';
import FileDataForm from './FileDataForm.jsx'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class App extends React.Component {
  render(){
    return(
      <div>
        <Welcome name="World" />
        <table>
          <tr valign="top">
          <td><DataForm /></td>
          <td><FileDataForm /></td>
          </tr>
        </table>
      </div>
    )
  }
}
export default App;
