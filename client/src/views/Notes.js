import React, { Component } from "react";
import { connect } from "react-redux";
import EditNote from "./EditNote";
//import noteReducer from ".. /reducers/noteReducer";
class Note extends Component {
  render() {
    const notes = this.props.notes.map((note) => {
      return (
        <div className="note">
          <h2 className="note_title">{note.title}</h2>
          <p className="note_message">{note.message}</p>
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
            >
              Edit
            </button>

            <button
              className="delete"
              onClick={() =>
                this.props.dispatch({
                  type: "DELETE_NOTE",
                  id: note.id,
                })
              }
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
    return <>{notes}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state,
  };
};
export default connect(mapStateToProps)(Note);
