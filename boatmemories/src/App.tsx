import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import PreviewPage from './pages/PreviewPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/preview/:id" element={<PreviewPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
