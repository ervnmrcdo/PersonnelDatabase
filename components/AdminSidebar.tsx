import "../app/globals.css";

type Page =
  | "Home"
  | "Profile"
  | "Account Settings"
  | "To Review"
  | "Faculty"
  | "Students"
  | "Forms"
  | "Crawler"
  | "Database";

interface AdminSidebarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<Page>>;
  active: Page;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  setActiveComponent,
  active,
}) => {
  const buttonStyle = (label: Page): string =>
    `m-[5px] flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition ${
      active === label
        ? "bg-blue-500/20 text-blue-400"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <aside className="h-screen w-18 bg-[#1b1e2b] flex flex-col p-8">
      <div className="flex items-center space-x-2 mb-8">
        <span className="font-semibold text-lg text-gray-400">DCS Records</span>
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
            onClick={() => setActiveComponent("Profile")}
            className={buttonStyle("Profile")}
          >
            <span>Account Settings</span>
          </li>
          <li
            onClick={() => setActiveComponent("To Review")}
            className={buttonStyle("To Review")}
          >
            <span>To Review</span>
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xs uppercase text-gray-500 mb-2">Personnel</h2>
        <ul className="space-y-1">
          <li
            onClick={() => setActiveComponent("Home")}
            className={buttonStyle("Home")}
          >
            <span>Faculty</span>
          </li>
          <li
            onClick={() => setActiveComponent("Profile")}
            className={buttonStyle("Profile")}
          >
            <span>Students</span>
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xs uppercase text-gray-500 mb-2">Settings</h2>
        <ul className="space-y-1">
          <li
            onClick={() => setActiveComponent("Home")}
            className={buttonStyle("Home")}
          >
            <span>Forms</span>
          </li>
          <li
            onClick={() => setActiveComponent("Profile")}
            className={buttonStyle("Profile")}
          >
            <span>Crawler</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
