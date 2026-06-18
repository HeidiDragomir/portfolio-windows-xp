"use client";

import { START_MENU_APPS, type AppDef } from "@/lib/apps";
import { useWindows } from "./WindowManagerProvider";
import { profile } from "@/lib/data/profile";
import { AVATAR, icon } from "@/lib/icons";
import { playClick } from "@/lib/audio";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onLogOff: () => void;
  onTurnOff: () => void;
}

export default function StartMenu({ onClose, onLogOff, onTurnOff }: Props) {
  const { open } = useWindows();
  const [hover, setHover] = useState(false);

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
    onClose();
  }

  // Split into two columns to mimic XP (pinned + frequently used).
  const left = START_MENU_APPS.slice(0, 6);
  const right = START_MENU_APPS.slice(6);

  return (
    <div className="xp-startmenu" onClick={(e) => e.stopPropagation()}>
      <div className="xp-startmenu-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
                  src={AVATAR}
                  alt={profile.namn}
                  width={48}
                  height={48}
                  draggable={false}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 5,
                    border: "2px solid #fff",
                    background: "#9db8e8",
                    boxShadow: hover
                      ? "0 0 8px rgba(255,255,255,0.7)"
                      : "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />

        {profile.namn}
      </div>

      <div className="xp-startmenu-cols">
        <div className="xp-startmenu-left">
          {left.map((app) => (
            <div key={app.id} className="xp-startmenu-item" onClick={() => openApp(app)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.icon} alt="" width={24} height={24} draggable={false} />
              <span className="name">{app.label ?? app.title}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ccc", margin: "4px 0" }} />
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="xp-startmenu-item"
            style={{ textDecoration: "none" }}
            onClick={onClose}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon("Run.png")} alt="" width={24} height={24} draggable={false} />
            <span className="name">GitHub Profile</span>
          </a>
        </div>

        <div className="xp-startmenu-right">
          {right.map((app) => (
            <div key={app.id} className="xp-startmenu-item" onClick={() => openApp(app)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.icon} alt="" width={22} height={22} draggable={false} />
              <span>{app.label ?? app.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="xp-startmenu-footer">
        <div
          className="xp-startmenu-footer-item"
          onClick={() => {
            onClose();
            onLogOff();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("Logout.png")} alt="" width={22} height={22} draggable={false} />
          Log Off
        </div>
        <div
          className="xp-startmenu-footer-item"
          onClick={() => {
            onClose();
            onTurnOff();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon("Restart.png")} alt="" width={22} height={22} draggable={false} />
          Turn Off
        </div>
      </div>
    </div>
  );
}
