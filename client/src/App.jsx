import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import EventApproval from './pages/admin/EventApproval';
import Donation from './pages/Donation';
import DonationApproval from './pages/admin/DonationApproval';
import Vet from './pages/Vet';
import Event from './pages/Event';
import Profile from './pages/Profile';
import Blog from './pages/Blog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/event-approval" element={<EventApproval />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/admin/donation-approval" element={<DonationApproval />} />
        <Route path="/vet" element={<Vet />} />
        <Route path="/event" element={<Event />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;