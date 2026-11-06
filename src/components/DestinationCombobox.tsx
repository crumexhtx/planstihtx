import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react';
import type { Destination } from '../types';

export function foldSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function filterDestinations(
  destinations: readonly Destination[],
  query: string,
  limit?: number,
): Destination[] {
  const normalized = foldSearchText(query).trim();
  const matches = !normalized
    ? [...destinations]
    : destinations.filter((destination) =>
        foldSearchText(`${destination.name} ${destination.country}`).includes(
          normalized,
        ),
      );
  return typeof limit === 'number' ? matches.slice(0, limit) : matches;
}

function labelFor(destination: Destination): string {
  return `${destination.name}, ${destination.country}`;
}

export interface DestinationComboboxProps {
  destinations: readonly Destination[];
  value: string;
  onChange: (destinationId: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  maxResults?: number;
  showBaseline?: boolean;
  emptyContent?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
}

export function DestinationCombobox({
  destinations,
  value,
  onChange,
  placeholder = 'Search cities',
  ariaLabel,
  maxResults,
  showBaseline = false,
  emptyContent = 'No matching cities',
  inputRef,
  className,
}: DestinationComboboxProps) {
  const listboxId = useId();
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = destinations.find((destination) => destination.id === value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = useMemo(
    () =>
      filterDestinations(destinations, open ? query : '', maxResults),
    [destinations, open, query, maxResults],
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
      const next = matches[activeIndex] ?? matches[0];
      if (next) choose(next);
      return;
    }
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const rootClassName = className
    ? `destination-combobox ${className}`
    : 'destination-combobox';

  return (
    <div className={rootClassName} ref={rootRef}>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && matches[activeIndex]
            ? `${listboxId}-${matches[activeIndex].id}`
            : undefined
        }
        value={open ? query : selected ? labelFor(selected) : ''}
        placeholder={placeholder}
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
            <li className="destination-combobox__empty">{emptyContent}</li>
          ) : (
            matches.map((destination, index) => (
              <li
                key={destination.id}
                id={`${listboxId}-${destination.id}`}
                role="option"
                aria-selected={index === activeIndex}
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
                  <span>{labelFor(destination)}</span>
                  {showBaseline ? (
                    <small>${destination.dailyBudget}/day</small>
                  ) : null}
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
