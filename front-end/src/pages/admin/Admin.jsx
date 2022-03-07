import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import api from '../../services/api';

const NAME_MIN_LENGHT = 12;
const PASSWORD_MIN_LENGTH = 6;

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Vendedor');
  const [token, setToken] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleChange = ({ target: { type, value } }) => {
    if (type === 'text') setName(value);
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
    if (type === 'select-one') setRole(value);
  };

  const handleSubmit = async () => {
    await api.adminRegister(name, email, password, role, token);
    global.alert('Usuario cadastrado com sucesso');
  };

  const handleButtonActivation = () => {
    if (validEmail && password.length >= PASSWORD_MIN_LENGTH
      && name.length >= NAME_MIN_LENGHT) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const setUsersTableData = async () => {
    const data = await api.getAllNonAdminUsers(token);
    setUsers(data);
  };

  const renderUserTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
      </table>
    )
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData.role !== 'administrator') history.push('/verificar uma rota');
    setToken(userData.token);
    handleButtonActivation();
    setUsersTableData();
  }, [name, email, password, validEmail, history]);

  return (
    <div className="wrapper">
      <form className="admin-form">
        <Input
          label="Name"
          placeholder="Nome e sobrenome"
          type="text"
          testId="admin_manage__input-name"
          value={ name }
          handleChange={ handleChange }
        />
        <Input
          label="Email"
          placeholder="seu-email@email.com.br"
          type="email"
          testId="admin_manage__input-email"
          value={ email }
          handleChange={ handleChange }
        />
        <Input
          label="Password"
          placeholder="**********"
          type="password"
          testId="admin_manage__input-password"
          value={ password }
          handleChange={ handleChange }
        />
        <select
          onChange={ handleChange }
          value={ role }
          data-testid="admin_manage__select-role"
        >
          <option value="Vendedor">Vendedor</option>
          <option value="Usuario">Usuario</option>
          <option value="Administrador">Adminsitrador</option>
        </select>
        <Button
          text="Cadastrar"
          type="button"
          testId="admin_manage__button-register"
          isDisabled={ buttonDisabled }
          action={ () => handleSubmit() }
        />
      </form>
      {renderUserTable()}
    </div>
  );
}

export default Admin;
