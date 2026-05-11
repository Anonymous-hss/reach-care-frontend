import './FilterPill.css';

export default function FilterPill({ label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      className={`filter-pill ${isActive ? 'filter-pill--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
