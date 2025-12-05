import { useState } from 'react';
import axios from 'axios';
import './cssTelas/cadastroStyle.css'
import { useNavigate } from 'react-router-dom'; 
import React from 'react';
import './cssTelas/criarChamadoStyle.css'

function CriarChamado() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [prioridade, setPrioridade] = useState('baixa');   // <-- padrão válido
    const [status, setStatus] = useState('aberto');          // <-- padrão válido

    const handleCriarChamado = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'https://backhelpdesk.onrender.com/chamados/criar',
                {
                    titulo,
                    descricao,
                    categoria,
                    prioridade,
                    status,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Chamado criado com sucesso!");
        } catch (err) {
            alert("Erro ao criar chamado: " + err.response?.data?.mensagem || err.message);
        }
    };
    const handlePress = (e) => {
        if (!titulo || !descricao || !categoria) {
          e.preventDefault();
          setErroCadastro('Por favor, preencha todos os campos.');
        } else {
        navigate('/home')
      }}
    return (
        <div className="criar-chamado-container">
            <div className="form-box">
                <h2>Criar Chamado</h2>
                <form onSubmit={handleCriarChamado}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="baixa">Baixa</option>
            <option value="media">media</option>
            <option value="alta">alta</option>
          </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="aberto">Aberto</option>
            <option value="em andamento">Em Aberto</option>
            <option value="fechado">Fechado</option>
          </select>
                    
                    <button type="submit" onClick={handlePress}>Criar Chamado</button>
                </form>
            </div>
        </div>
    );



}
export default CriarChamado;