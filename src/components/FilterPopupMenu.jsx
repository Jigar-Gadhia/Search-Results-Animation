// FilterPopupMenu.jsx
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import { SwitchComponent } from "./SwitchComponent";

export default function FilterPopupMenu({
  anchorEl,
  open,
  onClose,
  filters,
  onFilterToggle,
}) {
  const handleSwitchChange = (filterName) => (event) => {
    onFilterToggle(filterName, event.target.checked);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          minWidth: 200,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      {filters?.map((filter) => (
        <MenuItem
          key={filter.name}
          sx={{
            py: 0.5,
            px: 1.5,
            opacity: filter?.status ? 1 : 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // ✅ Key: pushes switch to right
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {/* Left side: icon + label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textTransform: "capitalize",
              flex: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {filter.icon && (
              <img
                src={filter.icon.trim()}
                alt={filter.name}
                style={{
                  width: "20px",
                  height: "20px",
                  filter:
                    "invert(42%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                }}
              />
            )}
            <span className="text-lg">{filter.name}</span>
          </div>

          {/* Right side: switch — no FormControlLabel needed! */}
          <SwitchComponent
            checked={filter.status}
            onChange={handleSwitchChange(filter.name)}
            size="small"
          />
        </MenuItem>
      ))}
    </Menu>
  );
}
