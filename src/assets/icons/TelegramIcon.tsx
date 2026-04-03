type TelegramIconProps = {
  className?: string;
};

export const TelegramIcon = ({ className }: TelegramIconProps) => {
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
        d="M12.3277 1.87476L0.440958 6.35354C-0.0373815 6.5621 -0.199173 6.9798 0.325323 7.20647L3.37482 8.15336L10.748 3.701C11.1506 3.42148 11.5628 3.49602 11.2081 3.80349L4.87551 9.40582L4.67658 11.7767C4.86084 12.1428 5.1982 12.1445 5.41339 11.9626L7.16541 10.3428L10.166 12.5382C10.8629 12.9413 11.2421 12.6812 11.3921 11.9423L13.3602 2.83656C13.5645 1.92703 13.216 1.5263 12.3277 1.87476Z"
        fill="#666666"
      />
    </svg>
  );
};
