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
      <div className="mainLayout">
        <div className="mainLeftlayout">
          <PostMaker1 />
          <Postcontainer />
        </div>
        <div className="mainRightlayout">
          <Rightbar1 />
        </div>
      </div>
    </>
  );
}

export default feed;
