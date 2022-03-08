import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import api from '../../services/api';

const NAME_MIN_LENGHT = 12;
const PASSWORD_MIN_LENGTH = 6;
const testUser = 'admin_manage__element-user-table-item-number';
const testName = 'admin_manage__element-user-table-name';
const testEmail = 'admin_manage__element-user-table-email';
const testRole = 'admin_manage__element-user-table-role';
const testRemove = 'admin_manage__element-user-table-remove';
function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Vendedor');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const userData = JSON.parse(localStorage.getItem('user'));

  const handleChange = ({ target: { type, value } }) => {
    if (type === 'text') setName(value);
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
    if (type === 'select-one') setRole(value);
  };

  const handleSubmit = async () => {
    await api.adminRegister(name, email, password, role, userData.token);
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
          <option value="Seller">Seller</option>
          <option value="Customer">Customer</option>
          <option value="Administrator">Administrator</option>
        </select>
        <Button
          text="Cadastrar"
          type="button"
          testId="admin_manage__button-register"
          isDisabled={ buttonDisabled }
          action={ () => handleSubmit() }
        />
      </form>
    );
  }

  function renderUserTable() {
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
        <tbody>
          {
            users.map((user, index) => (
              <tr key={ index }>
                <td data-testid={ `${testUser}-${index}` }>{user.id}</td>
                <td data-testid={ `${testName}-${index}` }>{user.name}</td>
                <td data-testid={ `${testEmail}-${index}` }>{user.email}</td>
                <td data-testid={ `${testRole}-${index}` }>{user.role}</td>
                <td data-testid={ `${testRemove}-${index}` }>Botao excluir</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  return (
    <div className="wrapper">
      {renderRegisterForm()}
      {renderUserTable()}
    </div>
  );
}

export default Admin;
