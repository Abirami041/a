import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BoxIcon from '../assets/Group.png'; 

const Content = ({ addCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    manager: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    if (savedCourses.length > 0) {
      addCourse(savedCourses[0]); 
    }
  }, [addCourse]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, manager, email } = courseDetails;

    if (!title || !manager || !email) {
      console.log('All fields are required');
      alert('Please fill in all fields');
      return;
    }

    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    savedCourses.push(courseDetails);
    localStorage.setItem('courses', JSON.stringify(savedCourses));

    addCourse(courseDetails);
    navigate(`/course/${courseDetails.title}`, { state: { course: courseDetails } });
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Title>Courses</Title>
      <EmptyState>
        <Icon src={BoxIcon} alt="No Courses" />
        <Message>No Courses found !</Message>
        <Button onClick={handleOpenModal}> + Create Course</Button>
      </EmptyState>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>Create a Course</ModalTitle>
            <Form onSubmit={handleSubmit}>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder=""
                value={courseDetails.title}
                onChange={handleChange}
              />
              <Label>Course Manager</Label>
              <Input
                type="text"
                name="manager"
                placeholder=""
                value={courseDetails.manager}
                onChange={handleChange}
              />
              <Label>Manager Email</Label>
              <Input
                type="text"
                name="email"
                placeholder=""
                value={courseDetails.email}
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

export default Content;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #EAECEE;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  color:#223548;
  font-family:'Open' Sans;
  font-weight:700;
  line-height:24.51px;
  top:80px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #EAECEE;
  width: 167px;
  height:263px;
  margin-left:600px;
  margin-top:100px;
`;

const Icon = styled.img`
  width:113.6px;  
  height: 115.44px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #223548;
  margin-top: 10px;
  text-align: center;
  font-family:'Open' Sans;
  line-height:19.07px;
  font-weight:600;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
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
  margin-top: 20px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:#0000001A;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #FFFFFF;
  box-shadow: #0000001A;
  padding: 20px;
  border-radius: 15px;
  width: 450px;
  max-width: 90%;

`;

const ModalTitle = styled.h2`
 margin-top:1px;
  color: #223548;
  font-family: 'Open' Sans;
  font-weight: 700;
  line-height: 32.68px;
  font-size:24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
 color: #475E75;
  font-family: 'Open' Sans;
  font-weight: 600;
  line-height: 16.34px;
  font-size: 12px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  background-color: #EAECEE;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px; 
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
