type CopyIconProps = {
  className?: string;
};

export const CopyIcon = ({ className }: CopyIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 9.4H2C1.44772 9.4 1 8.95228 1 8.4V2C1 1.44772 1.44772 1 2 1H8.4C8.95228 1 9.4 1.44772 9.4 2V4"
        stroke="#999999"
        stroke-width="1.6"
      />
      <rect
        x="4.59961"
        y="4.6001"
        width="8.4"
        height="8.4"
        rx="1"
        stroke="#999999"
        stroke-width="1.6"
      />
    </svg>
  );
};
