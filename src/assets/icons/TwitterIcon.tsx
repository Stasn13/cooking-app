type TwitterIconProps = {
  className?: string;
};

export const TwitterIcon = ({ className }: TwitterIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_18510_8487)">
        <path
          d="M10.3968 1.75H12.2081L8.2509 6.19769L12.9062 12.25H9.26115L6.40617 8.57931L3.13943 12.25H1.32701L5.55964 7.49269L1.09375 1.75H4.83139L7.41204 5.10515L10.3968 1.75ZM9.76107 11.1838H10.7647L4.28602 2.76015H3.20897L9.76107 11.1838Z"
          fill="#666666"
        />
      </g>
      <defs>
        <clipPath id="clip0_18510_8487">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
