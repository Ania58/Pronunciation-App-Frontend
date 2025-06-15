import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordList from './components/WordList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">Home</h1>} />
        <Route path="/words" element={<WordList />} />
      </Routes>
    </Router>
  );
}

export default App;
