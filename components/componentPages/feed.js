import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PostMaker1 from "../postmaker/postMaker1";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar1 from "../rightbar/rightbar1";

function feed() {
  return (
    <>
      <Header />
      <Sidebar />
      <fragment className="mainLayout">
        <fragment className="mainLeftlayout">
          <PostMaker1 />
          <Postcontainer />
        </fragment>
        <fragment className="mainRightlayout">
          <Rightbar1 />
        </fragment>
      </fragment>
    </>
  );
}

export default feed;
