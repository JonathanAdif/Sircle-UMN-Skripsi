import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Postcontainer from "../postcontainer/postcontainer";
import Rightbar2 from "../rightbar/rightbar2";
import ProfileBanner from "../banner/profileBanner";

function profileComponent() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="mainLayout2">
        <ProfileBanner />
        <div className="flex flex-row gap-5">
          <div className="mainLeftlayout">
            <Postcontainer />
          </div>
          <div className="mainRightlayout">
            <Rightbar2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default profileComponent;
