/*==================================================
StudentView.js
It constructs a React component to display the single student view page.
The component is to be included in StudentContainer.js
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;
  console.log(student);
  if(!student.campus) {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.email}</h3>
        <h3>{student.gpa}</h3>
        <img src= {student.imageUrl} alt="student" style={{width: '100px', height: '100px', borderRadius: 50}}></img>
        <h3>Not enrolled in any campus.</h3>
        <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student</button>
        </Link>
      </div>
    );
  }



  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
      </Link>
      <h3>{student.email}</h3>
      <img src= {student.imageUrl} alt="student" style={{width: '100px', height: '100px', borderRadius: 50}}></img>
      <h3>{student.gpa}</h3>
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );

};

export default StudentView;