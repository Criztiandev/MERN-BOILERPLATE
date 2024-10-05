/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@/feature/shared/interface";
import useAccountStore from "@/feature/shared/store/useAccountStore";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends PropsWithChildren {
  allowedRoutes: Array<string>;
}

const ProtectedRoutes: FC<Props> = ({ allowedRoutes, children }) => {
  const { credentials } = useAccountStore();
  const navigate = useNavigate();

  // Check if the user exist
  useEffect(() => {
    if (credentials === null) {
      navigate("/");
    }
  }, [credentials]);

  // check of allowed roles
  if (
    credentials ||
    (allowedRoutes &&
      !allowedRoutes.includes((credentials as unknown as User)?.role))
  ) {
    return <div>Permission denied</div>;
  }

  return children;
};

export default ProtectedRoutes;
