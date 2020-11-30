import React, { Component } from "react";
import { connect } from "react-redux";
//import { useHistory } from "react-router-dom";
class EditNote extends Component {
  // let history = useHistory();
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      id: "",
    };
  }
  handleUpdate = (e) => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newMessage = this.getMessage.value;
    const data = {
      newTitle,
      newMessage,
    };
    this.props.dispatch({
      type: "UPDATE_NOTE",
      id: this.props.notes.id,
      data: data,
    });
    
  };
  render() {
    //map through redux state and find note with editing true. return that note
 
    return (
      <div key={this.props.notes.id} className="note">
        <form className="form" onSubmit={this.handleUpdate}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            //defaultValue={this.props.notes.title}
            placeholder="Enter Note Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            cols="28"
            ref={(input) => (this.getMessage = input)}
            //defaultValue={this.props.notes.message}
            placeholder="Enter Note"
          />
          <br />
          <br />
          <button>Update</button>
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
export default connect(mapStateToProps)(EditNote);
