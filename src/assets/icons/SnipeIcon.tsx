type SnipeIconProps = {
  className?: string;
};

export const SnipeIcon = ({ className }: SnipeIconProps) => {
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
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0C10.8663 2.57652e-07 14 3.13367 14 7C14 10.8663 10.8663 14 7 14C3.13367 14 2.5766e-07 10.8663 0 7C0 3.13367 3.13367 0 7 0ZM6.2002 12.7783H7.7998V9.66699H6.2002V12.7783ZM7.00098 6C6.44864 6 6.00098 6.44767 6.00098 7C6.00098 7.55233 6.44864 8 7.00098 8C7.55331 8 8.00098 7.55233 8.00098 7C8.00098 6.44767 7.55331 6 7.00098 6ZM1.61133 6.2002V7.7998H4.72266V6.2002H1.61133ZM9.27734 7.7998H12.3887V6.2002H9.27734V7.7998ZM6.2002 4.66699H7.7998V1.55566H6.2002V4.66699Z"
          fill="#83F0FF"
        />
      </svg>
    </svg>
  );
};
