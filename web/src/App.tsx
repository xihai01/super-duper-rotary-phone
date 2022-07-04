import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Repository } from './components/Repository';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:name" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}
