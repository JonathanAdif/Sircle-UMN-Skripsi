import "@/styles/globals.css";
import "@/styles/swipercontainer.css";
import Head from "next/head";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

// module supabase next
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

// module react time ago (time for post)
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

// context
import { UserContextProvider } from "@/context/userContext";
import { UserProfileContextProvider } from "@/context/globalContext";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <main className="!bg-graybg-sr !font-poppins">
      <Head>
        <title>
          Sircle - Social Community of Multimedia Nusantara University
        </title>
        <link
          rel="icon"
          href="https://xnkmteuovqoshalkgnyc.supabase.co/storage/v1/object/public/sircle-static-aset/favicon.png?t=2023-04-20T14%3A22%3A50.785Z"
        />
        {/* googlefonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <UserContextProvider>
            <UserProfileContextProvider>
              <Component {...pageProps} />
            </UserProfileContextProvider>
          </UserContextProvider>
        </SessionContextProvider>
      </ThemeProvider>
    </main>
  );
}
