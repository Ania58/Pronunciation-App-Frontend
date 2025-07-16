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

function App() {
  return (
    <Router>
      <SupportBanner />
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
      </Routes>
    </Router>
  );
}

export default App;
