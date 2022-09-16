import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,MDBIcon,MDBInput,MDBCheckbox} from 'mdb-react-ui-kit';

function App() {

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
       <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <>
       <MDBIcon fas icon="globe" size='2x' />
       </>
      </div> 
      <br />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1> Company Name </h1> <br />
      </div> 
      <br />

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

         

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          <p className="text-center">Don't have an account? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <MDBInput wrapperClass='mb-4' label='User Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password'/>

          {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div> */}

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;