import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
MDBNavbar,MDBContainer,MDBIcon,MDBNavbarNav,MDBNavbarItem,MDBNavbarLink,
MDBNavbarToggler, MDBCollapse} from 'mdb-react-ui-kit';


export default function App() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [showNavCentred, setShowNavCentred] = useState(false);
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const userManagement = (e) => {
    e.preventDefault();
    navigate('/Users')
  }
  const Profile = (e) => {
    e.preventDefault();
    navigate('/Profile')
  } 
  const mailBox = (e) => {
    e.preventDefault();
    navigate('/Mail')
  } 
  
  const changePassward = (e) => {
    e.preventDefault();
    navigate('/Passward')
  } 


  return (
    <div>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavCentred(!showNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavCentred} center id='navbarCenteredExample'>
          <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
              <MDBIcon fas icon="home"  className='ms-1'  size='1x'  />  
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='Users' onClick={(e)=>userManagement(e)}>User Management</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='Profile' onClick={(e)=>Profile(e)}>User Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='Mail'onClick={(e)=>mailBox(e)}>Mailbox</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='Passward'onClick={(e)=>changePassward(e)}>Change Passward</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
  );

}