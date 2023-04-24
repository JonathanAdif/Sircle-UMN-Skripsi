import Home from "@/components/componentPages/login";
import withunProtected from "@/route-protection/unprotected";

const LoginPage  = () =>  {

  return <Home />;
}

export default withunProtected(LoginPage) 
