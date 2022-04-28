/*==================================================
CampusView.js
It constructs a React component to display a single campus and its students (if any).
The component is to be included in CampusContainer.js
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;

  if(!campus.students.length) {
    return (
      <div>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        <p>campus id: {campus.id}</p>
        <p>There are no students enrolled currently.</p>
        <Link to={`/editcampus/${campus.id}`}>
          <button>Edit Campus</button>
        </Link>
      </div>
    )
  }
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <p>campus id:{campus.id}</p>

      <p>Students Enrolled: {campus.students.length}</p>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
    </div>
  );
};

export default CampusView;