/*==================================================
EditCampusContainer.js
It renders the edit campus view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {

    
    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        name: this.props.campus.name, 
        address: this.props.campus.address, 
        description: this.props.campus.description, 
        redirect: false, 
        redirectId: null
      };
    }

    // Get the specific campus data from back-end database
    componentDidMount() {
    // Get campus ID from URL (API link)
        this.props.fetchCampus(this.props.match.params.id);
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

  
      let campus = {
          name: this.state.name,
          address: this.state.address,
          description: this.state.description
      };
      console.log(`${campus.name}`);
      
      // Update campus in back-end database
      await this.props.editCampus(campus,this.props.campus.id);
      
      // Update state, and trigger redirect to show the new campus
      this.setState({
        // name: "", 
        // address: "", 
        // description:"", 
        redirect: true, 
        redirectId: this.props.campus.id
      });
    }
  
    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
  
    // Render new campus input form
    render() {
      // Redirect to updated campus's page after submit
      if(this.state.redirect) {
        return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
      }
  
      // Display the input form
      return (
        <div>
          <Header />
          <EditCampusView 
            campus={this.props.campus}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        </div>          
      );
    }
  }
  
  // The following constructs the "connect" function used by EditCampusContainer to connect to Redux Store.  
  // Passing Redux Thunk (action creator) as props to the "connect" function
  // The "mapDispatch" is to call the specific Thunk to dispatch its action.
  const mapDispatch = (dispatch) => {
      
      return({
          editCampus: (campus,id) => dispatch(editCampusThunk(campus,id)),
          fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
      })
  }

  const mapState = (state) => {
    return {
      campus: state.campus,
    };
  };
  
  // Export store-connected container by default
  // NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(mapState, mapDispatch)(EditCampusContainer);