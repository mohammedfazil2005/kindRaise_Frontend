import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toaster } from "../services/Toaster";

type AllowedRole = {
  allowedRoles: string[];
};

const ProtectedRoutes = ({ allowedRoles }: AllowedRole) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const hasRun = useRef(false); // 👈 important

  useEffect(() => {
    if (hasRun.current) return; // 🚫 stop second run
    hasRun.current = true;

    if (!role) {
      toaster("You need to sign in to access this page.");
      navigate("/login", { replace: true });
    } else if (!allowedRoles.includes(role)) {
      toaster("You don’t have permission to access this page");
      navigate("/", { replace: true });
    }
  }, [role, allowedRoles, navigate]);

    if (!role || !allowedRoles.includes(role)) {
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoutes;