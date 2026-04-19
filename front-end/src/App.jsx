import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} /> */}
      </Routes>
  );
}