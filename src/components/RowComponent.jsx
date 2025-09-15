import { Grow } from "@mui/material";
import NumberFlow from "@number-flow/react";
import React from "react";

export const RowComponent = ({
  filteredResults,
  selectedFilters,
  currentFilter,
  handleCurrentfilter,
}) => {
  return (
    <div className="flex flex-row absolute top-4 left-0">
      {selectedFilters?.map((item, index) => {
        return (
          <Grow in={!!selectedFilters} timeout={500}>
            <div
              key={index}
              style={{
                display: "flex",
                flexWrap: "wrap",
                paddingInline: 12,
                paddingBlock: 12,
                gap: 10,
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                borderBottom:
                  currentFilter?.name === item?.name
                    ? "3px solid black"
                    : "3px solid #efefef",
              }}
              onClick={() => handleCurrentfilter(item)}
            >
              <div
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  display: "flex",
                  gap: 5,
                }}
              >
                {item?.icon && (
                  <img
                    src={item?.icon}
                    width="24"
                    height="24"
                    className="object-cover"
                    style={{
                      filter: `invert(${
                        item?.name !== currentFilter?.name ? 42 : 4
                      }%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)`,
                    }}
                  />
                )}
                <button
                  style={{
                    color:
                      item?.name === currentFilter?.name ? "black" : "#6b7280",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "capitalize",
                    background: "none",
                    border: "none",
                    font: "inherit",
                    fontSize: 18,
                    fontFamily: "Inter",
                  }}
                >
                  {item?.name}
                </button>
              </div>
              <NumberFlow
                value={
                  item?.name === "all"
                    ? filteredResults?.length || 0
                    : filteredResults?.filter(
                        (res) => res?.filter === item?.name
                      )?.length || 0
                }
                className="bg-gray-200 text-sm text-gray-500 font-bold w-6 h-6 flex items-center justify-center rounded-full"
              />
            </div>
          </Grow>
        );
      })}
    </div>
  );
};

export default RowComponent;
