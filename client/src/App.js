import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  return (
    <div>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<DashboardPage currentUser={currentUser} />}
            />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
