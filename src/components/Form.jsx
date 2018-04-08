import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IngramList from './IngramList.jsx'

const style = {
  margin: 12,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'LOGITECH', data:[]};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSubmit = (event) => {
    this.setState({data:[]});
    fetch('/fileData', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: this.state.value})
        })
      .then(res => res.json())
      .then(list => this.setState({ data: list }));
    event.preventDefault();
  }
  render(){
    return (
      <div>
        <MuiThemeProvider>
          <SelectField
            floatingLabelText="Brand"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="LOGITECH" primaryText="Logitech" />
            <MenuItem value="MICROSOFT" primaryText="Microsoft" />
            <MenuItem value="ADOBE" primaryText="Adobe" />
            <MenuItem value="ACER" primaryText="Acer" />
          </SelectField>
          <RaisedButton label="Search" primary={true} style={style} onClick={this.handleSubmit}/>
          <IngramList data={this.state.data} />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Form
