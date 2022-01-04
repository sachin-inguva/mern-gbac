import React, { useState } from "react";
import { Button, Card, Drawer, FormGroup, InputGroup } from "@blueprintjs/core";
import { useQuery } from "react-query";

import { axiosFetch } from "../api/axiosFetch";
import { useFormData } from "../hooks/useFormData";
import { Classes } from "@blueprintjs/core/";

const GroupForm = ({ groupData, isEdit, handleSubmit }) => {
  const { isLoading, data } = useQuery(
    "users",
    () => axiosFetch.get("/users"),
    {
      select: (data) => {
        return data?.data?.filter((user) => !user.group);
      },
    }
  );
  const { formData, appendFormData } = useFormData({
    initialValue: isEdit ? groupData : { name: "", members: [] },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <FormGroup label="Name">
        <InputGroup
          value={formData.name}
          onChange={({ target }) => appendFormData({ name: target.value })}
          type="text"
          placeholder="Enter name"
        />
      </FormGroup>

      <FormGroup label="Members">
        {formData.members.map((user) => {
          return (
            <Button
              key={user.username}
              rightIcon="remove"
              text={user.username}
              onClick={() =>
                appendFormData({
                  members: formData.members.filter(
                    (_user) => _user.id !== user._id
                  ),
                })
              }
            />
          );
        })}
      </FormGroup>

      <FormGroup label="Select Users">
        {data.map((user) => {
          return (
            <Button
              key={user.username}
              rightIcon="add"
              text={user.username}
              onClick={() =>
                appendFormData({ members: formData.members.concat(user) })
              }
            />
          );
        })}
      </FormGroup>

      <Button
        intent="primary"
        icon="tick"
        onClick={() => handleSubmit(formData)}
        text="Submit"
      />
    </div>
  );
};

export function Groups() {
  const { isLoading, data, refetch } = useQuery("groups", () =>
    axiosFetch.get("/groups")
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async (group) => {
    const { _id } = group;
    const data = await axiosFetch.delete(`/groups/${_id}`);
    await refetch();
    alert(data.data.message);
  };

  const handleUpdate = async (group) => {
    const { data } = await axiosFetch.put(`/groups/${group._id}`, group);
    await refetch();
    setShowDialog(false);
    setSelectedGroup(null);
    setIsEdit(false);
    alert(data.data.message);
  };

  const handleCreate = async (group) => {
    const { data } = await axiosFetch.post("/groups", group);
    await refetch();
    setShowDialog(false);
    setSelectedGroup(null);
    setIsEdit(false);
    alert(data.data.message);
  };

  const handleSubmit = async (formData) => {
    isEdit ? handleUpdate(formData) : handleCreate(formData);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Button
        icon="add"
        text="Create"
        onClick={() => {
          setIsEdit(false);
          setShowDialog(true);
          setSelectedGroup(null);
        }}
      />
      {data.data.map((group) => {
        return (
          <Card
            key={group._id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h3>{group.name}</h3>
              <strong>{group.members.length}</strong> member(s)
            </div>
            <div>
              <Button
                icon="updated"
                text="update"
                onClick={() => {
                  setIsEdit(true);
                  setShowDialog(true);
                  setSelectedGroup(group);
                }}
              />
              <Button
                icon="delete"
                text="delete"
                onClick={() => handleDelete(group)}
              />
            </div>
          </Card>
        );
      })}
      <Drawer
        title={`${isEdit ? "Edit" : "Create"} Group `}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <div style={{ padding: 10 }} className={Classes.DRAWER_BODY}>
          <GroupForm
            isEdit={isEdit}
            groupData={selectedGroup}
            handleSubmit={handleSubmit}
          />
        </div>
      </Drawer>
    </div>
  );
}
