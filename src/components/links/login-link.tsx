import Link from "next/link";
import { Button } from "../ui/button";

export const LoginLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link href={"/login"}>
      <Button variant="ghost" onClick={onClick}>
        Log in
      </Button>
    </Link>
  );
};
