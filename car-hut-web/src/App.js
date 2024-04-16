import { Admin } from 'react-admin';
import './App.css';
import Routing from './components/Routing';
import AuthProvider from './auth/AuthProvider';

function App() {
  return (
    <div className='App'>
        <Admin authProvider={AuthProvider}>
          <Routing/>
        </Admin>
    </div>
  );
}

export default App;
