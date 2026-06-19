import type { ComponentType } from "react";
import { icon } from "@/lib/icons";
import { projects } from "@/lib/data/projects";

import MyComputer from "@/components/apps/MyComputer";
import MyDocuments from "@/components/apps/MyDocuments";
import MyProjects from "@/components/apps/MyProjects";
import ContactMe from "@/components/apps/ContactMe";
import MyCV from "@/components/apps/MyCV";
import MyMusic from "@/components/apps/MyMusic";
import Notepad from "@/components/apps/Notepad";
import InternetExplorer from "@/components/apps/InternetExplorer";
import Minesweeper from "@/components/apps/Minesweeper";
import RecycleBin from "@/components/apps/RecycleBin";
import Paint from "@/components/apps/Paint";
import ProjectDetail from "@/components/apps/ProjectDetail";

export interface AppDef {
  id: string;
  title: string;
  /** Icon path (already resolved into /assets). */
  icon: string;
  component: ComponentType;
  width?: number;
  height?: number;
  singleInstance?: boolean;
  /** Shown on the desktop grid. */
  onDesktop?: boolean;
  /** Shown in the Start menu left column. */
  inStartMenu?: boolean;
  /** Optional alternative label for the desktop/start (defaults to title). */
  label?: string;
}

/** Primary apps (desktop + Start menu). Order = desktop order. */
export const APPS: AppDef[] = [
  {
    id: "my-computer",
    title: "My Computer",
    icon: icon("My Computer.png"),
    component: MyComputer,
    width: 680,
    height: 480,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "my-documents",
    title: "My Documents",
    icon: icon("My Documents.png"),
    component: MyDocuments,
    width: 680,
    height: 500,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "my-projects",
    title: "My Projects",
    icon: icon("Folder Closed.png"),
    component: MyProjects,
    width: 700,
    height: 500,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
    label: "My Projects",
  },
  {
    id: "internet-explorer",
    title: "Internet Explorer",
    icon: icon("Internet Explorer 6.png"),
    component: InternetExplorer,
    width: 720,
    height: 540,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "my-cv",
    title: "My CV",
    icon: icon("Wordpad.png"),
    component: MyCV,
    width: 720,
    height: 560,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "contact-me",
    title: "Contact Me",
    icon: icon("Outlook Express.png"),
    component: ContactMe,
    width: 560,
    height: 460,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "my-music",
    title: "My Music",
    icon: icon("My Music.png"),
    component: MyMusic,
    width: 460,
    height: 540,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "notepad",
    title: "Notepad – About me.txt",
    icon: icon("Notepad.png"),
    component: Notepad,
    width: 540,
    height: 460,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
    label: "Notepad",
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    icon: icon("Minesweeper.png"),
    component: Minesweeper,
    width: 300,
    height: 380,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "paint",
    title: "Paint",
    icon: icon("Paint.png"),
    component: Paint,
    width: 680,
    height: 520,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: true,
  },
  {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: icon("Recycle Bin (full).png"),
    component: RecycleBin,
    width: 640,
    height: 440,
    singleInstance: true,
    onDesktop: true,
    inStartMenu: false,
  },
];

/** One window per featured project, openable from My Projects (not on desktop). */
export const PROJECT_APPS: AppDef[] = projects.map((p) => {
  const ProjectWindow = () => <ProjectDetail project={p} />;
  ProjectWindow.displayName = `Project_${p.id}`;
  return {
    id: `project-${p.id}`,
    title: p.name,
    icon: icon(p.icon),
    component: ProjectWindow,
    width: 560,
    height: 480,
    singleInstance: true,
  };
});

const ALL_APPS = [...APPS, ...PROJECT_APPS];

const APP_MAP = new Map<string, AppDef>(ALL_APPS.map((a) => [a.id, a]));

export function getApp(appId: string): AppDef | undefined {
  return APP_MAP.get(appId);
}

export const DESKTOP_APPS = APPS.filter((a) => a.onDesktop);
export const START_MENU_APPS = APPS.filter((a) => a.inStartMenu);
