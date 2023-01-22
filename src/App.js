
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { useState } from 'react';

function App() {
  const [loginType, setLoginType] = useState('');
  const [allUsers, setAllUsers] = useState('');

  const changeLoginType = (val) => {
    setLoginType(val);
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login changeLoginType={changeLoginType} setAllUsers={setAllUsers} />}></Route>
        <Route exact path="/home" element={<Home loginType={loginType} allUsers = {allUsers}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
