type Props = {
  active?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
};

export default function BoltSvg({
  active = false,
  activeColor = "#D4900A",
  inactiveColor = "#707974",
  className = "",
}: Props) {
  const color = active ? activeColor : inactiveColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      className={className}
      style={{ color }}
    >
      <path
        d="M6.55 16.2L11.725 10H7.725L8.45 4.325L3.825 11H7.3L6.55 16.2ZM4 20L5 13H0L9 0H11L10 8H16L6 20H4Z"
        fill="currentColor"
      />
    </svg>
  );
}
