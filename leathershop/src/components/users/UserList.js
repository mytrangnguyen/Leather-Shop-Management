import React from "react";
import UserListItem from "./UserListItem";

export default function UserList(props) {
  const { deleteItem, update, users, undoDelete } = props;
  let listItems = users.filter(item => !item.deleteAt).map((item, index) => (
    <UserListItem
      key={item.id}
      item={item}
      index={index}
      deleteItem={deleteItem}
      update={update}
      undoDelete={undoDelete}
    />
  ));
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">LIST OF USERS</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody id="studentList">{listItems}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
