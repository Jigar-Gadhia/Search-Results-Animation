import React, { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Fade, TextField } from "@mui/material";
import useSearch from "./utils/useSearch";
import { isEmpty } from "lodash";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FolderIcon from "@mui/icons-material/Folder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FilterPopupMenu from "./components/FilterPopupMenu";
import { KeyCap } from "./components/KeyCap";
import RowComponent from "./components/RowComponent";
import SettingsComponent from "./components/SettingsComponent";
import LoaderComponent from "./components/LoaderComponent";
import { ResultsComponent } from "./components/ResultsComponent";
import { Colors } from "./data/mockData";

const App = () => {
  const {
    query,
    setQuery,
    filters,
    toggleFilter,
    filteredResults,
    handleCopyLink,
    isLoading,
    handleCurrentfilter,
    handleClear,
    currentFilter,
  } = useSearch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [transitionSpeed, setTransitionSpeed] = useState("0.5s");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tooltipTitle, setTooltipTitle] = useState("Copy link");
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const selectedFilters = filters?.filter((res) => res?.status);
  const menuFilters = filters?.filter((res) => res?.name !== "all");
  const selectedFilterResults =
    currentFilter?.name !== "all"
      ? filteredResults?.filter((res) => res?.filter === currentFilter?.name)
      : filteredResults;
  const Icons = {
    folder: FolderIcon,
    image: PhotoSizeSelectActualIcon,
    video: PlayArrowIcon,
    chat: ChatBubbleIcon,
  };
  const STATUS_COLORS = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  const handleClearClick = useCallback(() => {
    setTransitionSpeed("0.5s"); // Fast collapse
    setIsExpanded(false);
    setTimeout(() => {
      handleClear();
    }, 100);
  }, [handleClear]);

  useEffect(() => {
    if (query) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [query]);

  const handleQueryChange = (value) => {
    setQuery(value);
    if (value) {
      setIsExpanded(true);
    }
  };

  const onEnter = (index) => {
    setCurrentIndex(index);
    setIsHover(true);
  };
  const onExit = () => {
    setCurrentIndex(-1);
    setIsHover(false);
    setTooltipTitle("Copy link");
  };

  const copyTitle = () => {
    setTooltipTitle("✓ Link copied");
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="rounded-2xl shadow-md p-4 w-180 flex-col items-stretch bg-white gap-2.5 transition-all duration-2000 ease-in">
        {/* Search Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder="Searching is easier"
          value={query}
          onChange={(e) => {
            handleQueryChange(e.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <div style={{ marginRight: 10, marginBottom: 5 }}>
                {isLoading ? (
                  <Fade in={isLoading} key={`${isLoading}`} timeout={800}>
                    <CircularProgress
                      size={25}
                      sx={{ marginTop: 1, color: "#bdbdbd" }}
                      thickness={6}
                    />
                  </Fade>
                ) : (
                  <Fade in={!isLoading} timeout={800} key={`${isLoading}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 16 16"
                      fill="#bbbbbb"
                    >
                      <path d="M13.438,15.563l-2.665-2.664 C9.684,13.598,8.388,14.002,7,14.002c-3.865,0-7-3.135-7-7c0-3.864,3.135-7,7-7c3.864,0,7,3.136,7,7 c0,1.391-0.407,2.687-1.105,3.776l2.665,2.664c0.585,0.585,0.585,1.536,0,2.121C14.974,16.148,14.024,16.148,13.438,15.563z M12,7.002c0-2.759-2.241-5-5-5c-2.76,0-5,2.241-5,5c0,2.76,2.24,5,5,5C9.759,12.002,12,9.762,12,7.002z"></path>
                    </svg>
                  </Fade>
                )}
              </div>
            ),
            endAdornment: query ? (
              <Fade in={isExpanded} timeout={500} key={`${isExpanded}`}>
                <button
                  style={{
                    borderBottom: "2px solid black",
                    fontWeight: "bold",
                  }}
                  onClick={handleClearClick}
                  className="cursor-pointer"
                >
                  Clear
                </button>
              </Fade>
            ) : (
              <Fade in={!isExpanded} timeout={500} key={`${isExpanded}`}>
                <div className="w-58 flex flex-row items-center gap-4">
                  <KeyCap label={"s"} />
                  <span className="text-gray-400">quick access</span>
                </div>
              </Fade>
            ),
          }}
          sx={{
            borderRadius: 2,
            px: 1,
            py: 0.5,
            "& .MuiInputBase-input": {
              fontSize: 28,
              letterSpacing: -1,
            },
          }}
        />

        {/* Expandable section */}
        <div
          style={{
            height: isExpanded ? "400px" : "0px",
            opacity: isExpanded ? 1 : 0,
            width: "100vh",
            overflow: "auto",
            transition: `height ${transitionSpeed} ease-in-out, opacity ${transitionSpeed} ease-in-out`,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            willChange: "height, opacity",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // flexWrap: "wrap",
              position: "fixed",
              backgroundColor: "white",
              justifyContent: "space-between",
              borderBottom: `3px solid ${Colors.borderColor}`,
              width: "43rem",
              zIndex: 1,
              paddingLeft: 1,
              paddingTop: 0.3,
            }}
          >
            <RowComponent
              currentFilter={currentFilter}
              filteredResults={filteredResults}
              handleCurrentfilter={handleCurrentfilter}
              selectedFilters={selectedFilters}
            />
            <SettingsComponent
              handleSettingsClick={handleSettingsClick}
              open={open}
            />
          </Box>
          <div className="mt-5 gap-6 flex flex-col pt-20 pl-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => {
                return <LoaderComponent key={index} />;
              })
            ) : isEmpty(filteredResults) ? (
              <Fade in={!isLoading} timeout={500} key={currentFilter?.name}>
                <div className="flex items-center justify-center h-64 w-full">
                  <h1>No Data Found!</h1>
                </div>
              </Fade>
            ) : (
              <ResultsComponent
                FormatListBulletedIcon={FormatListBulletedIcon}
                Icons={Icons}
                STATUS_COLORS={STATUS_COLORS}
                copyTitle={copyTitle}
                currentFilter={currentFilter}
                currentIndex={currentIndex}
                handleCopyLink={handleCopyLink}
                isHover={isHover}
                isLoading={isLoading}
                onEnter={onEnter}
                onExit={onExit}
                selectedFilterResults={selectedFilterResults}
                tooltipTitle={tooltipTitle}
              />
            )}
          </div>
        </div>
        <FilterPopupMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleSettingsClick}
          filters={menuFilters}
          onFilterToggle={toggleFilter}
        />
      </div>
    </Box>
  );
};

export default App;
