const StairsDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"    
    className={`icon icon-tabler icons-tabler-outline icon-tabler-stairs-down ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M22 21h-5v-5h-5v-5h-5v-5h-5" />
    <path d="M18 3v7" />
    <path d="M15 7l3 3l3 -3" />
  </svg>
);

export default StairsDownIcon;
