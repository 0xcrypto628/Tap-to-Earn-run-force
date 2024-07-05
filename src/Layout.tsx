import { Outlet } from "react-router-dom"
export default function Layout() {
  return (
    <div className="Layout w-full h-full">
        <Outlet />
    </div>
  )
}
