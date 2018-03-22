import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: 'query', data: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ data: users }));
    event.preventDefault();

  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.input} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>{this.state.input}</h1>
      <h1>Users</h1>
        { this.state.data.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
