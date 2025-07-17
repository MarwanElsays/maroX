import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Container} from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timeline from './pages/TimeLine';
import { NavBar } from './components/NavBar/NavBar';
import { Post } from './pages/Post';
import FollowBar from './components/FollowBar/FollowBar';
import { UserProfile } from './pages/UserProfile';

export default function App() {

  return (
    <MantineProvider>
      <Router>
        <Container>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Timeline/>} />
            <Route path="/post" element={<Post/>} />
            <Route path="/timeline" element={<Timeline/>} />
            <Route path="/profile" element={<UserProfile/>} />
          </Routes>
          <FollowBar/>
        </Container>
      </Router>
    </MantineProvider>
  )
}