import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MyAppProps } from "@/layouts/Types";
import { Layouts } from "@/layouts/Layouts";
import FullLayout from "@/layouts/FullLayout";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] || FullLayout; // ?? ((page) => page)
  return (
    <>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
