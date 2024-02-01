import { init as initApm } from "@elastic/apm-rum";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useLocation, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import { CommentProvider } from './context/CommentsContext/CommentsContext';
// import { ActionProvider } from './context/actionContext/ActionProvider';
// import RootRouter from './router/rootRouter';
// import { StoreProvider } from './store/ContextStore';
// import LightTheme from './theme/lightTheme';
// import { DefaultLocale } from './utils/constants';
import { DefaultLocale, getCurrentLang } from "@platformx/utilities";
import Analytics from "./utils/analytics/analyticsData";
import { analyticsInstance } from "./utils/analytics/dynamicAnalytics";

unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

initApm({
  // This will disable APM
  active: process.env?.NX_APM_TRACING === "true" || false,
  // Set required service name
  serviceName: "platormx-authoring-ui-service",
  // Set custom APM Server URL
  serverUrl: process.env.NX_APM_SERVER_URL,
  //The environment where the service being monitored is deployed (e.g. "production", "development")
  environment: process.env.NX_APM_ENVIRONMENT,
  distributedTracing: true,
  distributedTracingOrigins: (process.env?.NX_APM_TRACING_ORIGINS || "").split(","),
  logLevel: "debug",
});

function App() {
  const { i18n } = useTranslation();
  const [, setLanguage] = useState(DefaultLocale);
  const [, setInstances] = useState<any>({});

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const analytics = await analyticsInstance(Analytics);
        setInstances(analytics);

        const lang = getCurrentLang();
        if (lang) {
          setLanguage(lang);
          i18n.changeLanguage(lang);
        }
      } catch (error: any) {
        console.error("Error during initialization:", error);
        console.error("Error details:", error?.stack || error?.message || error);
      }
    };
    initializeApp();
  }, []);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <div className='App'>
        <h1>authoring app is running fine</h1>
      </div>
    </Suspense>
  );
}

export default App;
