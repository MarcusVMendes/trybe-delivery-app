import PropTypes from 'prop-types';
import React from 'react';

const testUser = 'admin_manage__element-user-table-item-number';
const testName = 'admin_manage__element-user-table-name';
const testEmail = 'admin_manage__element-user-table-email';
const testRole = 'admin_manage__element-user-table-role';
const testRemove = 'admin_manage__element-user-table-remove';

function AdminTable(props) {
  const { users } = props;
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

AdminTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdminTable;
