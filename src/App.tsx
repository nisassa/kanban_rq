import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { KanbanBoard } from './components/KanbanBoard';
import { SingleTask } from './components/pages/singleTask';
import { ChakraProvider } from '@chakra-ui/react'
import KanbanProvider from "./contextProviders/kanbanContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from './config/apiConfig'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Heading } from '@chakra-ui/react';

function App() {
  return (
      <QueryClientProvider client={ReactQueryClient}>
        <ChakraProvider>
          <KanbanProvider>
              <Heading
                  fontSize={{ base: '2xl', sm: '3xl', md: '3xl' }}
                  fontWeight="bold"
                  textAlign="center"
                  bgGradient="linear(to-l, #ca2869, #0094ff)"
                  bgClip="text"
                  mt={4}
              >
                  Welcome to the Kanban Board
              </Heading>
            <Router>
              <Routes>
                <Route path='/' element={
                    <DndProvider backend={HTML5Backend}>
                        <KanbanBoard/>
                    </DndProvider>
                } />
                  <Route path='/task/:id' element={
                      <SingleTask/>
                  } />
              </Routes>
            </Router>
          </KanbanProvider>
        </ChakraProvider>
      </QueryClientProvider>
  );
}

export default App;
