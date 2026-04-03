type LayerIconProps = {
  className?: string;
};

export const LayerIcon = ({ className }: LayerIconProps) => {
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
        d="M7 14L0.5 8.85564L1.69167 7.93701L7 12.126L12.3083 7.93701L13.5 8.85564L7 14ZM7 10.2887L0.5 5.14436L7 0L13.5 5.14436L7 10.2887Z"
        fill="#FFE669"
      />
    </svg>
  );
};
