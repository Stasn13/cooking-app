type TrophyIconProps = {
  className?: string;
};

export const TrophyIcon = ({ className }: TrophyIconProps) => {
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
          d="M3 1H11V6C11 8.20914 9.20914 10 7 10C4.79086 10 3 8.20914 3 6V1Z"
          fill="#C99CFF"
        />
        <path d="M3.5 12.5H10.5" stroke="#C99CFF" stroke-width="2" />
        <path
          d="M9.7002 2.7002V8.08398L13.2998 7.1084V2.7002H9.7002Z"
          stroke="#C99CFF"
          stroke-width="1.4"
        />
        <path
          d="M4.2998 2.7002V8.08398L0.700195 7.1084V2.7002H4.2998Z"
          stroke="#C99CFF"
          stroke-width="1.4"
        />
        <path d="M7.14355 9V12" stroke="#C99CFF" stroke-width="2" />
      </svg>
    </svg>
  );
};
