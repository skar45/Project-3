import React, { Component } from "react";
import { connect } from "react-redux";
import Note from "./Notes";
import EditNote from "./EditNote";

class NoteList extends Component {
  render() {
    return (
      <div>
        <h1 className="note_heading">All Notes</h1>
        {this.props.notes.map((note) => (
          <div key={note.id}>
            {note.editing ? (
              <EditNote note={note} key={note.id} />
            ) : (
              <Note key={note.id} note={note} />
            )}
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notes: state,
  };
};

export default connect(mapStateToProps)(NoteList);
