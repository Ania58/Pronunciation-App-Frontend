import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WordList from './components/WordList';
import WordDetails from './components/WordDetails';
import WordBrowser from './components/WordBrowser';
import RecordPage from './pages/RecordPage';
import WordProgressPage from './pages/WordProgressPage';
import AttemptHistoryPage from './pages/AttemptHistoryPage';
import ContactPage from './pages/ContactPage';
import { SupportBanner } from './components/SupportBanner';
import IPAVideosPage from './pages/IPAVideosPage';
import AboutMePage from './pages/AboutMePage';
import PronunciationPatternsPage from './pages/PronunciationPatternsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MaintenanceBanner from "./components/MaintenanceBanner";
import Dashboard from './pages/Dashboard';
import DeleteAccountPage from './pages/DeleteAccountPage';

function App() {
  return (
    <Router>
      <SupportBanner />
      {import.meta.env.VITE_SHOW_MAINTENANCE === "true" && <MaintenanceBanner />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/words" element={<WordList />} />
        <Route path="/words/:id" element={<WordDetails />} />
        <Route path="/words-browser" element={<WordBrowser />} />
        <Route path="/record" element={<RecordPage />} /> 
        <Route path="/progress" element={<WordProgressPage />} />
        <Route path="/attempts" element={<AttemptHistoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ipa-guide" element={<IPAVideosPage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/pronunciation-patterns" element={<PronunciationPatternsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
