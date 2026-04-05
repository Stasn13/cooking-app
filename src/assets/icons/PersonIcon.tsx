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
      <path
        d="M7.00027 7.54545C8.80774 7.54545 10.273 6.0802 10.273 4.27273C10.273 2.46525 8.80774 1 7.00027 1C5.19279 1 3.72754 2.46525 3.72754 4.27273C3.72754 6.0802 5.19279 7.54545 7.00027 7.54545Z"
        stroke="#666666"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13 13C13 9.98752 10.3137 7.54544 7 7.54544C3.68629 7.54544 1 9.98752 1 13"
        stroke="#666666"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </svg>
  );
};
