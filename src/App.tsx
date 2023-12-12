import './App.css';
//import ListGroup from './components/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyNavbar from './components/MyNavbar';
import { Outlet } from 'react-router-dom';

function App() {
  return <>
    <MyNavbar />
    <Outlet />
  </>
}

export default App;