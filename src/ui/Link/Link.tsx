import "./Link.scss";

interface LinkProps {
  className?: string;
  label: string;
  isDisabled?: boolean;
  size?: "big" | "small";
  href: string;
}

const Link = ({
  className,
  label,
  href,
  size = "small",
  isDisabled = false,
}: LinkProps) => {
  return (
    <a
      href={href}
      className={`${className} button button__${size} ${
        isDisabled && "button__disabled"
      }`}
    >
      {label}
    </a>
  );
};

export default Link;
