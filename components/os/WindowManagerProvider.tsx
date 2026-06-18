"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  /** Saved geometry to restore from a maximized state. */
  restore?: { x: number; y: number; width: number; height: number };
}

export interface OpenOptions {
  id: string;
  title: string;
  icon: string;
  width?: number;
  height?: number;
  singleInstance?: boolean;
}

interface ManagerState {
  windows: WindowState[];
  topZ: number;
  seq: number;
}

type Action =
  | { type: "open"; opts: OpenOptions }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "toggleMaximize"; id: string; viewport: { w: number; h: number } }
  | { type: "restore"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; width: number; height: number };

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case "open": {
      const { opts } = action;
      // Single-instance apps: focus / un-minimize the existing window.
      if (opts.singleInstance) {
        const existing = state.windows.find((w) => w.appId === opts.id);
        if (existing) {
          const topZ = state.topZ + 1;
          return {
            ...state,
            topZ,
            windows: state.windows.map((w) =>
              w.id === existing.id
                ? { ...w, minimized: false, zIndex: topZ }
                : w
            ),
          };
        }
      }
      const topZ = state.topZ + 1;
      const seq = state.seq + 1;
      const width = opts.width ?? 640;
      const height = opts.height ?? 460;
      // Cascade new windows so they don't perfectly overlap.
      const offset = (state.windows.length % 6) * 26;
      const x = 60 + offset;
      const y = 40 + offset;
      const win: WindowState = {
        id: `${opts.id}-${seq}`,
        appId: opts.id,
        title: opts.title,
        icon: opts.icon,
        x,
        y,
        width,
        height,
        zIndex: topZ,
        minimized: false,
        maximized: false,
      };
      return { windows: [...state.windows, win], topZ, seq };
    }
    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };
    case "focus": {
      const topZ = state.topZ + 1;
      return {
        ...state,
        topZ,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: topZ, minimized: false } : w
        ),
      };
    }
    case "minimize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case "toggleMaximize": {
      const topZ = state.topZ + 1;
      return {
        ...state,
        topZ,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized) {
            const r = w.restore ?? { x: 60, y: 40, width: 640, height: 460 };
            return { ...w, maximized: false, zIndex: topZ, ...r };
          }
          return {
            ...w,
            maximized: true,
            zIndex: topZ,
            restore: { x: w.x, y: w.y, width: w.width, height: w.height },
            x: 0,
            y: 0,
            width: action.viewport.w,
            height: action.viewport.h,
          };
        }),
      };
    }
    case "move":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case "resize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, width: action.width, height: action.height }
            : w
        ),
      };
    default:
      return state;
  }
}

interface ManagerContextValue {
  windows: WindowState[];
  activeId: string | null;
  open: (opts: OpenOptions) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, width: number, height: number) => void;
}

const ManagerContext = createContext<ManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    topZ: 10,
    seq: 0,
  });

  const open = useCallback((opts: OpenOptions) => dispatch({ type: "open", opts }), []);
  const close = useCallback((id: string) => dispatch({ type: "close", id }), []);
  const focus = useCallback((id: string) => dispatch({ type: "focus", id }), []);
  const minimize = useCallback(
    (id: string) => dispatch({ type: "minimize", id }),
    []
  );
  const toggleMaximize = useCallback((id: string) => {
    const viewport =
      typeof window !== "undefined"
        ? { w: window.innerWidth, h: window.innerHeight - 30 }
        : { w: 1024, h: 738 };
    dispatch({ type: "toggleMaximize", id, viewport });
  }, []);
  const move = useCallback(
    (id: string, x: number, y: number) => dispatch({ type: "move", id, x, y }),
    []
  );
  const resize = useCallback(
    (id: string, width: number, height: number) =>
      dispatch({ type: "resize", id, width, height }),
    []
  );

  const activeId = useMemo(() => {
    const visible = state.windows.filter((w) => !w.minimized);
    if (visible.length === 0) return null;
    return visible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id;
  }, [state.windows]);

  const value = useMemo<ManagerContextValue>(
    () => ({
      windows: state.windows,
      activeId,
      open,
      close,
      focus,
      minimize,
      toggleMaximize,
      move,
      resize,
    }),
    [state.windows, activeId, open, close, focus, minimize, toggleMaximize, move, resize]
  );

  return <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>;
}

export function useWindows(): ManagerContextValue {
  const ctx = useContext(ManagerContext);
  if (!ctx) {
    throw new Error("useWindows must be used within a WindowManagerProvider");
  }
  return ctx;
}
