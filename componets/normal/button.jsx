// components/Button.jsx
import Link from 'next/link';

const base =
  "bg-[#8b2727] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#d2af6f] transition-colors duration-200 flex items-center justify-center space-x-2 group cursor-pointer hover:text-black";

export default function Button({ href, children, className = "", ...props }) {
  const classes = `${base} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
