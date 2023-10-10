import {Navigate, Outlet} from 'react-router-dom'

export default function Private({ logout}) {
    if (!localStorage.getItem("token")) {
        logout()
        return <Navigate to="/user/login" />
      } else {
     
return <Outlet />
       
      }


}