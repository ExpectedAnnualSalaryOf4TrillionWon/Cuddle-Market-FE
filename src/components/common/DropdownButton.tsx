interface DropdownButtonProps {
  label: string;
  onClick: () => void;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-md py-xs my-xs w-full hover:bg-secondary transition rounded-xl text-bodyLarge"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
