import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const useTitle = (title) => {
  const location = useLocation();
  return useEffect(() => {
    document.title = title;
  }, [location, title]);
};
