import { Search, Bell } from 'lucide-react';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__search">
        <Search size={16} className="topbar__search-icon" />
        <input
          type="text"
          className="topbar__search-input"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <button className="topbar__notification" aria-label="Notifications">
        <Bell size={18} />
      </button>
    </div>
  );
}
