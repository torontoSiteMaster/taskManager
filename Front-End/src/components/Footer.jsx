import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(45, 85, 255)', 
      position:'absolute', left: 0, bottom: 0, right:0 }}>
        © 2022 Copyright:
        <a className='text-white' href='http://sitemaster.ca/'>
         CompanyName.com
        </a>
      </div>
    </MDBFooter>
  );
}