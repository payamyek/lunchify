import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const PageLayout = () => {
  return (
    <div className='container mx-auto'>
      <NavBar />
      <div className='px-6'>
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
