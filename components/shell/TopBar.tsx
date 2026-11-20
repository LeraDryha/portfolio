import { Icon } from "@/components/shell/Icons";

const FILTERS = [
  ["all", "All"],
  ["about", "About"],
  ["work", "Work"],
  ["writing", "Writing"],
] as const;

/** Top bar: the mark (back to top), the tile filter, motion and theme switches. Behaviour lives in HomeBehavior. */
export function TopBar() {
  return (
    <header className="top">
      <a className="skip" href="#main">
        Skip to work
      </a>
      <a className="mark" href="/" aria-label="Lera Starychenko, home">
        <Icon name="mark" />
      </a>
      <nav className="filter" aria-label="Show">
        {FILTERS.map(([key, label]) => (
          <button className="filter__btn" type="button" key={key} data-filter={key} aria-pressed={key === "all"}>
            {label}
          </button>
        ))}
      </nav>
      <div className="top__end">
        {/* Pauses every animation on the site (remembered); with reduced motion it starts paused */}
        <button className="motion" type="button" data-motion-toggle aria-pressed="false" aria-label="Pause animations" title="Pause animations">
          <Icon name="pause" />
        </button>
        <button className="theme" type="button" data-theme-toggle aria-label="Theme: auto">
          <Icon name="auto" />
          <span>Auto</span>
        </button>
      </div>
    </header>
  );
}
