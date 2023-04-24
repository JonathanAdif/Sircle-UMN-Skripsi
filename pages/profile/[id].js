import ProfileComponent from "@/components/componentPages/profileComponent";
import withProtected from "@/route-protection/protected";

const idprofilePage = () => {


  return <ProfileComponent />;
}

export default withProtected(idprofilePage)
