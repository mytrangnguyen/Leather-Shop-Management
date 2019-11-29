import React from "react";

import FormAddNewEmployee from "../components/employees/FormAddNewEmployee";
import EmployeeList from "../components/employees/EmployeeList";
import Title from "../components/layouts/Title";

const Employees = props => {
  const { addNew, update, deleteItem, employees, undoDelete } = props;
  return (
    <>
      <main className="app-content">
        <Title
          title="Employees"
          description="Manage Employees"
          icon="fa fa-briefcase"
        />
        <FormAddNewEmployee
          addNew={addNew}
          update={update}
          employees={employees}
        />
        <EmployeeList
          employees={employees}
          update={update}
          deleteItem={deleteItem}
          undoDelete={undoDelete}
        />
      </main>
    </>
  );
};

export default Employees;
