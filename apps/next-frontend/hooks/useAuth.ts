import { usePathname, useRouter } from "next/navigation";
import userAuthStore from "../lib/features/userAuth/userAuthStore";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, setLoading } = userAuthStore();
  useEffect(() => {
    const publicRoutes = ["/signin", "/signup", "/"];
    if (publicRoutes.includes(pathname)) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [router, pathname]);
  return loading;
};

export default useAuth;
