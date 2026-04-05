type LightningIconProps = {
  className?: string;
};

export const LightningIcon = ({ className }: LightningIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 18L16 7.30769H10.3158L13.7608 3H5.72249L4 11.0258L8.01914 11L4 18Z"
        fill="#FFE669"
      />
    </svg>
  );
};
