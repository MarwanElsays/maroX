import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Container } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <MantineProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<> To be added </>} />
            <Route path="/about" element={<> To be added </>} />
            <Route path="*" element={<> To be added </>} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  )
}