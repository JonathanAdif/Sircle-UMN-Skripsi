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
      <fragment className="mainLayout2">
        <ProfileBanner />
        <fragment className="flex flex-row gap-5">
          <fragment className="mainLeftlayout">
            {/* <Postcontainer /> */}
          </fragment>
          <fragment className="mainRightlayout">
            <Rightbar2 />
          </fragment>
        </fragment>
      </fragment>
    </>
  );
}

export default profileComponent;
