type WebIconProps = {
  className?: string;
};

export const WebIcon = ({ className }: WebIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="7" cy="7" r="6" stroke="#666666" />
      <ellipse cx="7" cy="7" rx="3" ry="6" stroke="#666666" />
      <line x1="0.5" y1="7.10001" x2="12.5" y2="7.10001" stroke="#666666" />
    </svg>
  );
};
