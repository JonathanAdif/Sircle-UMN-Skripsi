import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Postcontainer from "@/components/postcontainer/postcontainer";
import Rightbar2 from "@/components/rightbar/rightbar2";
import ProfileBanner from "@/components/banner/profileBanner";

function profilePage() {
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

export default profilePage;
