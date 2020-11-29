import React, { Component } from "react";
import { connect } from "react-redux";
import API from '../utils/API'
import Emoji from '../components/Emojiis'

class NewNote extends Component {

  constructor(props){
    super(props);
    this.state = {
      emoji : ""
    };
  }

  saveNote = async (note) => {
    let result = await API.saveNote(note)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //const title = this.getTitle.value;
    //const message = this.getMessage.value;
    const data = {
      id: new Date(),
      title: this.getTitle.value,
      message: this.getMessage.value,
      editing: false,
    };
    this.props.dispatch({
      type: "ADD_NOTE",
      data,
    });

    this.saveNote(data)

    //clear input box
    this.getTitle.value = "";
    this.getMessage.value = "";
  };
  render() {
    return (
      <div className="note-container" style={{position: "relative"}}>
        <h1 className="note_heading">Create Note</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            placeholder="Enter Note Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={(input) => (this.getMessage = input)}
            cols="28"
            placeholder="Enter Note"

          />
          <Emoji data={(el)=>{
            this.setState({emoji:el});
            this.getMessage.value += this.state.emoji
          }}></Emoji>
          <br />
          <br />
          <button>Note</button>
        </form>
      </div>
    );
  }
}
export default connect()(NewNote);
