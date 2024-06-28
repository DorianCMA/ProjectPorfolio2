import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import propTypes from "prop-types";
import AuthContext from "../components/AuthContext";

const ProtectedRouter = ({ children }) => {
  const { token } = useContext(AuthContext);

  // Obtenemos la ubicación actual
  const location = useLocation();
  const { pathname } = location;

  // Definimos las rutas protegidas y públicas
  const protectedRoutes = [
    "/allemployees",
    "/employees",
    "/employeesdetails",
    "/createemployees",
    "/editemployees",
    "/salarygeneral",
    "/departmentcreation",
    "/department",
    "/benefistcalculator",
    "/reprimanddetails",
    "/reprimandmanagement",
    "/aguinaldocalculator",
    "/vacationcalculation",
    "/simplebarcharts",
    "/departmentdetails",
    "/faultmanagement",
    "/editdepartment",
    "/salaryliquidationcalculator",
    "/faultsdetails",
  ];

  const publicRoutes = [
    "/login",
    "/forgotpassword",
    "/register",
    "/resetpassword",
    "/noPage",
  ];

  // Verificamos si la ruta actual está protegida o pública
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  
  // Si no hay token, redirigimos a la página de inicio de sesión
  if (!token) {
    return <Navigate to="/login" />;
    }
    
    
    
    // Si la ruta está protegida y hay un token, permitimos el acceso
    if (isProtectedRoute) {
      return <>{children ? children : <Outlet />}</>;
      }
      
      // Si la ruta es pública, siempre permitimos el acceso
      if (isPublicRoute) {
        return <>{children ? children : <Outlet />}</>;
      }

  // Si la ruta no está definida, redirigimos a una página de error
  return <Navigate to="/noPage" />;
};

ProtectedRouter.propTypes = {
  children: propTypes.node,
};

export default ProtectedRouter;
