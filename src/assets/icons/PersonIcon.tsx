type PersonIconProps = {
  className?: string;
};

export const PersonIcon = ({ className }: PersonIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6.5 18.5C6.5 15.74 8.96 13.5 12 13.5C15.04 13.5 17.5 15.74 17.5 18.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
