import React, { useState } from "react";
import { Button, Card, Drawer, InputGroup } from "@blueprintjs/core";
import { useQuery } from "react-query";

import { axiosFetch } from "../api/axiosFetch";
import { useFormData } from "../hooks/useFormData";
import { DRAWER_BODY } from "@blueprintjs/core/lib/esm/common/classes";

const getAllUsers = () => axiosFetch.get("/users");

const UserForm = ({ user, isEdit }) => {
  const { formData, appendFormData } = useFormData({
    initialValue: isEdit ? user : { username: "", password: "" },
  });

  return (
    <div>
      <p>username</p>
      <InputGroup
        value={formData.username}
        onChange={({ target }) => appendFormData({ username: target.value })}
        type="text"
        placeholder="Enter username"
      />
      <p>Password</p>
      <InputGroup
        value={formData.password}
        onChange={({ target }) => appendFormData({ password: target.value })}
        type="password"
        placeholder="Password"
      />
    </div>
  );
};

export function ManageUsers() {
  const { isLoading, data, refetch } = useQuery("users", getAllUsers);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [mode, setMode] = useState("create");

  const handleDeleteUser = async (user) => {
    const { _id } = user;
    const data = await axiosFetch.delete(`/users/${_id}`);
    await refetch();
    alert(data.data.message);
  };

  const handleUpdate = async (user) => {
    const { data } = await axiosFetch.put(`/users/${user._id}`);
    await refetch();
    alert(data.data.message);
  };

  const handleCreate = async (user) => {
    const { data } = await axiosFetch.post("/users", user);
    await refetch();
    alert(data.data.message);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Button
        icon="add"
        text="Create User"
        onClick={() => setShowDialog(true)}
      />
      {data.data.map((user) => {
        return (
          <Card
            key={user._id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3>{user.username}</h3>
            <div>
              <Button
                icon="updated"
                text="update"
                onClick={() => {
                  setShowDialog(true);
                  setSelectedUser(user);
                }}
              />
              <Button
                icon="delete"
                text="delete"
                onClick={() => handleDeleteUser(user)}
              />
            </div>
          </Card>
        );
      })}
      <Drawer
        title="User"
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <div className={DRAWER_BODY}>
          <UserForm
            mode={mode}
            user={selectedUser}
            handleUpdate={handleUpdate}
            handleCreate={handleCreate}
          />
        </div>
      </Drawer>
    </div>
  );
}
