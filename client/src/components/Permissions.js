import React, { useState } from "react";
import { Button, Card, Drawer, FormGroup, InputGroup } from "@blueprintjs/core";
import { useQuery } from "react-query";

import { axiosFetch } from "../api/axiosFetch";
import { useFormData } from "../hooks/useFormData";
import { DRAWER_BODY } from "@blueprintjs/core/lib/esm/common/classes";
import SelectDropdown from "./SelectDropdown";

const PermissionForm = ({ permissionData, isEdit, handleSubmit }) => {
  const { isLoading, data = [] } = useQuery(
    "groups",
    () => axiosFetch.get("/groups"),
    {
      select: (data) => {
        return data.data.map((group) => {
          return {
            ...group,
            label: group.name,
            value: group.name,
          };
        });
      },
    }
  );

  const { formData, appendFormData } = useFormData({
    initialValue: isEdit ? permissionData : { group: {}, tabs: [] },
  });

  return (
    <div>
      {!isEdit && (
        <FormGroup label="Group">
          <SelectDropdown
            items={data}
            loading={isLoading}
            selected={formData.group}
            onItemSelect={(group) => appendFormData({ group })}
          />
        </FormGroup>
      )}
      <FormGroup label="Tabs">
        <InputGroup
          value={formData.tabs.join()}
          onChange={({ target }) =>
            appendFormData({ tabs: target.value.split(",") })
          }
          placeholder="Tabs"
        />
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

export function Permissions() {
  const { isLoading, data, refetch } = useQuery("permissions", () =>
    axiosFetch.get("/permissions")
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async (permission) => {
    const { _id } = permission;
    const data = await axiosFetch.delete(`/permissions/${_id}`);
    await refetch();
    alert(data.data.message);
  };

  const handleUpdate = async (permission) => {
    const { data } = await axiosFetch.put(
      `/permissions/${permission._id}`,
      permission
    );
    await refetch();
    setShowDialog(false);
    setSelectedPermission(null);
    setIsEdit(false);
    alert(data.data.message);
  };

  const handleCreate = async (permission) => {
    const { data } = await axiosFetch.post("/permissions", permission);
    await refetch();
    setShowDialog(false);
    setSelectedPermission(null);
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
          setSelectedPermission(null);
        }}
      />
      {data.data.map((permission) => {
        return (
          <Card
            key={permission._id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h3>{permission.group.name}</h3>
              <strong>{permission.tabs.length}</strong> tabs
            </div>
            <div>
              <Button
                icon="updated"
                text="update"
                onClick={() => {
                  setIsEdit(true);
                  setShowDialog(true);
                  setSelectedPermission(permission);
                }}
              />
              <Button
                icon="delete"
                text="delete"
                onClick={() => handleDelete(permission)}
              />
            </div>
          </Card>
        );
      })}
      <Drawer
        title={`${isEdit ? "Edit" : "Create"} Permission `}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <div style={{ padding: 10 }} className={DRAWER_BODY}>
          <PermissionForm
            isEdit={isEdit}
            permissionData={selectedPermission}
            handleSubmit={handleSubmit}
          />
        </div>
      </Drawer>
    </div>
  );
}
