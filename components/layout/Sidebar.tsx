import { user } from "@/demo/account"
import { sidebar } from "@/demo/sidebar"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { memo } from "react"

const Sidebar = () => {

    const router = useRouter()

    return (
        <aside className="flex flex-col fixed bg-slate-300 pt-20 h-screen w-64 p-3">

            <h4 className="text-xl font-bold text-center mt-4">Welcome back, <br /> {user.name} {user.surname}</h4>

            <ul className="flex flex-col mt-4">
                {
                    sidebar.map(menubar => (
                        <li className={`rounded-md hover:bg-slate-400 mt-1 ${router.query.slug === menubar.route ? "bg-slate-400" : ""}`} key={menubar.route}>
                            <Link 
                                className="flex items-center text-lg text-slate-800 p-3"
                                href={`/dashboard/${menubar.route}`}
                            >
                                <Icon width={25} icon={menubar.icon} /> {menubar.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}

export default memo(Sidebar)