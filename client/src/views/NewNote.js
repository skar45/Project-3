import React, { Component} from "react";
import { connect } from "react-redux";
import API from '../utils/API'
import { UserContext } from '../UserContext'
import { v4 as uuidv4 } from 'uuid'
import Emoji from '../components/Emojiis'

class NewNote extends Component {

  static contextType = UserContext

  constructor(props){
    super(props);
    this.state = {
      emoji : ""
    };
  }

  saveNote = async (note) => {
    const loggedUser = localStorage.getItem('user')
    const {userInfo} = this.context;
    let result = await API.saveNote(note, loggedUser)
    //console.log('Adding note', note, userInfo)
  }
  

  handleSubmit = (e) => {
    e.preventDefault();
    //const title = this.getTitle.value;
    //const message = this.getMessage.value;
    const data = {
      id: uuidv4(),
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
    const {userInfo, setUserInfo} = this.context;
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
const mapStateToProps = (state) => {
  return {
    notes: state,
  };
};
export default connect(mapStateToProps)(NewNote);
