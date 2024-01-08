import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.loggedIn) {
      navigate("/signin");
    }
  });
  return <Outlet />;
}

export default ProtectedRoute;
