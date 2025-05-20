import Link from "next/link";
import { Button } from "../ui/button";

export const RegisterLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link href="/register">
      <Button onClick={onClick}>Register</Button>
    </Link>
  );
};
