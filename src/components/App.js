import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from 'react';
import Login from "./Login"
import Dashboard from "./Dashboard"

function App() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code");
    setCode(urlCode);
  }, []);


  return code ? <Dashboard code={code} /> : <Login />
}

export default App