import { Fade } from "@mui/material";
import React from "react";
import { BootstrapTooltip } from "./BootstrapTooltip";
import LaunchIcon from "@mui/icons-material/Launch";
import { Tooltip, tooltipClasses } from "@mui/material";

export const ResultsComponent = ({
  handleCopyLink,
  onEnter,
  onExit,
  selectedFilterResults,
  STATUS_COLORS,
  Icons,
  FormatListBulletedIcon,
  isHover,
  currentIndex,
  tooltipTitle,
  copyTitle,
  isLoading,
  currentFilter,
}) => {
  return (
    <Fade in={!isLoading} timeout={500} key={currentFilter?.name}>
      <div className="gap-6 flex flex-col">
        {selectedFilterResults?.map((item, index) => {
          return (
            <div
              className="flex flex-row gap-5 items-center"
              onPointerEnter={() => onEnter(index)}
              onPointerLeave={onExit}
            >
              {item?.filter === "people" ? (
                <div className="flex relative">
                  <img
                    src={item?.avatar}
                    alt={item?.name || "User avatar"}
                    style={{
                      height: 38,
                      width: 38,
                      objectFit: "cover",
                      borderRadius: "20%", // Optional: if you want it circular
                      border: "1px solid #eee", // Optional: subtle border
                    }}
                  />
                  <div
                    className={`border-2 border-white absolute top-7 left-7 h-3 w-3 ${
                      STATUS_COLORS[item?.statusColor] || "bg-gray-400"
                    } rounded-lg`}
                  />
                </div>
              ) : (
                <div className="h-9 w-9 bg-gray-400 rounded-md flex items-center justify-center">
                  {React.createElement(
                    Icons[item.icon] || FormatListBulletedIcon,
                    {
                      sx: { fontSize: 20, color: "white" },
                    }
                  )}
                </div>
              )}
              <div className="flex flex-col flex-1">
                <p className="text-lg leading-5">{item?.name}</p>
                <p className="text-sm text-gray-500 bold">{item?.status}</p>
              </div>
              <Fade in={isHover} timeout={500} key={`${isHover}`}>
                <div
                  className={`flex flex-row gap-3 ${
                    isHover && index === currentIndex ? "flex" : "hidden"
                  }`}
                >
                  <BootstrapTooltip
                    title={tooltipTitle}
                    placement="top"
                    slotProps={{
                      popper: {
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                            {
                              marginBottom: "10px",
                              padding: 0,
                              paddingInline: 0.5,
                              fontSize: 16,
                            },
                        },
                      },
                    }}
                  >
                    <img
                      width="22"
                      height="22"
                      src="https://img.icons8.com/metro/52/link.png"
                      style={{
                        filter:
                          "invert(80%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                        cursor: "pointer",
                      }}
                      alt="link"
                      onClick={() => {
                        handleCopyLink(item?.id, copyTitle());
                      }}
                    />
                  </BootstrapTooltip>
                  <button className="flex flex-row gap-3 cursor-pointer">
                    <LaunchIcon className="text-gray-400" size={20} />
                    <p className="text-gray-400 text-md">New Tab</p>
                  </button>
                </div>
              </Fade>
            </div>
          );
        })}
      </div>
    </Fade>
  );
};
