/*==================================================
StudentContainer.js
It renders the single student view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";

class StudentContainer extends Component {

  constructor() {
    super();
    this.state = {
      deleted: false
    }
    
  }

  // Get student data from back-end database
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  remove = async studentID => {
    console.log(studentID);
    await this.props.deleteStudent(studentID);
    this.setState({
      
      deleted: true, 
      
    });
  }

  componentWillUnmount() {
    this.setState({deleted: false});
  }

  // Render Student view by passing student data as props to the component
  render() {
    if(this.state.deleted) {
      return (<Redirect to={`/students`}/>)
    }
    return (
      <div>
        <Header />
        <StudentView student={this.props.student}
        remove={this.remove} />
      </div>
    );
  }
}

// The following 2 parts construct the "connect" function used by StudentContainer to connect to Redux Store.  
// 1. Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
  };
};
// 2. Passing Redux State as props to the "connect" function
// The "mapState" is called when the Store State changes. 
// It returns an object of "student" data that StudentContainer needs.
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);