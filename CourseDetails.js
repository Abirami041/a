import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThreeDotsIcon from '../assets/threedots.png';
import BookIcon from '../assets/book-1-svgrepo-com (1) 1.png';
import TrashBinIcon from '../assets/trash-svgrepo-com 6.png';
import ManageIcon from '../assets/download-svgrepo-com (5) 2.png';

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state ? location.state.course : null;

  const [editModuleIndex, setEditModuleIndex] = useState(null);
  const [modules, setModules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModuleDetails, setNewModuleDetails] = useState({
    topic: '',
    moduleNo: '',
    topicContent: '',
    assignmentContent: ''
  });
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    const savedModules = JSON.parse(localStorage.getItem('modules'));
    if (savedModules) {
      setModules(savedModules);
    }
  }, []);

  const handleOpenModal = (index = null) => {
    if (index !== null && modules[index]) {
      setNewModuleDetails(modules[index]);
      setEditModuleIndex(index);
    } else {
      setNewModuleDetails({
        topic: '',
        moduleNo: '',
       topicContent: '',
        assignmentContent: ''
      });
      setEditModuleIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewModuleDetails({ ...newModuleDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { topic, moduleNo, topicContent, assignmentContent } = newModuleDetails;

    if (!topic || !moduleNo || !topicContent || !assignmentContent) {
      alert('Please fill in all fields');
      return;
    }

    if (moduleNo.startsWith('Module ')) {
      moduleNo = moduleNo.replace('Module ', '');
    }

    const newModule = { topic, moduleNo,topicContent,  assignmentContent };
    let updatedModules;

    if (editModuleIndex !== null) {
      updatedModules = modules.map((module, index) =>
        index === editModuleIndex ? newModule : module
      );
    } else {
      updatedModules = [...modules, newModule];
    }

    setModules(updatedModules);
    localStorage.setItem('modules', JSON.stringify(updatedModules));
    setIsModalOpen(false);
    setNewModuleDetails({
      topic: '',
      moduleNo: '',
      topicTitle: '',
      topicContent: '',
      assignmentTitle: '',
      assignmentContent: ''
    });
    setEditModuleIndex(null);
  };

  const handleDelete = (moduleNo) => {
    const updatedModules = modules.filter(module => module.moduleNo !== moduleNo);
    setModules(updatedModules);
    localStorage.setItem('modules', JSON.stringify(updatedModules));
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <Container>
      <Header></Header>
      <Tabs>
        <Tab>People</Tab>
        <Tab>Progress</Tab>
        <Tab selected>Material</Tab>
      </Tabs>
      <HeaderContent>
        <CourseTitle>{course.title}</CourseTitle>
        <CreateModuleButton onClick={handleOpenModal}>+ Create Module</CreateModuleButton>
      </HeaderContent>
      <Content>
        <Modules>
          {modules.map((module, index) => (
            <Module key={index}>
              <ModuleTitle>{module.topic}</ModuleTitle>
              <ModuleNumber>Module {module.moduleNo}</ModuleNumber>
              <OptionsIcon onClick={() => toggleOptions(index)}>
                <img src={ThreeDotsIcon} alt="Options" />
              </OptionsIcon>
              {showOptions === index && (
                <OptionsMenu>
                  <Option onClick={() => handleOpenModal(index)}>
                    <img src={ManageIcon} alt="Manage" /> Manage
                  </Option>
                  <Option onClick={() => handleDelete(course.title)}>
                    <img src={TrashBinIcon} alt="Delete" /> Delete
                  </Option>
                </OptionsMenu>
              )}
              <BookIconImage src={BookIcon} alt="Book" />
              <ViewButton onClick={() => handleOpenModal(index)}>View</ViewButton>
            </Module>
          ))}
        </Modules>
      </Content>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>{editModuleIndex !== null ? 'Edit Module' : 'Create a Module'}</ModalTitle>
            <Form onSubmit={handleSubmit}>
              <Label>Title</Label>
              <Input
                type="text"
                name="topic"
                placeholder="Enter module title"
                value={newModuleDetails.topic}
                onChange={handleChange}
              />
              <Label>Module No</Label>
              <Input
                type="text"
                name="moduleNo"
                placeholder="Enter module number"
                value={newModuleDetails.moduleNo}
                onChange={handleChange}
              />
             
              <Label>Topic </Label>
              <Textarea
                name="topicContent"
                placeholder="Enter topic content"
                value={newModuleDetails.topicContent}
                onChange={handleChange}
                rows={6}
              />
              
              <Label>Assignment</Label>
              <Textarea
                name="assignmentContent"
                placeholder="Enter assignment content"
                value={newModuleDetails.assignmentContent}
                onChange={handleChange}
                rows={6}
              />
              <ButtonContainer>
                <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
                <CreateButton type="submit">{editModuleIndex !== null ? 'Save' : 'Create'}</CreateButton>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CourseDetails;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #EAECEE;
  border-radius: 5px;
  font-family: 'Open Sans';
  font-size: 14px;
  color: #223548;
  resize: vertical;
`;

const CourseTitle = styled.h1`
  align-self: flex-start; /* Aligns course name to left */
  margin-left: 20px; /* Adds spacing from left edge */
  font-size: 20px;
  font-family: 'Open Sans';
  font-weight: bold;
  color: #223548;
`;

const ViewButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #A668F4;
  color: white;
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Container = styled.div`
  background-color: #EAECEE;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #EAECEE;
  background-color: #FFFFFF; /* Updated to white */
  padding: 10px 0; /* Increased padding */
margin-top:-19px;
`;
const Tab = styled.div`
  padding: 10px 30px; /* Increased padding */
  cursor: pointer;
  font-family: 'Open Sans';
  font-weight: 600;
  color: ${props => (props.selected ? '#5B738B' : '#738496')};
  border-bottom: ${props => (props.selected ? '2px solid #5B738B' : 'none')};
`;

const Content = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CreateModuleButton = styled.button`
  background-color: #A668F4;
  color: white;
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px; /* Adds space on top */
  margin-right: 20px; /* Adds space on right */
`;

const Modules = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Module = styled.div`
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 5px;
  width: 210px;
  height:110px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  justify-content: space-between;
`;

const ModuleTitle = styled.h3`
  font-size: 18px;
  font-family: 'Open Sans';
  font-weight: 700;
  color: #223548;
  align-self: flex-start;
  margin-bottom:2px;
  margin-top:5px;
`;
const ModuleNumber = styled.p`
  font-size: 14px;
  font-family: 'Open Sans';
  font-weight: 600;
  color: #738496;
  align-self: flex-start;
  margin-top:5px;
`;

const OptionsIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
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

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #A668F4;
  cursor: pointer;
`;

const BookIconImage = styled.img`
  position: absolute;
  top: 15px;
  right: 10px;
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
  box-shadow: #0000001A;
  padding: 20px;
  border-radius: 15px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #223548;
  font-family: 'Open Sans';
  font-weight: 700;
  line-height: 32.68px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #475E75;
  font-family: 'Open Sans';
  font-weight: 600;
  line-height: 16.34px;
  font-size: 12px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #EAECEE;
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

