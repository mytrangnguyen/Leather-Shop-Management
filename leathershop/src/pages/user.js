import React from "react";

import FormAddUser from "../components/users/FormAddUser";
import UserList from "../components/users/UserList";
import Title from "../components/layouts/Title";

const Users = props => {
  const { addNew, update, deleteItem, users, undoDelete } = props;
  return (
    <>
      <main className="app-content">
        <Title
          title="Users"
          description="Manage Users"
          icon="fa fa-users"
        />
        <div className="container">
          <FormAddUser addNew={addNew} update={update} />
          <UserList
            users={users}
            update={update}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Users;
