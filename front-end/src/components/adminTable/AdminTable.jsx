import PropTypes from 'prop-types';
import React from 'react';
import './AdminTable.css';

const testUser = 'admin_manage__element-user-table-item-number';
const testName = 'admin_manage__element-user-table-name';
const testEmail = 'admin_manage__element-user-table-email';
const testRole = 'admin_manage__element-user-table-role';
const testRemove = 'admin_manage__element-user-table-remove';

function AdminTable(props) {
  const { users } = props;
  return (
    <table className="admin-table">
      <thead>
        <tr className="table-header">
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
              <td
                className="item"
                data-testid={ `${testUser}-${index}` }
              >
                {user.id}
              </td>

              <td
                className="name"
                data-testid={ `${testName}-${index}` }
              >
                {user.name}
              </td>

              <td
                className="email"
                data-testid={ `${testEmail}-${index}` }
              >
                {user.email}
              </td>

              <td
                className="role"
                data-testid={ `${testRole}-${index}` }
              >
                {user.role}
              </td>
              <td
                className="exclude"
                data-testid={ `${testRemove}-${index}` }
              >
                Excluir
              </td>
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
