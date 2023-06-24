import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className='container m-auto justify-center flex h-screen'>
      <SignIn routing='path' path='/sign-in' />
    </div>
  );
};

export default SignInPage;
