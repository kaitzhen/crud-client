/*==================================================
HomePageView.js
It constructs a React component to display the home page.
The component is to be included in HomePageContainer.js
================================================== */
import { Link } from "react-router-dom";

const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1 style={{margin:'20px', color:'white'}}>Home Page</h1>
      <div class="row" style={{display:'flex'}}>
        <div class="column" style={{flex:'25%', padding:'40px', height:'300px',margin:'50px', backgroundColor:'white'}}>
          <h2 style={{marginBottom:'20px'}}>View Campuses</h2>
                <Link to={`/campuses`}>
                    <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Click Here!</button>
                </Link> 
        </div>
        <div class="column" style={{flex:'25%', padding:'40px', height:'300px',margin:'50px', backgroundColor:'white'}}>
          <h2 style={{marginBottom:'20px'}}>View Students</h2>
              <Link to={`/students`}>
                    <button style={{marginBottom:'15px', padding:'10px',backgroundColor:'#585858',borderRadius:10,color:'white'}}>Click Here!</button>
              </Link> 
        </div>
      </div>
    </div>
  );    
}

export default HomePageView;