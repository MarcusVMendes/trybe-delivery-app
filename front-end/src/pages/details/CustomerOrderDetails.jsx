import React from 'react';
import { customerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import Table from '../../components/table/Table';

function CustomerOrderDetails() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <NavBar
        userName={ user.name }
        role={ user.role }
        links={ customerLinks }
      />
      <Table />
    </>
  );
}

export default CustomerOrderDetails;
