import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LessonDetail from './pages/LessonDetail';
import Pdfs from './pages/Pdfs';
import Vip from './pages/Vip';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:levelId/:lessonIndex" element={<LessonDetail />} />
            <Route path="/pdfs" element={<Pdfs />} />
            <Route path="/vip" element={<Vip />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer theme="dark" position="top-center" />
      </div>
    </Router>
  )
}

export default App;
