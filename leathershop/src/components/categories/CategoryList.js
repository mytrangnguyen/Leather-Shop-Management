import React from "react";
import CategoryListItem from "./CategoryListItems";

export default function CustomerList(props) {
  const { deleteItem, update, categories, undoDelete } = props;
  let listItems = categories.filter(item => !item.deleteAt).map((item, index) => (
    <CategoryListItem
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
        <h3 className="panel-title">LIST OF CATEGORY</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>NAME CATEGORY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
