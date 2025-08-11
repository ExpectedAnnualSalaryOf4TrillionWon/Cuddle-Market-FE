type SearchIconProps = {
  size?: number;
  color?: string;
};

const SearchIcon = ({ size = 24, color = '#fff' }: SearchIconProps) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
  </svg>
);

export default SearchIcon;
