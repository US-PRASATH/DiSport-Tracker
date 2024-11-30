import logo from './logo.svg';
import disport from './assets/Disport.png';
import './App.css';
import {Routes, Route, Link} from "react-router"; 
import IntroScreen from './components/IntroScreen';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <div className='flex h-24 bg-yellow-200 border-black border'>
        <img className='flex items-center' src={disport}/>
        <p className='text-2xl flex items-center absolute left-32 top-6'>DISPORT</p>
       
      </div>
      
      <Routes>
        
        <Route path='/' Component={IntroScreen}/>
        
        <Route path='/dashboard' element={
          <ProtectedRoute>
          <Dashboard/>
         </ProtectedRoute> 
      }/>
       
      </Routes>
      
      
    </div>
  );
}

export default App;
