import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ClerkProviderWithRoutes from './routes/ClerkProviderWithRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
};

export default App;
