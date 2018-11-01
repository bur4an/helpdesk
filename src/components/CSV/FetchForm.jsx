import React from 'react';
import Button from '@material-ui/core/Button';
import List from './List.jsx';

class FetchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'LOGITECH', data:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSubmit = (event) => {
    this.setState({data:[]});
    fetch('/csvdata', {
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
        <React.Fragment>
          <Button variant="contained" color="primary"
           onClick={this.handleSubmit}>
            LOGITECH
          </Button>
          <List data={this.state.data} value={this.state.value}/>
        </React.Fragment>
    );
  }
}

  export default FetchForm
