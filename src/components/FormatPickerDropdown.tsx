import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormatCategory } from '@/lib/format-categories';
import { cn } from '@/lib/utils';

interface FormatPickerDropdownProps {
  label: string;
  value: string;
  categories: FormatCategory[];
  onChange: (format: string) => void;
  placeholder?: string;
  /** 'ltr' = sidebar left, formats right (default). 'rtl' = sidebar right, formats left. */
  direction?: 'ltr' | 'rtl';
}

export function FormatPickerDropdown({
  label,
  value,
  categories,
  onChange,
  placeholder = 'Select format',
  direction = 'ltr',
}: FormatPickerDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key ?? '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.key === activeCategory)) {
      setActiveCategory(categories[0].key);
    }
  }, [categories, activeCategory]);

  const activeCat = categories.find(c => c.key === activeCategory);
  const isRtl = direction === 'rtl';

  const sidebar = (
    <div className={cn(
      // Sidebar width = trigger button width, so its inner divider aligns
      // exactly with the gap between CONVERT and TO. Panel width is
      // 2*button + 44px gap, so each button = calc(50% - 22px) of the panel.
      'w-[calc(50%-22px)] shrink-0 py-1',
      isRtl ? 'border-l border-border' : 'border-r border-border',
    )}>
      {categories.map(cat => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              'flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs font-medium transition-colors',
              activeCategory === cat.key
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );

  const formatList = (
    <div className="flex-1 overflow-y-auto p-1" style={{ maxHeight: 280 }}>
      {activeCat?.formats.map(fmt => (
        <button
          key={fmt}
          type="button"
          onClick={() => {
            onChange(fmt);
            setOpen(false);
          }}
          className={cn(
            'flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
            value === fmt
              ? 'bg-primary/15 text-primary'
              : 'text-foreground hover:bg-secondary',
          )}
        >
          .{fmt.toUpperCase()}
        </button>
      ))}
      {activeCat?.formats.length === 0 && (
        <p className="px-3 py-4 text-xs text-muted-foreground">No formats available</p>
      )}
    </div>
  );

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex h-14 w-full items-center justify-between rounded-xl border bg-card px-4 text-left transition-colors',
          open ? 'border-primary' : 'border-border hover:border-muted-foreground',
        )}
      >
        <div className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <span className={cn('block truncate text-sm font-semibold', value ? 'text-foreground' : 'text-muted-foreground')}>
            {value ? `.${value.toUpperCase()}` : placeholder}
          </span>
        </div>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          {/*
            Panel spans the entire row of pickers (CONVERT + arrow gap + TO).
            The arrow column is 20px (icon) plus 12px gap on each side = 44px.
            Convert (ltr) panel anchors left, stretches right across the gap + To button.
            To (rtl) panel anchors right, stretches left across the gap + Convert button.
          */}
          <div className={cn(
            'absolute top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-border bg-card',
            isRtl
              ? 'right-0 left-[calc(-100%-44px)]'
              : 'left-0 right-[calc(-100%-44px)]',
          )}>
            <div className="flex">
              {isRtl ? (
                <>
                  {formatList}
                  {sidebar}
                </>
              ) : (
                <>
                  {sidebar}
                  {formatList}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
