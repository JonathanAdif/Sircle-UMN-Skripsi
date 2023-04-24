import Feed from "@/components/componentPages/feed";
import withProtected from "@/route-protection/protected";

const Index = () =>  {
 
  return <Feed />;
}

export default withProtected(Index)
