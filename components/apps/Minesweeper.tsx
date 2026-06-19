"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

type Status = "ready" | "playing" | "won" | "lost";

const NUM_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );
}

function neighbors(r: number, c: number): [number, number][] {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
    }
  return out;
}

/** Place mines avoiding the first-clicked cell, then compute adjacency. */
function placeMines(board: Cell[][], safeR: number, safeC: number): Cell[][] {
  const b = board.map((row) => row.map((c) => ({ ...c })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (b[r][c].mine || (r === safeR && c === safeC)) continue;
    b[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      b[r][c].adjacent = neighbors(r, c).filter(([nr, nc]) => b[nr][nc].mine).length;
  return b;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [time, setTime] = useState(0);
  const [face, setFace] = useState<"smile" | "ooh" | "dead" | "cool">("smile");
  const timerRef = useRef<number | null>(null);

  const flagsUsed = useMemo(
    () => board.flat().filter((c) => c.flagged).length,
    [board]
  );

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setStatus("ready");
    setTime(0);
    setFace("smile");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (status === "playing" && timerRef.current === null) {
      timerRef.current = window.setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000);
    }
    if (status !== "playing" && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current !== null && status !== "playing") {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status]);

  useEffect(() => () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
  }, []);

  function floodReveal(b: Cell[][], r: number, c: number) {
    const stack: [number, number][] = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop()!;
      const cell = b[cr][cc];
      if (cell.revealed || cell.flagged) continue;
      cell.revealed = true;
      if (cell.adjacent === 0 && !cell.mine) {
        for (const [nr, nc] of neighbors(cr, cc)) {
          if (!b[nr][nc].revealed) stack.push([nr, nc]);
        }
      }
    }
  }

  function checkWin(b: Cell[][]): boolean {
    return b.flat().every((c) => (c.mine ? !c.revealed : c.revealed));
  }

  function reveal(r: number, c: number) {
    if (status === "won" || status === "lost") return;
    setBoard((prev) => {
      let b = prev.map((row) => row.map((x) => ({ ...x })));
      if (status === "ready") {
        b = placeMines(b, r, c);
        setStatus("playing");
      }
      const cell = b[r][c];
      if (cell.revealed || cell.flagged) return b;

      if (cell.mine) {
        b.forEach((row) => row.forEach((x) => x.mine && (x.revealed = true)));
        cell.revealed = true;
        setStatus("lost");
        setFace("dead");
        return b;
      }

      floodReveal(b, r, c);

      if (checkWin(b)) {
        b.forEach((row) => row.forEach((x) => x.mine && (x.flagged = true)));
        setStatus("won");
        setFace("cool");
      }
      return b;
    });
  }

  function toggleFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (status === "won" || status === "lost") return;
    setBoard((prev) => {
      const b = prev.map((row) => row.map((x) => ({ ...x })));
      const cell = b[r][c];
      if (cell.revealed) return b;
      cell.flagged = !cell.flagged;
      return b;
    });
  }

  const faceChar = { smile: "🙂", ooh: "😮", dead: "😵", cool: "😎" }[face];
  const mineCount = String(Math.max(0, MINES - flagsUsed)).padStart(3, "0");
  const timeStr = String(time).padStart(3, "0");

  return (
    <div className="bg-[#c0c0c0] p-2 h-full flex justify-center items-start select-none">
      <div className="border-[3px] border-solid border-l-white border-t-white border-r-[#808080] border-b-[#808080] p-1.5 bg-[#c0c0c0]">
        {/* Header: counters + face */}
        <div className="flex justify-between items-center border-2 border-solid border-l-[#808080] border-t-[#808080] border-r-white border-b-white px-1.5 py-1 mb-1.5">
          <Led value={mineCount} />
          <button
            onClick={reset}
            onMouseDown={() => status === "playing" && setFace("ooh")}
            onMouseUp={() => status === "playing" && setFace("smile")}
            className="w-7.5 h-7.5 text-[16px] border-2 border-solid border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] cursor-pointer"
            title="New game"
          >
            {faceChar}
          </button>
          <Led value={timeStr} />
        </div>

        {/* Grid */}
        <div
          className="border-[3px] border-solid border-l-[#808080] border-t-[#808080] border-r-white border-b-white"
          onContextMenu={(e) => e.preventDefault()}
        >
          {board.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <CellView
                  key={c}
                  cell={cell}
                  onClick={() => reveal(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-1.5 text-[11px] text-[#333] text-center">
          Left-click = dig · Right-click = flag
        </div>
      </div>
    </div>
  );
}

function Led({ value }: { value: string }) {
  return (
    <div className="bg-black text-[#ff2200] font-['Courier_New',monospace] font-bold text-[20px] tracking-[2px] px-1.25 py-px border border-[#555] min-w-11.5 text-center">
      {value}
    </div>
  );
}

function CellView({
  cell,
  onClick,
  onContextMenu,
}: {
  cell: Cell;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) {
  const base = "w-[22px] h-[22px] text-[13px] font-bold leading-[22px] text-center p-0 cursor-default";

  if (cell.revealed) {
    return (
      <div
        className={`${base} border border-[#808080] ${cell.mine ? "bg-[#ff4040]" : "bg-[#bdbdbd]"}`}
        style={{ color: NUM_COLORS[cell.adjacent] || "#000" }}
      >
        {cell.mine ? "💣" : cell.adjacent > 0 ? cell.adjacent : ""}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`${base} border-2 border-solid border-l-white border-t-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] cursor-pointer`}
    >
      {cell.flagged ? "🚩" : ""}
    </button>
  );
}
