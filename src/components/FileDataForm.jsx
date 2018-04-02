import React from 'react';

class FileDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: 'LOGITECH', data: [], list:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    this.setState({data:[]});
    fetch('/fileData', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: this.state.input})
        })
      .then(res => res.json())
      .then(list => this.setState({ data: list }));
    event.preventDefault();
  }

  handleClick(event) {
    console.log(event.target.value)
    this.setState({list:[]});
    fetch('/data', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: event.target.value})
        })
      .then(res => res.json())
      .then(list => this.setState({ list: list }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <table>
          <tr valign="top">
            <td>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <select value={this.state.input} onChange={this.handleChange}>
                    <option value="LOGITECH">Logitech</option>
                    <option value="MICROSOFT">Microsoft</option>
                    <option selected value="ADOBE">Adobe</option>
                    <option value="ACER">Acer</option>
                  </select>
                  <input type="submit" value="Submit" />
                </form>
              </div>
              <h1>Ingram List</h1>
              <ol>
                { this.state.data.map(list =>
                  <li key={list["Ingram Part Number"]}>
                      <button onClick={this.handleClick} value={list["Vendor Name"]}>{list["Ingram Part Description"]}</button>
                  </li>
                )}
              </ol>
            </td>
            <td>
              <h1>eBay List</h1>
              <ol>
                { this.state.list.map(list =>
                  <li key={list.itemId}>{list.title}</li>
                )}
              </ol>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default FileDataForm;
