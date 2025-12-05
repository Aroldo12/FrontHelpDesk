import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./cssTelas/homeStyle.css";

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const [chamados, setChamados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdicao, setFormEdicao] = useState({
        titulo: '',
        descricao: '',
        categoria: '',
        prioridade: '',
        status: ''
    });

    useEffect(() => {
        buscarChamados();
    }, []);

    const buscarChamados = async () => {
        try {
            const resposta = await axios.get("https://backhelpdesk.onrender.com/chamados/meus-chamados", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChamados(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar chamados:", error);
        }
    };

    const handlesCriarchamado = () => {
        navigate('/criarChamado');
    };
    // todosChamados
    const handlesTodosOsChamados= () => {
        navigate('/todosChamados');
    };

    // -------------------- DELETAR --------------------
    const deletarChamado = async (id) => {
        const confirmacao = window.confirm("Tem certeza que deseja deletar este chamado?");
        if (!confirmacao) return; // Se o usuário cancelar, não faz nada
    
        try {
            await axios.delete(`https://backhelpdesk.onrender.com/chamados/deletar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChamados(chamados.filter(c => c.id !== id)); // remove card da tela
        } catch (error) {
            console.error("Erro ao deletar chamado:", error);
        }
    };

    // -------------------- ABRIR EDIÇÃO --------------------
    const abrirEdicao = (item) => {
        setEditandoId(item.id);
        setFormEdicao({
            titulo: item.titulo,
            descricao: item.descricao,
            categoria: item.categoria,
            prioridade: item.prioridade,
            status: item.status
        });
    };

    // -------------------- SALVAR EDIÇÃO --------------------
    const salvarEdicao = async (id) => {
        try {
            const resposta = await axios.put(`https://backhelpdesk.onrender.com/chamados/atualizar/${id}`, 
                formEdicao,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setChamados(chamados.map(c => c.id === id ? resposta.data : c));
            setEditandoId(null);
        } catch (error) {
            console.error("Erro ao atualizar chamado:", error);
        }
    };

    return (
        <div className="home">
            {/* ===== BARRA SUPERIOR ===== */}
            <div className="cabeca">
                <button id="botao" onClick={handlesCriarchamado}>Criar Chamados</button>
                <button id="botao" onClick={handlesTodosOsChamados}>Todos os Chamados</button>
            </div>

            {/* ===== ÁREA INFERIOR (LISTA DE CHAMADOS) ===== */}
            <div className="home-content">
                <h2 className="tituloChamados">Meus Chamados</h2>

                {chamados.length === 0 ? (
                    <p>Nenhum chamado encontrado.</p>
                ) : (
                    <div className="cards-container">
                        {chamados.map((item) => (
                            <div key={item.id} className="cardChamado">
                                {editandoId === item.id ? (
                                    <div className="form-edicao">
                                        <input 
                                            type="text" 
                                            value={formEdicao.titulo} 
                                            onChange={e => setFormEdicao({...formEdicao, titulo: e.target.value})} 
                                        />
                                        <textarea 
                                            value={formEdicao.descricao} 
                                            onChange={e => setFormEdicao({...formEdicao, descricao: e.target.value})} 
                                        />
                                        <input 
                                            type="text" 
                                            value={formEdicao.categoria} 
                                            onChange={e => setFormEdicao({...formEdicao, categoria: e.target.value})} 
                                        />
                                        <select 
                                            value={formEdicao.prioridade} 
                                            onChange={e => setFormEdicao({...formEdicao, prioridade: e.target.value})}
                                        >
                                            <option value="baixa">Baixa</option>
                                            <option value="media">Média</option>
                                            <option value="alta">Alta</option>
                                        </select>
                                        <select 
                                            value={formEdicao.status} 
                                            onChange={e => setFormEdicao({...formEdicao, status: e.target.value})}
                                        >
                                            <option value="aberto">Aberto</option>
                                            <option value="em andamento">Em andamento</option>
                                            <option value="fechado">Fechado</option>
                                        </select>

                                        <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                                        <button onClick={() => setEditandoId(null)}>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <h3>{item.titulo}</h3>
                                        <p>{item.descricao}</p>
                                        <p>Status: {item.status}</p>
                                        <p>Prioridade: {item.prioridade}</p>
                                        <p>Categoria: {item.categoria}</p>
                                        <p>ID: {item.id}</p>

                                        <button onClick={() => abrirEdicao(item)}>Atualizar</button>
                                        <button onClick={() => deletarChamado(item.id)}>Deletar</button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
