"use client";

import { START_MENU_APPS, type AppDef } from "@/lib/apps";
import { useWindows } from "./WindowManagerProvider";
import { profile } from "@/lib/data/profile";
import { icon } from "@/lib/icons";
import { playClick } from "@/lib/audio";

interface Props {
  onClose: () => void;
  onLogOff: () => void;
  onTurnOff: () => void;
}

export default function StartMenu({ onClose, onLogOff, onTurnOff }: Props) {
  const { open } = useWindows();

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
          className="xp-startmenu-avatar"
          src={icon("User Accounts.png")}
          alt=""
          draggable={false}
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
