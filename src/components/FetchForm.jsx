import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import GridList from './GridList.jsx';

const style = {
    margin:12
  }

class FetchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', data:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSubmit = (event) => {
    this.setState({data:[]});
    fetch('/ebay', {
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
      <div align="center">
        <MuiThemeProvider>
          <SelectField
            floatingLabelText="Vendor Name"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="LOGITECH" primaryText="Logitech" />
            <MenuItem value="MICROSOFT" primaryText="Microsoft" />
            <MenuItem value="ADOBE" primaryText="Adobe" />
            <MenuItem value="ACER" primaryText="Acer" />
          </SelectField>
          <RaisedButton
            label="List" primary={true}
            style={style}
            onClick={this.handleSubmit}
          />

        <GridList data={this.state.data} value={this.state.value}/>

        </MuiThemeProvider>
      </div>
    );
  }
}

  export default FetchForm
