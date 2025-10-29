"use client";
import { useRouter } from "next/navigation";

interface ButtonProps {
  label: string;
  color: string;
  directTo: string;
}
export default function RedirectButton({
  label,
  color,
  directTo,
}: ButtonProps) {
  const router = useRouter();
  return <button onClick={() => router.push(`/${directTo}`)}>{label}</button>;
}
