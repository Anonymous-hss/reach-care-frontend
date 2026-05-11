import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './PageLayout.css';

export default function PageLayout() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
