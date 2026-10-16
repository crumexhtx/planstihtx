import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import type { Destination } from '../types';

export function filterDestinations(
  destinations: readonly Destination[],
  query: string,
): Destination[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [...destinations];
  return destinations.filter((destination) =>
    `${destination.name} ${destination.country}`
      .toLowerCase()
      .includes(normalized),
  );
}

function labelFor(destination: Destination): string {
  return `${destination.name}, ${destination.country}`;
}

export interface DestinationComboboxProps {
  destinations: readonly Destination[];
  value: string;
  onChange: (destinationId: string) => void;
}

export function DestinationCombobox({
  destinations,
  value,
  onChange,
}: DestinationComboboxProps) {
  const listboxId = useId();
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = destinations.find((destination) => destination.id === value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = useMemo(
    () => filterDestinations(destinations, open ? query : ''),
    [destinations, open, query],
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  function choose(destination: Destination) {
    onChange(destination.id);
    setQuery('');
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        matches.length === 0 ? 0 : Math.min(current + 1, matches.length - 1),
      );
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === 'Enter' && open) {
      event.preventDefault();
      const next = matches[activeIndex];
      if (next) choose(next);
      return;
    }
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="destination-combobox" ref={rootRef}>
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && matches[activeIndex]
            ? `${listboxId}-${matches[activeIndex].id}`
            : undefined
        }
        value={open ? query : selected ? labelFor(selected) : ''}
        placeholder="Search cities"
        autoComplete="off"
        onFocus={() => {
          setQuery('');
          setOpen(true);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul className="destination-combobox__list" id={listboxId} role="listbox">
          {matches.length === 0 ? (
            <li className="destination-combobox__empty">No matching cities</li>
          ) : (
            matches.map((destination, index) => (
              <li
                key={destination.id}
                id={`${listboxId}-${destination.id}`}
                role="option"
                aria-selected={destination.id === value}
                className={
                  index === activeIndex
                    ? 'destination-combobox__option is-active'
                    : 'destination-combobox__option'
                }
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(destination)}
                >
                  {labelFor(destination)}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default DestinationCombobox;
