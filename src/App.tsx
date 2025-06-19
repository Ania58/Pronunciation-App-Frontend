import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordList from './components/WordList';
import WordDetails from './components/WordDetails';
import WordBrowser from './components/WordBrowser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">Home</h1>} />
        <Route path="/words" element={<WordList />} />
        <Route path="/words/:id" element={<WordDetails />} />
        <Route path="/words-browser" element={<WordBrowser />} />
      </Routes>
    </Router>
  );
}

export default App;
