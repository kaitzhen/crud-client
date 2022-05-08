/*==================================================
EditStudentContainer.js
It renders the edit student view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {

    
    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        firstname: this.props.student.firstname, 
        lastname: this.props.student.lastname, 
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl, 
        gpa: this.props.student.gpa, 
        campusId: this.props.student.campusId,
        redirect: false, 
        redirectId: null
      };
    }

    // Get the specific student data from back-end database
    componentDidMount() {
    // Get student ID from URL (API link)
        this.props.fetchStudent(this.props.match.params.id);
    }
  
    // Capture input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
      console.log("change detected");
    }
  
    // Take action after user click the submit button
    handleSubmit = async event => {
      event.preventDefault();  // Prevent browser reload/refresh after submit.

  
      let student = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          imageUrl: this.state.imageUrl,
          gpa: this.state.gpa,
          campusId: this.state.campusId
      };
      
      
      // Update student in back-end database
      await this.props.editStudent(student,this.props.student.id);
      //await this.props.editStudent(student);
      // Update state, and trigger redirect to show the updated student
      this.setState({
        // name: "", 
        // address: "", 
        // description:"", 
        redirect: true, 
        redirectId: this.props.student.id
      });
    }
  
    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
  
    // Render edit student input form
    render() {
      // Redirect to updated student's page after submit
      if(this.state.redirect) {
        return (<Redirect to={`/student/${this.state.redirectId}`}/>)
      }
  
      // Display the input form
      return (
        <div>
          <Header />
          <EditStudentView 
            student={this.props.student}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        </div>          
      );
    }
  }
  
  // The following constructs the "connect" function used by EditStudentContainer to connect to Redux Store.  
  // Passing Redux Thunk (action creator) as props to the "connect" function
  // The "mapDispatch" is to call the specific Thunk to dispatch its action.
  const mapDispatch = (dispatch) => {
      
      return({
          editStudent: (student,id) => dispatch(editStudentThunk(student,id)),
          fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
      })
  }

  const mapState = (state) => {
    return {
      student: state.student,
    };
  };
  
  // Export store-connected container by default
  // EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(mapState, mapDispatch)(EditStudentContainer);