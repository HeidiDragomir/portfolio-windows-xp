"use client";

import { useState } from "react";
import DesktopIcon from "./DesktopIcon";
import { DESKTOP_APPS, type AppDef } from "@/lib/apps";
import { useWindows } from "./WindowManagerProvider";
import { useCoarsePointer } from "@/lib/responsive";
import { WALLPAPER } from "@/lib/icons";
import { playClick } from "@/lib/audio";

export default function Desktop() {
  const { open } = useWindows();
  const [selected, setSelected] = useState<string | null>(null);
  // Touch devices can't double-click reliably, so a single tap opens there.
  const tapToOpen = useCoarsePointer();

  function openApp(app: AppDef) {
    playClick();
    open({
      id: app.id,
      title: app.title,
      icon: app.icon,
      width: app.width,
      height: app.height,
      singleInstance: app.singleInstance,
    });
  }

  return (
    <div
      className="xp-desktop"
      style={{ backgroundImage: `url("${WALLPAPER}")` }}
      onClick={() => setSelected(null)}
    >
      <div
        className="absolute top-2 left-1.5 grid gap-3 grid-cols-[repeat(2,auto)] w-auto"
      >
        {DESKTOP_APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label ?? app.title}
            selected={selected === app.id}
            tapToOpen={tapToOpen}
            onSelect={() => setSelected(app.id)}
            onOpen={() => openApp(app)}
          />
        ))}
      </div>
    </div>
  );
}
