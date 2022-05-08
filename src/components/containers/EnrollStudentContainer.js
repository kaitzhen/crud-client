/*==================================================
EnrollStudentContainer.js
It renders the form to enroll student to a certain campus. 
It also contains Thunk.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EnrollStudentView from '../views/EnrollStudentView';
import { fetchCampusThunk, addStudentThunk } from '../../store/thunks';

class EnrollStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      imageUrl: '',
      email: "",
      gpa: 0.0,
      campusId: this.props.match.params.id, 
      redirect: false, 
      redirectId: this.props.match.params.id
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    console.log('componenet did mount');
    console.log(this.props.match.params.id);

  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    let student;
    if(this.state.imageUrl === '') {
      student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        gpa: this.state.gpa,
        campusId: this.state.campusId
      };
    } else {
      student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        imageUrl: this.state.imageUrl,
        email: this.state.email,
        gpa: this.state.gpa,
        campusId: this.state.campusId
      };
    }
    
    // Add new student in back-end database
    await this.props.addStudent(student);

    // Update state, and trigger redirect to campus
    this.setState({
      firstname: "", 
      lastname: "", 
      imageUrl: '',
      email: "",
      gpa: 0.0,
      campusId: null, 
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form
    return (
      <div>
        <Header />
        <EnrollStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}    
          campus={this.props.campus}
        />
      </div>          
    );
  }
}

// The following constructs the "connect" function used by EnrollStudentContainer to connect to Redux Store.  
// Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

const mapState = (state) => {
    return {
      campus: state.campus,
    };
  };

// Export store-connected container by default
// EnrollStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EnrollStudentContainer);