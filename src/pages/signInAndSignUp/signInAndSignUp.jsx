import React from 'react';
import { withRouter } from 'react-router-dom';

import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import './signInAndSignUp.scss';

const SignInAndSignUp = ({ history }) => (
    <div className='sign-in-and-sign-up'>
            <SignIn history={history} />
            <SignUp history={history} />
    </div>
);

export default withRouter(SignInAndSignUp);