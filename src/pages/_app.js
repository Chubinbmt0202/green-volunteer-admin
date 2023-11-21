import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

const clientSideEmotionCache = createEmotionCache();



const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Green Volunteer</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RecoilRoot>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </ThemeProvider>
          </AuthProvider>
        </RecoilRoot>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
