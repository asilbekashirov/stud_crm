// import { user } from "@/demo/account";
import { sidebar } from "@/demo/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { user, isAuth } = useAppSelector((state) => state.app);

  return (
    <aside className="flex flex-col fixed bg-primary-900 pt-20 h-screen w-64 p-3">
      {isAuth ? (
        <h4 className="text-xl text-gray-800 font-bold text-center mt-4 text-secondary">
          Welcome back, <br /> {user.fullName}
        </h4>
      ) : (
        <p className="text-center text-lg">Please, authorize to get access to all sections</p>
      )}

      <ul className="flex flex-col mt-4">
        {sidebar.map((menubar) => (
          <li
            className={`rounded-lg hover:bg-primary-1000 hover:text-gray-100 mt-1 ${
              router.route === `/dashboard/${menubar.route}`
                ? "bg-primary-1000 text-gray-100"
                : "text-gray-600"
            }`}
            key={menubar.route}
          >
            <Link
              className="flex items-center text-lg p-2"
              href={`/dashboard/${menubar.route}`}
            >
              <div className="p-1 mr-2 rounded-xl bg-slate-100 text-slate-800">
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
