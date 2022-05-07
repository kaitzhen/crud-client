/*==================================================
CampusView.js
It constructs a React component to display a single campus and its students (if any).
The component is to be included in CampusContainer.js
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, unenroll, deleteCampus} = props;

  if(!campus.students.length) {
    return (
      <div>
        <h1 style={{margin:'20px', color:'white'}}>{campus.name}</h1>
        <div style={{backgroundColor:'white', margin:'auto', marginBottom:'40px',
        borderRadius:5, width:'50%', padding:'15px'}}>

            
            <img src= {campus.imageUrl} alt="campus" style={{width: '300px', height: '200px'}}></img>
            <p><span style={{fontWeight:'500'}}>Address: </span>{campus.address}</p>
            <p><span style={{fontWeight:'500'}}>Description: </span>{campus.description}</p>
            <Link to={`/editcampus/${campus.id}`}>
              <button style={{margin:'15px', padding:'10px',backgroundColor:'#D0D0D0',borderRadius:10,color:'black'}}>Edit Campus Information</button>
            </Link>
            <button onClick={() => deleteCampus(campus.id)}
            style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}
            >Delete Campus</button>
            <p style={{fontWeight:'500'}}>There are no students enrolled currently.</p>
            <Link to={`/enrollstudent/${campus.id}`}>
              <button style={{margin:'10px', borderRadius:10, padding:'5px'}}>Enroll New Student</button>
            </Link>
        </div>
        
      </div>
    )
  }
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1 style={{margin:'20px', color:'white'}}>{campus.name}</h1>
      <div style={{backgroundColor:'white', margin:'auto', marginBottom:'40px',
        borderRadius:5, width:'50%', padding:'15px'}}>
          <img src= {campus.imageUrl} alt="campus" style={{width: '300px', height: '200px'}}></img>
          <p><span style={{fontWeight:'500'}}>Address: </span>{campus.address}</p>
          <p><span style={{fontWeight:'500'}}>Description: </span>{campus.description}</p>
          <Link to={`/editcampus/${campus.id}`}>
            <button style={{margin:'15px', padding:'10px',backgroundColor:'#D0D0D0',borderRadius:10,color:'black'}}>Edit Campus Information</button>
          </Link>
          <button onClick={() => deleteCampus(campus.id)}
          style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}
          >Delete Campus</button>
          <h3 style={{margin:'5px'}}>Total Students: {campus.students.length}</h3>
          <table className="center" style={{backgroundColor:'white', width:'75%',marginLeft:'auto',marginRight:'auto', border:'1px solid black', borderCollapse:'collapse'}}>
            <tr> 
              <th style={{border:'1px solid black', borderCollapse:'collapse'}}>Student Name</th>
            </tr>
            {campus.students.map( student => {
            let name = student.firstname + " " + student.lastname;
            return (
              <tr key={student.id}>
                <td style={{border:'1px solid black', borderCollapse:'collapse', padding:'5px'}}>
                  <Link to={`/student/${student.id}`}>
                    <p style={{color:'black'}}>{name}</p>
                  </Link> 
                  
                </td>    
                <td style={{border:'1px solid black', borderCollapse:'collapse', padding:'5px'}}>
                    <button style={{borderRadius:10}} onClick={() => unenroll(student)}>Unenroll</button>
                </td>
              </tr>
            );
            })}

          </table>
          

        <Link to={`/enrollstudent/${campus.id}`}>
            <button style={{margin:'10px', borderRadius:10, padding:'5px'}}>Enroll New Student</button>
        </Link>
      </div>
      
      
      
    </div>
  );
};

export default CampusView;