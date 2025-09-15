import React from "react";

export const SettingsComponent = ({ handleSettingsClick, open }) => {
  return (
    <div className="flex items-center justify-end py-3 ml-auto">
      <button
        className={`p-2 rounded-full transition-transform duration-200 cursor-pointer ${
          open ? "rotate-90" : "rotate-0"
        }`}
        onClick={handleSettingsClick}
      >
        <img
          src="https://img.icons8.com/material-outlined/24/settings--v3.png"
          alt="settings--v3"
          className="w-6 h-6 object-cover focus:rotate-45 transition-transform duration-300"
          style={{
            filter:
              "invert(60%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)",
          }}
        />
      </button>
    </div>
  );
};

export default SettingsComponent;
