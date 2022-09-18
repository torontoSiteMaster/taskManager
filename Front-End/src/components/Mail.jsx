import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand, MDBIcon
} from 'mdb-react-ui-kit';

const Mail = () => {
  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='/' >
          <MDBIcon fas icon="home"  className='ms-1'  size='1x'  />  
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar> <br/>
  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Mail Box Working</div>
    </div>
  )
}

export default Mail
