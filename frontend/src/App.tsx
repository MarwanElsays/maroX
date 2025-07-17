import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider, Container } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Timeline from './pages/TimeLine';
import { NavBar } from './components/NavBar/NavBar';
import { Post } from './pages/Post';
import FollowBar from './components/FollowBar/FollowBar';
import { UserProfile } from './pages/UserProfile';
import LoginForm from './pages/login/Login';
import SignupForm from './pages/signup/Signup';

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <AppContent />
      </Router>
    </MantineProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Container>
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/post" element={<Post />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>
      {!isAuthPage && <FollowBar />}
    </Container>
  );
}
