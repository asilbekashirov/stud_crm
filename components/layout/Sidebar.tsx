import { user } from "@/demo/account";
import { sidebar } from "@/demo/sidebar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="flex flex-col fixed bg-primary-900 pt-20 h-screen w-64 p-3">
      <h4 className="text-xl font-bold text-center mt-4 text-secondary">
        Welcome back, <br /> {user.name} {user.surname}
      </h4>

      <ul className="flex flex-col mt-4">
        {sidebar.map((menubar) => (
          <li
            className={`rounded-lg hover:bg-primary-1000 mt-1 ${
              router.route === `/dashboard/${menubar.route}` ? "bg-primary-1000" : ""
            }`}
            key={menubar.route}
          >
            <Link
              className="flex items-center text-lg text-slate-100 p-3"
              href={`/dashboard/${menubar.route}`}
            >
              <div className="p-2 mr-2 rounded-xl bg-slate-100 text-slate-800">
                <Icon width={25} icon={menubar.icon} />
              </div>{" "}
              {menubar.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default memo(Sidebar);
