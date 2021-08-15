import React, {useState} from 'react';
import './App.css';
import Navbar from './components/header/nav';
import Body from './components/body/body';
import Footer from './components/footer/footer';

function App() {
  const [curPage, setPage] = useState('/');

  return (
    <div className="App">
      <Navbar updateFunction={setPage} />
      <Body page={curPage} />
      <Footer />
    </div>
  );
}

export default App;
