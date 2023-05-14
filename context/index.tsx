"use client";

import { createContext, useState } from "react";
import { ProjectCardProps } from "../components/ProjectCard";

export const ProjectListContext = createContext<{
  projectList: ProjectCardProps[];
  setProjectList: (projectList: ProjectCardProps[]) => void;
}>({
  projectList: [],
  setProjectList: () => {},
});

export default function Context({ children }: { children: React.ReactNode }) {
  const [projectList, setProjectList] = useState<ProjectCardProps[]>([]);

  return (
    <ProjectListContext.Provider value={{ projectList, setProjectList }}>
      {children}
    </ProjectListContext.Provider>
  );
}
