import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider, Container, Center, Loader } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Timeline from './pages/TimeLine';
import { NavBar } from './components/NavBar/NavBar';
import { Post } from './pages/Post';
import FollowBar from './components/FollowBar/FollowBar';
import { UserProfile } from './pages/UserProfile';
// import LoginForm from './pages/login/Login';
// import SignupForm from './pages/signup/Signup';
import { FollowersPage } from './pages/FollowersPage';
import { FollowingPage } from './pages/FollowingPage';
import { useKeycloak } from './keycloak/keycloakContext';

export default function App() {
  const {isInitialized} = useKeycloak();

  if (!isInitialized) {
    return (
      <MantineProvider>
        <Center h="100vh" bg="black">
          <div style={{ textAlign: 'center', color: 'teal' }}>
            <Loader color="teal" size="lg" />
            <h1 style={{ marginTop: '1rem' }}>Marox</h1>
          </div>
        </Center>
      </MantineProvider>
    );
  }

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
        {/* <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} /> */}
        <Route path="/post" element={<Post />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/followers/:userName/:userId" element={<FollowersPage />} />
        <Route path="/following/:userName/:userId" element={<FollowingPage />} />
      </Routes>
      {!isAuthPage && <FollowBar />}
    </Container>
  );
}
