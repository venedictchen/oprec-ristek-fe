import { AuthContextProvider, SidebarProvider } from "@/components/contexts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <SidebarProvider>
        
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthContextProvider>
  );
}
