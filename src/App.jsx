import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
//telas
import Home from './telas/home'
import Login from './telas/login';
import Cadastro from './telas/criarConta'
import CriarChamado from './telas/criarChamado';
import TodosChamados from './telas/todosChamados';

function NavigationRoot() {
  return (
    <Router>

      <Routes>
        
        <Route path='/login' element={<Login />}/>
        <Route path='/todosChamados' element={<TodosChamados />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/criarChamado" element={<CriarChamado />} />


        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default NavigationRoot;
