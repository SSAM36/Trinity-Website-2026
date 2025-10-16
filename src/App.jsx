import React, { useEffect, lazy, Suspense } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import siteBg from './images/website bg for all pages.png'

// Lazy load ALL pages including Home for better initial load
const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contactus'))
const Registration = lazy(() => import('./pages/Registrations'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Sponsors = lazy(() => import('./pages/Sponsors'))
const TeamsOG = lazy(() => import('./pages/TeamsOG'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Events = lazy(() => import('./pages/Events'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const EventCategoryPage = lazy(() => import('./pages/EventsCategoryPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Lazy load heavy components
const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-[#DBAB6A] border-dashed rounded-full animate-spin"></div>
  </div>
)

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
      <Analytics />
      <SpeedInsights />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 pt-16 md:pt-16 lg:pt-20">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/events/:categorySlug" element={<EventCategoryPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App;