import React, { useState } from "react";
import userList from '../data'
import { Button, Table, Modal } from 'antd';
import EditUserForm from "../forms/EditUserForm";

const UserTable = () => {
  const [users, setUsers] = useState(userList);

  const [editing, setEditing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialUser = {
    "id": null,
    "name": "",
    "emailId": "",
    "aadharNumber": "",
    "panNumber": "",
    "employeeType": "",
    "joiningDate": "",
  };
  const [currentUser, setCurrentUser] = useState(initialUser);

  const handleCancel = () => {
    setEditing(false);
    setIsModalVisible(false);
  };

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
    // console.log(user);
  };
  const modelEdit = (id, user) => {
    // console.log("before")
    // console.log(user)
    // console.log("done")
    setCurrentUser(user);
    setIsModalVisible(true);
    // setEditing(true);
    // console.log(user);
  };

  const updateUser = (newUser) => {
    // console.log(newUser)
    // console.log(currentUser)
    setUsers(users.map(user => (user.id === newUser.id ? newUser : user)));
    setEditing(false)
    setIsModalVisible(false);
  }

  const { Column } = Table;
  return (
    <>
      <Table dataSource={users}
        rowKey="id"
        bordered={true}
        editUser={editUser} pagination={false}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="emailId" key="emailId" />
        <Column title="AaadharNumber" dataIndex="aadharNumber" key="aadharNumber" />
        <Column title="panNumber" dataIndex="panNumber" key="panNumber" />
        <Column title="employee Type" dataIndex="employeeType" key="employeeType" />
        <Column title="Joining Date" dataIndex="joiningDate" key="joiningDate" />
        <Column
          title="Edit"
          key="edit"
          render={(id, user) => (
            <Button type="primary" onClick={() => editUser(id, user)}> Edit</Button>
          )}
        />
        <Column
          title="ModelEdit"
          key="modelEdit"
          render={(id, user) => (
            <Button type="primary" onClick={() => modelEdit(id, user)}>Model Edit</Button>
          )}
        />
      </Table>
      <Modal title="FORM" visible={isModalVisible} footer={null} closable={false} destroyOnClose={true}>
        <EditUserForm
          onCancel={handleCancel}
          currentUser={currentUser}
          updateUser={updateUser}
        />
      </Modal>
      {editing ? (
        <div>
          <EditUserForm
           onCancel={handleCancel}
            currentUser={currentUser}
            setEditing={setEditing}
            updateUser={updateUser}
          />
        </div>
      ) : null}
    </>

  )
}

export default UserTable;