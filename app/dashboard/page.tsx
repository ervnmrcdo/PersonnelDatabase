import RedirectButton from "@/components/RedirectButton";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div>
      <RedirectButton
        label={"Admin"}
        color={"green"}
        directTo={"admin-home"}
      ></RedirectButton>
      <RedirectButton
        label={"Teaching"}
        color={"green"}
        directTo={"teaching-home"}
      ></RedirectButton>
      <RedirectButton
        label={"NonTeaching"}
        color={"green"}
        directTo={"nonteaching-home"}
      ></RedirectButton>
    </div>
  );
} 
