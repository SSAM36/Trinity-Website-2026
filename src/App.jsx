import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Contact from './pages/Contactus'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Registration from './pages/Registrations'
import Leaderboard from './pages/Leaderboard'
import Sponsors from './pages/Sponsors'
import TeamsOG from './pages/TeamsOG'
import Gallery from './pages/Gallery'
import Events from './pages/Events'
import EventCategoryPage from './pages/EventsCategoryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import siteBg from './images/website bg for all pages.png'

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    // Jump to the top of the page whenever the pathname changes
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);
  return null;
}

const App = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${siteBg})` }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 pt-16 md:pt-16 lg:pt-20">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/registrations" element={<Registration />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/teams" element={<TeamsOG />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:category" element={<EventCategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;