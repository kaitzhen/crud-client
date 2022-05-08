/*==================================================
AllStudentsView.js
It constructs a React component to display the all students view page.
The component is to be included in AllStudentsContainer.js
================================================== */
import { Link } from "react-router-dom";

const AllStudentsView = (props) => {
  const {students} = props;

  if (!students.length) {
    return (
    <div>
      <h2>There are no students.</h2>
      <Link to={`/newstudent`}>
        <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // Render All Students view 
  return (
    <div>
      <h1 style={{margin:'20px', color:'white'}}>All Students</h1>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}
            style={{backgroundColor:'white', margin:'auto', marginBottom:'30px',
            borderRadius:5, width:'50%', padding:'20px'}}>
              <Link to={`/student/${student.id}`}>
                <h3 style={{color:'black'}}>{name}</h3>
              </Link>
              <img src= {student.imageUrl} alt="student" style={{width: '100px', height: '100px', borderRadius: 50}}></img>

              <hr/>
            </div>
          );
        }
      )}
      <br/>
      <Link to={`/newstudent`}>
        <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Add New Student</button>
      </Link>
    </div>
  );
};


export default AllStudentsView;