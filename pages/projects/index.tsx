import { Key, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import ProjectCard from "../../components/projectCard";
import EmptyList from "../../shared/components/EmptyList";
import {
  getAllProjects,
  getUserProjects,
} from "../../shared/services/projects.services";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const projects = await getAllProjects();
  return {
    props: { projects: projects?.data || [] },
  };
};

const Projects: NextPage = (props: any) => {
  const { projects } = props;
  console.log("projects", projects);

  return (
    <>
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Find Your Projects
        </h1>
        <div className="flex gap-4 py-4 flex-wrap justify-center">
          {projects.length === 0 ? (
            <EmptyList message="No Projects available" />
          ) : (
            projects.map((project, index) => {
              return <ProjectCard data={project} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
