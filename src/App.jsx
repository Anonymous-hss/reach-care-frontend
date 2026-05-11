import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  FileText,
  BookMarked,
  Database,
  Bot,
  HardDrive,
  Settings,
} from 'lucide-react';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Pulse from './pages/Pulse';
import PulseActionPage from './pages/Pulse/PulseActionPage';
import Compass from './pages/Compass';
import Ask from './pages/Ask';
import Studio from './pages/Studio';
import Report from './pages/Report';
import PlaceholderPage from './pages/PlaceholderPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pulse" element={<Pulse />} />
          <Route
            path="/pulse/signals/:signalId/action"
            element={<PulseActionPage pageType="take-action" />}
          />
          <Route
            path="/pulse/signals/:signalId/brief"
            element={<PulseActionPage pageType="export-brief" />}
          />
          <Route
            path="/pulse/signals/:signalId/model-impact"
            element={<PulseActionPage pageType="model-impact" />}
          />
          <Route
            path="/pulse/signals/:signalId/rerun-compass"
            element={<PulseActionPage pageType="rerun-compass" />}
          />
          <Route path="/compass" element={<Compass />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/reports" element={<Report />} />
          
          {/* Workspace & System placeholders */}
          <Route
            path="/scenarios"
            element={
              <PlaceholderPage
                icon={FileText}
                title="Scenarios"
                subtitle="Manage your saved scenarios"
              />
            }
          />
          <Route
            path="/briefs"
            element={
              <PlaceholderPage
                icon={BookMarked}
                title="Briefs"
                subtitle="Exportable decision briefs"
              />
            }
          />
          <Route
            path="/evidence"
            element={
              <PlaceholderPage
                icon={Database}
                title="Evidence"
                subtitle="Source evidence library"
              />
            }
          />
          <Route
            path="/agents"
            element={
              <PlaceholderPage
                icon={Bot}
                title="Agents"
                subtitle="Agent monitoring and status"
              />
            }
          />
          <Route
            path="/sources"
            element={
              <PlaceholderPage
                icon={HardDrive}
                title="Sources"
                subtitle="Data source management"
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                icon={Settings}
                title="Settings"
                subtitle="System configuration"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
