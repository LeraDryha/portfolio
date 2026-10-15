import { Icon } from "@/components/shell/Icons";

const FILTERS = [
  ["all", "All"],
  ["about", "About"],
  ["work", "Work"],
  ["writing", "Writing"],
] as const;

/** Top bar: the mark (back to top), the tile filter, the theme switch. Behaviour lives in HomeBehavior. */
export function TopBar() {
  return (
    <header className="top">
      <a className="mark" href="/" aria-label="Lera Dryha, home">
        <Icon name="mark" />
      </a>
      <nav className="filter" aria-label="Show">
        {FILTERS.map(([key, label]) => (
          <button className="filter__btn" type="button" key={key} data-filter={key} aria-pressed={key === "all"}>
            {label}
          </button>
        ))}
      </nav>
      <button className="theme" type="button" data-theme-toggle aria-label="Theme: auto">
        <Icon name="auto" />
        <span>Auto</span>
      </button>
    </header>
  );
}
