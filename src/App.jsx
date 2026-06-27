import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Landing from './pages/Landing'
import Stepper from './pages/Stepper'
import Dashboard from './pages/Dashboard'
import EmailPreview from './pages/EmailPreview'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <NavLink to="/" className="nav-logo">
            <i className="fa-solid fa-scissors"></i>
            <span>BookEase</span>
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/booking">Réservation</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/email">Email</NavLink>
          </div>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/booking" element={<Stepper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email" element={<EmailPreview />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
