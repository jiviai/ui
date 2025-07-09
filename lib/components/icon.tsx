export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string; // the ligature name, like "home" or "search"
  size?: string; // optional: "24px", "1.5rem", etc.
}

export const Icon = ({
  name,
  size = "24px",
  className = "",
  ...props
}: IconProps) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size }}
      {...props}
    >
      {name}
    </span>
  );
};
