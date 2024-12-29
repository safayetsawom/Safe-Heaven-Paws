import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import EventApproval from './pages/admin/EventApproval';
import Donation from './pages/Donation';
import DonationApproval from './pages/admin/DonationApproval';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;