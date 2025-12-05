import { useState } from 'react';
import axios from 'axios';
import './cssTelas/cadastroStyle.css'
import { useNavigate } from 'react-router-dom'; 
import React from 'react';




function Cadastro() {
  const navigate = useNavigate();
  const [novoEmail, setnovoEmail] = useState('');
  const [novaSenha, setnovaSenha] = useState('');
  const [novoNome, setnovoNome] = useState('');
  const [perfil, setTipo] = useState('moderador');
  const [erroCadastro, setErroCadastro] = useState(null);

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backhelpdesk.onrender.com/auth/cadastrar', {
        email: novoEmail,
        senha: novaSenha,
        nome: novoNome,
        perfil: perfil,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Cadastro bem-sucedido:', response.data);
    } catch (err) {
      setErroCadastro('Erro ao cadastrar usuário');
    }
  };
  const handlePress = (e) => {
    if (!novoEmail || !novaSenha || !novoNome) {
      e.preventDefault();
      setErroCadastro('Por favor, preencha todos os campos.');
    } else {
    navigate('/login')
  }}

  return (
    <div className="cadastro-container">
      <div className="form-box">
        <h2>Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            value={novoNome}
            onChange={(e) => setnovoNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={novoEmail}
            onChange={(e) => setnovoEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={novaSenha}
            onChange={(e) => setnovaSenha(e.target.value)}
          />
          
          <select value={perfil} onChange={(e) => setTipo(e.target.value)}>
            <option value="moderador">moderador</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" onClick={handlePress} >Cadastrar</button>
          {erroCadastro && <p className="error">{erroCadastro}</p>}
        </form>
      </div>
    </div>
  );
}

export default Cadastro;