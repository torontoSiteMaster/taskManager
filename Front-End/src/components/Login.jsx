import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';

// ******** FAKE DATA ****************

export function createRandomUser() {
  return {
    username: faker.internet.userName(),
    fname: faker.name.firstName(),
    fname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

const randomUser = {
  username: faker.internet.userName(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// ******** FAKE DATA ****************

function App() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };
  const handleSingUp = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <>
          <MDBIcon fas icon='globe' size='2x' />
        </>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1> Company Name </h1> <br />
      </div>
      <br />

      <MDBTabs
        pills
        justify
        className='mb-3 d-flex flex-row justify-content-between'
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab1')}
            active={justifyActive === 'tab1'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab2')}
            active={justifyActive === 'tab2'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <MDBInput
            value={randomUser.email}
            wrapperClass='mb-4'
            label='Email address'
            id='form1'
            type='email'
          />
          <MDBInput
            value={randomUser.password}
            wrapperClass='mb-4'
            label='Password'
            id='form2'
            type='password'
          />

          <div className='d-flex justify-content-between mx-4 mb-4'>
            <MDBCheckbox
              name='flexCheck'
              value=''
              id='flexCheckDefault'
              label='Remember me'
            />
            <a href='!#'>Forgot password?</a>
          </div>

          <MDBBtn className='mb-4 w-100' onClick={(e) => handleLogin(e)}>
            Sign in
          </MDBBtn>
          <p className='text-center'>
            Don't have an account? <a href='#!'>Register</a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <MDBInput
            value={randomUser.username}
            wrapperClass='mb-4'
            label='User Name'
            id='validationCustom01'
            type='text'
          />
          <MDBInput
            value={randomUser.firstname}
            wrapperClass='mb-4'
            label='First Name'
            id='validationCustom02'
            type='text'
          />
          <MDBInput
            value={randomUser.lastname}
            wrapperClass='mb-4'
            label='Last Name'
            id='validationCustom03'
            type='text'
          />
          <MDBInput
            value={randomUser.email}
            wrapperClass='mb-4'
            label='Email'
            id='validationCustom04'
            type='email'
          />
          <MDBInput
            value={randomUser.email}
            wrapperClass='mb-4'
            label='Password'
            id='validationCustom05'
            type='password'
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Confirm Password'
            id='validationCustom06'
            type='password'
          />

          <MDBBtn className='mb-4 w-100' onClick={(e) => handleSingUp(e)}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default App;
