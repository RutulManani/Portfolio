import { useRef, useState } from 'react';
import { LayoutGrid, Shuffle } from 'lucide-react';
import { SKILL_BOARD_ITEMS, SKILL_CATEGORIES } from '../../data/content';
import './SkillBoard.css';

const SCATTER = [
  { r: -4, x: -6, y: 6 },
  { r: 3, x: 8, y: -8 },
  { r: -2, x: 4, y: 12 },
  { r: 5, x: -10, y: -4 },
  { r: -3, x: 6, y: 4 },
  { r: 2, x: -4, y: -10 },
  { r: 4, x: 10, y: 8 },
  { r: -5, x: -8, y: -6 },
  { r: 1, x: 2, y: 10 },
  { r: -3, x: 12, y: -2 },
  { r: 4, x: -6, y: 6 },
  { r: -2, x: 6, y: -8 },
];

const CATEGORY_CLASS = {
  Research: 'skillboard__note--research',
  Craft: 'skillboard__note--craft',
  Systems: 'skillboard__note--systems',
};

const KEY_STEP = 12;

export default function SkillBoard() {
  const [tidy, setTidy] = useState(false);
  const [filter, setFilter] = useState('All');
  const [offsets, setOffsets] = useState({});
  const [stack, setStack] = useState([]);
  const [dragging, setDragging] = useState(null);
  const dragStart = useRef(null);

  const bringToFront = (id) =>
    setStack((s) => [...s.filter((x) => x !== id), id]);

  const moveBy = (id, dx, dy) => {
    setTidy(false);
    setOffsets((o) => {
      const cur = o[id] ?? { x: 0, y: 0 };
      return { ...o, [id]: { x: cur.x + dx, y: cur.y + dy } };
    });
  };

  const onPointerDown = (id) => (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const cur = offsets[id] ?? { x: 0, y: 0 };
    dragStart.current = { px: e.clientX, py: e.clientY, ox: cur.x, oy: cur.y };
    setDragging(id);
    bringToFront(id);
  };

  const onPointerMove = (id) => (e) => {
    if (dragging !== id || !dragStart.current) return;
    const { px, py, ox, oy } = dragStart.current;
    setTidy(false);
    setOffsets((o) => ({
      ...o,
      [id]: { x: ox + e.clientX - px, y: oy + e.clientY - py },
    }));
  };

  const onPointerUp = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragStart.current = null;
    setDragging(null);
  };

  const onKeyDown = (id) => (e) => {
    const moves = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    bringToFront(id);
    moveBy(id, move[0], move[1]);
  };

  const tidyUp = () => {
    setOffsets({});
    setTidy(true);
  };
  const scatter = () => {
    setOffsets({});
    setTidy(false);
  };

  const matchCount =
    filter === 'All'
      ? SKILL_BOARD_ITEMS.length
      : SKILL_BOARD_ITEMS.filter((s) => s.category === filter).length;

  return (
    <div className="skillboard">
      {/* Top bar */}
      <div className="skillboard__topbar">
        <div className="skillboard__window">
          <span className="skillboard__dots" aria-hidden="true">
            <span className="skillboard__dot" />
            <span className="skillboard__dot" />
            <span className="skillboard__dot" />
          </span>
          <p className="skillboard__filename">skills.board</p>
        </div>

        <div className="skillboard__toggle">
          <button
            type="button"
            onClick={tidyUp}
            aria-pressed={tidy}
            className={`skillboard__toggle-btn ${tidy ? 'active' : ''}`}
          >
            <LayoutGrid size={13} aria-hidden="true" />
            Tidy up
          </button>
          <button
            type="button"
            onClick={scatter}
            aria-pressed={!tidy}
            className={`skillboard__toggle-btn ${!tidy ? 'active' : ''}`}
          >
            <Shuffle size={13} aria-hidden="true" />
            Scatter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className="skillboard__filters"
        role="group"
        aria-label="Filter skills"
      >
        {['All', ...SKILL_CATEGORIES].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`skillboard__filter ${filter === f ? 'active' : ''}`}
          >
            {f !== 'All' && (
              <span
                className="skillboard__filter-dot"
                style={{
                  background:
                    f === 'Research'
                      ? 'var(--sb-accent)'
                      : f === 'Craft'
                      ? 'var(--sb-card-foreground)'
                      : 'var(--sb-primary)',
                }}
                aria-hidden="true"
              />
            )}
            {f}
          </button>
        ))}
        <p className="skillboard__count" aria-live="polite">
          {matchCount} / {SKILL_BOARD_ITEMS.length}
        </p>
      </div>

      {/* Board */}
      <div className="skillboard__board">
        <ul
          className="skillboard__grid"
          aria-label="Skills, draggable sticky notes"
        >
          {SKILL_BOARD_ITEMS.map((skill, i) => {
            const base = tidy
              ? { r: 0, x: 0, y: 0 }
              : SCATTER[i % SCATTER.length];
            const off = offsets[skill.id] ?? { x: 0, y: 0 };
            const isDragging = dragging === skill.id;
            const dimmed = filter !== 'All' && skill.category !== filter;
            const z = stack.indexOf(skill.id) + 1;
            const order = tidy
              ? SKILL_CATEGORIES.indexOf(skill.category) * 100 + i
              : i;

            return (
              <li
                key={skill.id}
                tabIndex={0}
                aria-label={`${skill.name}, ${skill.category}. ${skill.note}. Use arrow keys to move.`}
                onPointerDown={onPointerDown(skill.id)}
                onPointerMove={onPointerMove(skill.id)}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown(skill.id)}
                style={{
                  order,
                  zIndex: isDragging ? 50 : z,
                  transform: `translate(${base.x + off.x}px, ${
                    base.y + off.y
                  }px) rotate(${isDragging ? 0 : base.r}deg) scale(${
                    isDragging ? 1.06 : dimmed ? 0.94 : 1
                  })`,
                }}
                className={`skillboard__note ${CATEGORY_CLASS[skill.category]} ${
                  isDragging ? 'dragging' : ''
                } ${dimmed ? 'dimmed' : ''}`}
              >
                <span className="skillboard__tape" aria-hidden="true" />
                <span className="skillboard__cat">{skill.category}</span>
                <span className="skillboard__body">
                  <span className="skillboard__name">{skill.name}</span>
                  <span className="skillboard__note-text">{skill.note}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="skillboard__hint">
        Drag the stickies around, or focus one and use arrow keys.
      </p>
    </div>
  );
}