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
    console.log(event.target)
    this.setState({list:[]});
    fetch("/data", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: event.target.innerHTML})
        })
      .then(res => res.json())
      .then(list => this.setState({ list: list }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Form submitAction={this.handleSubmit} changeAction={this.handleChange} input={this.state.input} />
        <table>
          <tr valign="top">
            <td>
              <IngramList data={this.state.data} clickAction={this.handleClick} />
            </td>
            <td>
              <EbayList data={this.state.list} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

function EbayList (props){
  return (
    <div>
    <h1>eBay List</h1>
      { props.data.map(list =>
        <div key={list.ItemId}><a href={list.ViewItemURLForNaturalSearch}>{list.Title}</a> <span color="red">[{list.QuantitySold}]</span> ({list.CurrentPrice.amount})</div>
      )}
  </div>
  )
}

function IngramList (props){
  return (
    <div>
    <h1>Ingram List</h1>
    <ol>
      { props.data.map(list =>
        <li>
          <div>
                <strong>{list["Ingram Part Description"]} ({list["Customer Price with Tax"]})</strong>
          </div>
          <div onClick={props.clickAction} key={list["Vendor Part Number"]}>
                {list["Vendor Name"]} {list["Vendor Part Number"]}
          </div>
        </li>
      )}
    </ol>
  </div>
  )
}

function Form (props){
  return (
    <div>
      <form onSubmit={props.submitAction}>
        <select value={props.input} onChange={props.changeAction}>
          <option value="LOGITECH">Logitech</option>
          <option value="MICROSOFT">Microsoft</option>
          <option selected value="ADOBE">Adobe</option>
          <option value="ACER">Acer</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default FileDataForm;
