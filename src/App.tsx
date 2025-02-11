import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginPage } from './components/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/admin/Dashboard';
import HomeEditor from './pages/admin/sections/HomeEditor';
import AboutUsPageEditor from './pages/admin/sections/AboutUsPageEditor';
import Service from './pages/Service';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import { ServiceDetails } from './components/ServiceDetails';
import { HeroSection } from './components/about/HeroSection';
import { ProjectDetails } from './components/ProjectDetails';
import CareerForm from './components/CareerForm';
import { BlogDetails } from './components/BlogDetails';
import CareerList from './components/admin/editors/CareerList';
import { ProjectsEditor } from './components/admin/editors/ProjectsEditor';
import { ServicesEditor } from './components/admin/editors/ServicesEditor';
import { BlogsEditor } from './components/admin/editors/BlogsEditor';
import CareerDetails from './components/CareerDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutUs />
              <Footer />
            </>
          }
        />
         <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Service />
              <Footer />
            </>
          }
        />
         <Route
          path="/services/:id"
          element={
            <>
              <Navbar />
              <HeroSection type='Service' /> 
              <ServiceDetails />
              <Footer />
            </>
          }
        />
        <Route path="/projects/:id" element={
           <>
          <Navbar />
          <HeroSection type='Projects' /> 
          <ProjectDetails />
          <Footer />
          </>
          }
           />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
         <Route
          path="/career"
          element={
            <>
              <Navbar />
              <HeroSection type='Career' />
              <CareerForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <>
              <Navbar />
              <HeroSection type='News' />
              <BlogDetails />
              <Footer />
            </>
          }
        />  

        {/* Auth Routes */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomeEditor />} />
          <Route path='About' element= {<AboutUsPageEditor/>} />
          <Route path='services' element= {<ServicesEditor/>} />
          <Route path='projects' element= {<ProjectsEditor/>} />
          <Route path='blog' element= {<BlogsEditor/>} />
          <Route path='careers' element= {<CareerList/>} />
          <Route path='careers/:id' element= {<CareerDetails/>} />
          {/* Add other admin routes */}
        </Route>
      </Routes>
    </Router>
  );
}