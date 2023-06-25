import { SignUp } from '@clerk/clerk-react';
import './SignUpPage.sass';

const SignUpPage = () => {
  return (
    <div className='container m-auto justify-center flex h-screen'>
      <SignUp routing='path' path='/sign-up' />
    </div>
  );
};

export default SignUpPage;
