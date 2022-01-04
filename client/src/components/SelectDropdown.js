import React from "react";
import { MenuItem, Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Select } from "@blueprintjs/select";
import styled from "styled-components";

const itemRenderer = ({ label, value }, { handleClick, modifiers }) => {
  return (
    <MenuItem
      key={`item_${value}`}
      active={modifiers.active}
      text={label}
      onClick={handleClick}
    />
  );
};

const filterItems = (query, object) => {
  const { label } = object;
  return label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

const StyledButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width};
  & .bp3-button-text {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

function SelectDropdown({
  items,
  selected,
  onItemSelect,
  filterable,
  disabled,
  width,
  loading,
}) {
  return (
    <Select
      activeItem={selected?.label}
      items={items}
      itemRenderer={itemRenderer}
      itemPredicate={filterItems}
      noResults={<MenuItem disabled text="No results." />}
      onItemSelect={onItemSelect}
      filterable={filterable}
      disabled={disabled}
    >
      <Tooltip2
        openOnTargetFocus={false}
        content={selected?.label}
        position="bottom"
      >
        <StyledButton
          width={width}
          rightIcon="caret-down"
          loading={loading}
          text={selected?.label || "Select"}
        />
      </Tooltip2>
    </Select>
  );
}

SelectDropdown.defaultProps = {
  disabled: false,
  width: "180px",
};

export default SelectDropdown;
