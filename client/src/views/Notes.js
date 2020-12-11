import React, { Component } from "react";
import { connect } from "react-redux";
import EditNote from "./EditNote";
import API from '../utils/API'

class Note extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  getNotes = async () => {
    const loggedUser = localStorage.getItem('user')
    let noteData = await API.getInfo()
    console.log('[getNotes] function result=', noteData.data)
  
    let currentUserData = noteData.data.filter(user => user.email === loggedUser)
      console.log('currentUserData =', currentUserData)
      if (currentUserData[0]){
        if (currentUserData[0].notes.length > 0){
          console.log('Prepare to set events', currentUserData[0].notes)
          this.setState({data: currentUserData[0].notes})
        }
      } else{
          console.log('No currentUserData')
      }
  }
  
  deleteNote = async (noteId) => {
    let result = await API.deleteNote(noteId)
  }
  
  componentDidMount(){
    this.getNotes()
  }

  render() {
    
    const notes = this.state.data.map((note) => {
      return ( 
        <div className="note">
          <h2 className="note_title">{note.title}</h2>
          <p className="note_message">{note.description}</p>
          <div className="control-buttons">
             <button
              className="edit"
              onClick={
                () =>
                  this.props.dispatch({
                    type: "EDIT_NOTE",
                    id: note.id,
                  })
                //this.props.location.pop("/EditNotes")
              }
              disabled>
              Edit
            </button>

            <button
              className="delete"
              onClick={this.deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
    return notes.length > 0 ? <>{notes}</> : <h2>No Results to Display</h2>;
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state,
  };
};
export default connect(mapStateToProps)(Note);
