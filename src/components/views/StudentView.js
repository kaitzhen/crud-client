/*==================================================
StudentView.js
It constructs a React component to display the single student view page.
The component is to be included in StudentContainer.js
================================================== */
const StudentView = (props) => {
  const { student } = props;
  console.log(student);
  if(!student.campus) {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.email}</h3>
        <h3>{student.gpa}</h3>
        <img src= {student.imageUrl} alt="student" style={{width: '300px', height: '200px'}}></img>
        <h3>Not enrolled in any campus.</h3>
      </div>
    );
  }



  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.campus.name}</h3>
      <h3>{student.email}</h3>
      <img src= {student.imageUrl} alt="student" style={{width: '300px', height: '200px'}}></img>
      <h3>{student.gpa}</h3>
    </div>
  );

};

export default StudentView;