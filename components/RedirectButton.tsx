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
  const buttonStyles = color === 'red' 
    ? "bg-red-600 hover:bg-red-700 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white";
  return <button onClick={() => router.push(`/${directTo}`)} className={`${buttonStyles} px-4 py-2 rounded-lg transition font-semibold`}>{label}</button>;
}
