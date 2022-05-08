/*==================================================
StudentView.js
It constructs a React component to display the single student view page.
The component is to be included in StudentContainer.js
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  console.log(student);
  if(!student.campus) {
    return (
      <div>
      <h1 style={{margin:'20px', color:'white'}}>{student.firstname + " " + student.lastname}</h1>
      <div style={{backgroundColor:'white', margin:'auto', marginBottom:'40px',
        borderRadius:5, width:'50%', padding:'15px'}}>
          <img src= {student.imageUrl} alt="student" style={{width: '100px', height: '100px', borderRadius: 50}}></img>

          <p><span style={{fontWeight:'500'}}>First Name: </span>{student.firstname}</p>
          <p><span style={{fontWeight:'500'}}>Last Name: </span>{student.lastname}</p>
          <p><span style={{fontWeight:'500'}}>Email: </span>{student.email}</p>
          <p><span style={{fontWeight:'500'}}>GPA: </span>{student.gpa}</p>
          
          <p>(Not currently enrolled in a college)</p>
          
          
          
          <Link to={`/editstudent/${student.id}`}>
            <button style={{margin:'15px', padding:'10px',backgroundColor:'#D0D0D0',borderRadius:10,color:'black'}}>
              Edit Student Information</button>
          </Link>
          <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}} onClick={() => deleteStudent(student.id)}>Delete Student</button> 
      </div>
      
    </div>
    );
  }



  // Render a single Student view 
  return (
    <div>
      <h1 style={{margin:'20px', color:'white'}}>{student.firstname + " " + student.lastname}</h1>
      <div style={{backgroundColor:'white', margin:'auto', marginBottom:'40px',
        borderRadius:5, width:'50%', padding:'15px'}}>
          <img src= {student.imageUrl} alt="student" style={{width: '100px', height: '100px', borderRadius: 50}}></img>

          <p><span style={{fontWeight:'500'}}>First Name: </span>{student.firstname}</p>
          <p><span style={{fontWeight:'500'}}>Last Name: </span>{student.lastname}</p>
          <p><span style={{fontWeight:'500'}}>Email: </span>{student.email}</p>
          <p><span style={{fontWeight:'500'}}>GPA: </span>{student.gpa}</p>
          
          <p><span style={{fontWeight:'500'}}>Attends: </span> 
          <Link to={`/campus/${student.campus.id}`}>
            <h5 style={{color:'black'}}>{student.campus.name}</h5>
          </Link>
          </p>
          
          
          
          <Link to={`/editstudent/${student.id}`}>
            <button style={{margin:'15px', padding:'10px',backgroundColor:'#D0D0D0',borderRadius:10,color:'black'}}>
              Edit Student Information</button>
          </Link>
          <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}} onClick={() => deleteStudent(student.id)}>Delete Student</button> 
      </div>
      
    </div>
  );

};

export default StudentView;