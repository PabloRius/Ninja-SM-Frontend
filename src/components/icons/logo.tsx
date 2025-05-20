import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src={"/Logo.png"}
      width={64}
      height={64}
      alt="SM Ninja Logo"
      className={`${className}`}
    />
  );
};
