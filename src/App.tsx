import { useAppSelector } from "./hooks/redux"
import { useApp } from "./hooks/useApp"
import Router from "./routes"
import './styles/main.scss'
import './i18n'

function App() {

  useApp()
  const {isAuth, user: {role}} = useAppSelector(state => state.app)
  const isAdmin = role === "admin"

  return (
    <div>
      <Router isAuth={isAuth} isAdmin={isAdmin} />
    </div>
  )
}

export default App