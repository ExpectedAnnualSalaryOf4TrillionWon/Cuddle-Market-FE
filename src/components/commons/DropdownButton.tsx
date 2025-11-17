interface DropdownButtonProps {
  label: string;
  onClick: () => void;
}

export function DropdownButton({ label, onClick }: DropdownButtonProps) {
  return (
    <button
      className=" w-full py-sm cursor-pointer leading-none hover:bg-secondary transition rounded-sm text-bodyRegular"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
