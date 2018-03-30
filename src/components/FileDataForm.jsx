import React from 'react';

class FileDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: '', data: []};

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*handleChange(event) {
    this.setState({input: event.target.value});
  }*/

  handleSubmit(event) {
    this.setState({data:[]});
    fetch('/fileData', {
        method:'GET',
        /*headers: {
          'Content-Type': 'application/json'
        },*/
        //body: JSON.stringify({search: this.state.input})
        })
      .then(res => res.json())
      .then(list => this.setState({ data: list }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
        <h1>Data</h1>
          { this.state.data.map(list =>
            <div key={list["Ingram Part Number"]}>{list["Ingram Part Description"]}</div>
          )}
      </div>
    );
  }
}

export default FileDataForm;
