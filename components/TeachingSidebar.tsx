import { useRouter } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import "../app/globals.css";

type TeachingPage =
  | "Home"
  | "Profile"
  | "Publications"
  | "Awards"
  | "Documents";
interface TeachingSidebarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<TeachingPage>>;
  active: TeachingPage;
}

const TeachingSidebar: React.FC<TeachingSidebarProps> = ({
  setActiveComponent,
  active,
}) => {
  const buttonStyle = (label: TeachingPage): string =>
    `m-[5px] flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition ${
      active === label
        ? "bg-blue-500/20 text-blue-400"
        : "hover:bg-gray-700 text-gray-300"
    }`;
  const router = useRouter();

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <aside className="h-screen w-18 bg-[#1b1e2b] flex flex-col p-8">
      <div className="flex items-center space-x-2 mb-8">
        <span
          className="font-semibold text-lg text-gray-400"
          onClick={() => router.push("/teaching-home")}
        >
          DCS Records
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xs uppercase text-gray-500 mb-2">Personal</h2>
        <ul className="space-y-1">
          <li
            onClick={() => setActiveComponent("Home")}
            className={buttonStyle("Home")}
          >
            <span>Home</span>
          </li>
          <li
            onClick={() => setActiveComponent("Profile")}
            className={buttonStyle("Profile")}
          >
            <span>Profile</span>
          </li>
          <li
            onClick={() => setActiveComponent("Publications")}
            className={buttonStyle("Publications")}
          >
            <span>Publications</span>
          </li>
          <li
            onClick={() => setActiveComponent("Awards")}
            className={buttonStyle("Awards")}
          >
            <span>Awards</span>
          </li>
          <li
            onClick={() => setActiveComponent("Documents")}
            className={buttonStyle("Documents")}
          >
            <span>Documents</span>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default TeachingSidebar;
