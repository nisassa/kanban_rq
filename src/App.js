import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { KanbanBoard } from './Components/KanbanBoard'
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path='/' element={<KanbanBoard/>} />
          </Routes>
        </Router>
      </ChakraProvider>
  );
}

export default App;
