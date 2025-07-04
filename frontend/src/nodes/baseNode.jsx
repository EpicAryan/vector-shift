//baseNode.jsx

export const BaseNode = ({ title, children, className }) => {
  const defaultClasses = "w-52 bg-white border border-neutral-300 rounded-lg shadow-md";
  const combinedClasses = `${defaultClasses} ${className || ''}`;

  return (
    <div className={combinedClasses.trim()}>
      <div className="p-2 bg-slate-100/70 border-b border-neutral-300 rounded-t-lg">
        <strong className="text-sm font-semibold text-gray-700">{title}</strong>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};
