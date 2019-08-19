import React, { Component } from 'react'
import Note from './Note';
import Form from './Form';

export default class Crud extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      id: 0,
      newNote: ''
    }
  }
  
  get = () => {
    fetch('http://localhost:7777/notes')
    .then(response => response.json())
    .then(data => {
      this.setState({notes: data});
      this.setState({id: data.length - 1})
    })
  }
  
  post = (id, text) => {
    const data = {
      id: id,
      content: text
    }
    fetch('http://localhost:7777/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }
  
  delete = (id) => {
    fetch('http://localhost:7777/notes/' + id, {
      method: 'DELETE'
    })
    .then(() => {
      this.get();
    })
    .catch(err => {
      console.error(err)
    });
  
  }

  componentDidMount() {
    this.get();
  }
  
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({newNote: value})
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.post(this.state.id + 1, this.state.newNote);
    this.setState({newNote: ''})
    this.get();
 }

  render() {
    return (
      <div>
        <h1>Notes</h1>
        <button className="update" onClick={this.get}>Обновить</button>
        <div className="notes">
          {this.state.notes.map(o => (
            <Note key={o.id} id={o.id} text={o.content} delete={this.delete} />
          ))}
        </div>
        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.newNote}/>
      </div>
    )
  }
}
