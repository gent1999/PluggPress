import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import SubmitCry808 from './pages/SubmitCry808.jsx'
import SubmitArtistHeat from './pages/SubmitArtistHeat.jsx'
import SubmitGenius from './pages/SubmitGenius.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/submit-cry808" element={<SubmitCry808 />} />
      <Route path="/submit-artistheat" element={<SubmitArtistHeat />} />
      <Route path="/submit-genius" element={<SubmitGenius />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}
