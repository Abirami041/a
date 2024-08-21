import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './Pages/Content';
import CoursePage from './Pages/CoursePage';
import CourseDetails from './Pages/CourseDetails';


const App = () => {
  const addCourse = (course) => {
    // Add course to your state or database
  };

  return (
    <Router>
      
      <div style={{ display: 'flex' }}>
      
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Content addCourse={addCourse} />} />
            <Route path="/course/:title" element={<CoursePage />} />
            <Route path="/course-details/:title" element={<CourseDetails />} /> {/* Add this line */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
