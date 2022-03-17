import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input/Input';
import AdminTable from '../../components/adminTable/AdminTable';
import Header from '../../components/header/Header';
import api from '../../services/api';
import './Admin.css';

const NAME_MIN_LENGHT = 12;
const PASSWORD_MIN_LENGTH = 6;

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Vendedor');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const userData = JSON.parse(localStorage.getItem('user'));

  const handleChange = ({ target: { type, value } }) => {
    const object = {
      text: (info) => setName(info),
      email: (info) => setEmail(info),
      password: (info) => setPassword(info),
      'select-one': (info) => setRole(info),
    };
    object[type](value);
  };

  const handleSubmit = async () => {
    try {
      await api.adminRegister(name, email, password, role, userData.token);
      // location.reload();
    } catch (err) {
      console.log(err);
      setUserExists(true);
    }
  };

  useEffect(() => {
    const setUsersTableData = async () => {
      const data = await api.getAllNonAdminUsers(userData.token);
      setUsers(data);
    };
    setUsersTableData();
  }, [userData.token]);

  useEffect(() => {
    const handleButtonActivation = () => {
      if (validEmail && password.length >= PASSWORD_MIN_LENGTH
        && name.length >= NAME_MIN_LENGHT) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };

    handleButtonActivation();
  }, [name, email, password, validEmail, history]);

  function renderRegisterForm() {
    return (
      <form className="admin-form">
        <div className="admin-name-container">
          <Input
            label="Name"
            placeholder="Nome e sobrenome"
            type="text"
            testId="admin_manage__input-name"
            value={ name }
            handleChange={ handleChange }
          />
        </div>
        <div className="admin-email-container">
          <Input
            label="Email"
            placeholder="seu-email@email.com.br"
            type="email"
            testId="admin_manage__input-email"
            value={ email }
            handleChange={ handleChange }
          />
        </div>
        <div className="admin-password-container">
          <Input
            label="Password"
            placeholder="**********"
            type="password"
            testId="admin_manage__input-password"
            value={ password }
            handleChange={ handleChange }
          />
        </div>
        <div className="admin-role-container">
          <label htmlFor="admin-role" className="select-label">
            Tipo
            <select
              onChange={ handleChange }
              value={ role }
              data-testid="admin_manage__select-role"
              id="admin-role"
            >
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
              <option value="administrator">Administrator</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          testId="admin_manage__button-register"
          disabled={ buttonDisabled }
          onClick={ () => handleSubmit() }
          className="admin-register-button"
        >
          Cadastrar
        </button>
      </form>
    );
  }

  if (userExists) {
    return <p data-testid="admin_manage__element-invalid-register"> Usuario ja existe</p>;
  }

  return (
    <div className="wrapper">
      <div className="header-container">
        <Header
          category="GERENCIAR USUÁRIOS"
          user={ userData.name }
        />
      </div>
      <div className="table-container">
        {renderRegisterForm()}
        <AdminTable users={ users } />
      </div>
    </div>
  );
}

export default Admin;
