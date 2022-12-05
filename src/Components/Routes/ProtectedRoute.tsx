import { User } from "@firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: User | null;
  redirectPath?: string;
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = "/login",
  children,
}) => {

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return children;
};

export default ProtectedRoute;
