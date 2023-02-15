import { Route, Routes } from 'react-router-dom';
import { Home, Basket, Admin } from './pages';
import Header from './components/Header.jsx';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/basket" element={<Basket />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
