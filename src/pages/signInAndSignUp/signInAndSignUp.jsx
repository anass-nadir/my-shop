import React from 'react';
import { withRouter } from 'react-router-dom';

import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import './signInAndSignUp.scss';

const SignInAndSignUp = () => (
    <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
    </div>
);

export default withRouter(SignInAndSignUp);