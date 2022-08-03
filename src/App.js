import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './Contexts/Main';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Main>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      </Main>
    </div>
  );
}

export default App;
