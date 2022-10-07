import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { KanbanBoard } from './components/KanbanBoard'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from './config/apiConfig'
import KanbanProvider from "./provider/kanbanContext";

function App() {
  return (
      <QueryClientProvider client={ReactQueryClient}>
        <ChakraProvider>
          <KanbanProvider>
            <Router>
              <Routes>
                <Route path='/' element={<KanbanBoard/>} />
              </Routes>
            </Router>
          </KanbanProvider>
        </ChakraProvider>
      </QueryClientProvider>
  );
}

export default App;
