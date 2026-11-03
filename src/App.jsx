import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SubmitCry808 from './pages/SubmitCry808.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit-cry808" element={<SubmitCry808 />} />
    </Routes>
  )
}
