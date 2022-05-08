/*==================================================
CampusContainer.js
It renders the single campus view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editStudentThunk,deleteCampusThunk } from "../../store/thunks";

import { CampusView } from "../views";

class CampusContainer extends Component {

  constructor() {
    super();
    this.state = {
      updated: false,
      deleted: false
    }
    
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  unenroll = async student => {

    let unenrolledStudent = {
      campusId: null
    }

    await this.props.editStudent(unenrolledStudent,student.id);
    this.props.fetchCampus(this.props.match.params.id);  //fetch campus students again to update

    this.setState({
      updated: true
    });
  }

  remove = async campusID => {
    console.log(campusID);
    await this.props.deleteCampus(campusID);
    this.setState({
      
      deleted: true, 
      
    });
  }

  componentWillUnmount() {
    this.setState({deleted: false});
  }

  // Render a Campus view by passing campus data as props to the component
  render() {
    if(this.state.deleted) {
      return (<Redirect to={`/campuses`}/>)
    }
    return (
      
      <div>
        <Header />
        <CampusView 
          campus={this.props.campus}
          unenroll={this.unenroll}
          
          remove={this.remove}
        />
      </div>
    );
  }
}

// The following 2 parts construct the "connect" function used by CampusContainer to connect to Redux Store.  
// 1. Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editStudent: (student,id) => dispatch(editStudentThunk(student,id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
  };
};
// 2. Passing Redux State as props to the "connect" function
// The "mapState" is called when the Store State changes. 
// It returns an object of "campus" data that CampusContainer needs.
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);