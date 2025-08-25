interface DropdownButtonProps {
  label: string;
  onClick: () => void;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className=" w-full py-sm cursor-pointer leading-none hover:bg-secondary transition rounded-sm text-bodyLarge"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
