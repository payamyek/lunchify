import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY)
  throw new Error('Missing Publishable Clerk Key');

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const PrivateRoute = (props: { children: React.ReactNode }) => (
  <>
    <SignedIn>{props.children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path='/sign-in/*' element={<SignInPage />} />
        <Route path='/sign-up/*' element={<SignUpPage />} />
        <Route element={<PageLayout />}>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

export default ClerkProviderWithRoutes;
