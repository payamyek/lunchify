import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div>Hello, {user.firstName} welcome to Clerk</div>;
};

export default Home;
