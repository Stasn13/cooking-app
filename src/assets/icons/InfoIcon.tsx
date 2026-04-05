type InfoIconProps = {
  className?: string;
};

export const InfoIcon = ({ className }: InfoIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.7998 14.8V14.8C3.93347 14.8 0.799805 11.6663 0.799805 7.8V7.8C0.799805 3.93367 3.93347 0.800003 7.7998 0.800003V0.800003C11.6661 0.800003 14.7998 3.93367 14.7998 7.8V7.8C14.7998 11.6663 11.6661 14.8 7.7998 14.8Z"
        stroke="#666666"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.79583 3.79961C7.24384 3.79961 6.79585 4.24761 6.79985 4.79961C6.79985 5.35161 7.24784 5.79961 7.79983 5.79961C8.35182 5.79961 8.79982 5.35161 8.79982 4.79961C8.79982 4.24761 8.35182 3.79961 7.79583 3.79961Z"
        fill="#666666"
      />
      <path
        d="M7.7998 6.92509V12.1751"
        stroke="#666666"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};
