import React from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer,
  MDBNavbar,MDBNavbarBrand, MDBIcon} from 'mdb-react-ui-kit';

const Passward = () => {
  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='/' >
          <MDBIcon fas icon="home"  className='ms-1'  size='1x'  />  
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar> <br/>

      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Change Passward Working</div>
    </div>
  
  )
}

export default Passward

