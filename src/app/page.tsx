import { redirect } from "next/navigation";

export default function Home() {
  redirect('/admin')
  return (
    <div>Home</div>
  );
}
