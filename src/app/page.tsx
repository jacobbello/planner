import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  //TODO check if logged in
  redirect("/dashboard");
  return (
    <p>Test</p>
  );
}
