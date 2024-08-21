import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ThreeDotsIcon from '../assets/threedots.png'; 
import LockIcon from '../assets/lock.png';
import TrashBinIcon from '../assets/trash-svgrepo-com 6.png'; 
import ManageIcon from '../assets/download-svgrepo-com (5) 2.png'; 

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state;
  const [courses, setCourses] = useState([course]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
   const [newCourseDetails, setNewCourseDetails] = useState({
    title: '',
    manager: '',         
    email: ''
  });
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    if (savedCourses.length > 0) {
      setCourses(savedCourses);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourseDetails({ ...newCourseDetails, [name]: value });
  };
  const handleEdit = (course) => {
    setNewCourseDetails(course);
    setEditCourse(course);
    setIsModalOpen(true);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, manager, email } = newCourseDetails;
  
    if (!title || !manager || !email) {
      alert('Please fill in all fields');
      return;
    }
  
    let updatedCourses;
    if (editCourse) {
      updatedCourses = courses.map((c) =>
        c.title === editCourse.title ? newCourseDetails : c
      );
    } else {
      updatedCourses = [...courses, newCourseDetails];
    }
  
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setIsModalOpen(false);
    setEditCourse(null);
  };
  
  

  const handleDelete = (title) => {
    const updatedCourses = courses.filter(course => course.title !== title);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <Container>
      <Header>
        <Title>Courses</Title>
        <CreateCourseButton onClick={handleOpenModal}>+ Create Course</CreateCourseButton>
      </Header>
      <CoursesContainer>
      {courses.map((course, index) => (
  <DetailBox key={index}>
    {index !== 0 && <LockIconImage src={LockIcon} alt="Lock" />}
    <CourseName>{course.title}</CourseName>
    <ManagerName>{course.manager}</ManagerName>
    <OptionsIcon onClick={() => toggleOptions(index)}>
      <img src={ThreeDotsIcon} alt="Options" /> 
    </OptionsIcon>
    {showOptions === index && (
      <OptionsMenu>
            <Option onClick={() => handleEdit(course)}>
            <img src={ManageIcon} alt="Manage" /> Manage
             </Option>
        <Option onClick={() => handleDelete(course.title)}>
          <img src={TrashBinIcon} alt="Delete" /> Delete
        </Option>
   </OptionsMenu>
    )}
    {index === 0 && (
      <OpenButton onClick={() => navigate(`/course-details/${course.title}`, { state: { course } })}>Open</OpenButton>

    )}
  </DetailBox>
))}


      </CoursesContainer>
      {isModalOpen && (
        <Modal>
          <ModalContent>
          <ModalTitle>{editCourse ? 'Edit Course' : 'Create a Course'}</ModalTitle>

            <Form onSubmit={handleSubmit}>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter course name"
                value={newCourseDetails.title}
                onChange={handleChange}
              />
              <Label>Course Manager</Label>
              <Input
                type="text"
                name="manager"
                placeholder="Enter category"
                value={newCourseDetails.manager}
                onChange={handleChange}
              />
              <Label>Manager Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="Enter manager email"
                value={newCourseDetails.email}
                onChange={handleChange}
              />
              <ButtonContainer>
                <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
                <CreateButton type="submit">Create</CreateButton>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CoursePage;

const Container = styled.div`
  padding: 20px;
  background-color: #EAECEE;
  height:100vh;
`;
const LockIconImage = styled.img`
  position: absolute;
  top: 20px; // Adjust as necessary
  right: 20px; // Adjust as necessary
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size:18px;
  font-family:'Open' Sans;
  font-weight:700;
  color:#223548;
`;

const CreateCourseButton = styled.button`
  background-color: #A668F4;
  font-family: 'Open' Sans;
  font-weight: 700;
  font-size: 14px;
  color: white;
  width: 167px;     
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const DetailBox = styled.div`
  background-color:#FFFFFF;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow:#0000000D;
  position: relative;
  width:210px;
  height:150px;
`;

const CourseName = styled.p`
  font-size: 24px;
  font-family: 'Open' Sans;
  font-weight: 600;
  color: #223548;
 margin-top:-10px;
`;

const ManagerName = styled.p`
  font-size:14px;
  font-family: 'Open' Sans;
  font-weight:600;
  color:#738496;
 margin-top:-10px;
`;

const OptionsMenu = styled.div`
  position: absolute;
  bottom: -19px;
  left: 30px;
  background-color: #FFFFFF;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
`;

const OptionsIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #A668F4;
  cursor: pointer;
`;

const OpenButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #A668F4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #FFFFFF;
  box-shadow:#0000001A;
  padding: 20px;
  border-radius: 15px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color:#223548;
  font-family:'Open Sans';
  font-weight:700;
  line-height:32.68px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color:#475E75;
  font-family:'Open Sans';
  font-weight:600;
  line-height:16.34px;
  font-size:12px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color:#EAECEE;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px; 
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: #5B738B;
  font-family:'Open' Sans;
   margin-top:20px;
  font-weight:600;
  font-size:14px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const CreateButton = styled.button`
  background-color: #A668F4;
  color: #ffffff;
  padding: 10px 20px;
  font-family:'Open'Sans;
  font-weight:700;
  font-size:14px;
  border: none;
  border-radius: 10px;
  width:100px;
  height:40px;
  cursor: pointer;
  box-shadow:#0000001A;
  margin-top:20px;
`;
