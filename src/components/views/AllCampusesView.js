/*==================================================
AllCampusesView.js
It constructs a React component to display all campuses.
The component is to be included in AllCampusesContainer.js
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {

  if (!props.allCampuses.length) {
    return (
    <div>
      <h2>There are no campuses.</h2>
      <Link to={`/newcampus`}>
        <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Add New Campus</button>
      </Link>
    </div>);
  }

  // Render All Campuses view 
  return (
    <div>
      <h1 style={{margin:'20px', color:'white'}}>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id} 
        style={{backgroundColor:'white', margin:'auto', marginBottom:'30px',
        borderRadius:5, width:'50%', padding:'20px'}}>
          <Link to={`/campus/${campus.id}`}>
            <h3 style={{color:'black'}}>{campus.name}</h3>
          </Link>
          <p>Campus ID: {campus.id}</p>
          <img src= {campus.imageUrl} alt="campus" style={{width: '300px', height: '200px'}}></img>

          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Add New Campus</button>
      </Link>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;