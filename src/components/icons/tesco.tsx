import Image from "next/image";

export const Tesco = ({ className }: { className?: string }) => {
  return (
    <Image
      src={"/Tesco_logo.png"}
      width={45}
      height={14}
      alt="Tesco Logo"
      className={`${className}`}
    />
  );
};
