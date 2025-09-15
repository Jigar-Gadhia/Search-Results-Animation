export const KeyCap = ({ label }) => {
  return (
    <div
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl 
                    border-2 border-gray-300 bg-white text-gray-400 font-medium 
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] 
                    shadow-lg"
    >
      {label}
    </div>
  );
};
