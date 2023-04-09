import { RootState } from "@/redux/store/store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function Home() {

  const {isAuth} = useSelector((state: RootState) => state.app)
  const router = useRouter()

  useEffect(() => {
    router.push("/auth")
  }, [])

  return null
}