import EventComponentPage from "@/components/pagesComponent/eventComponent";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";

function EventPage() {
  const session = useSession();

  if (!session) {
    return <LoginPage />;
  }

  return <EventComponentPage />;
}

export default EventPage;
