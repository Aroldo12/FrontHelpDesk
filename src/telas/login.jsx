import {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './cssTelas/loginStyle.css'
import Cadastro from './criarConta';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [perfil, setTipo] = useState('')
  




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backhelpdesk.onrender.com/auth/login', {
        email,
        senha,
      });
      const { token, perfil } = response.data; // Obtém o token e o tipo_usuario
    localStorage.setItem('token', token); // Armazena o token no localStorage
    console.log('Login bem-sucedido:', response.data);

    if (perfil === 'moderador') { // Certifique-se de que o valor corresponde ao ENUM do backend
        navigate('/home');
    } else {
        navigate('/home');
    }
} catch (err) {
    setErro('Email ou senha inválidos');
}
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <Link to="/cadastro" className='link-cadastro'>Criar Conta</Link>
          {erro && <p className="error">{erro}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;