"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProjectHeader from "./components/ProjectHeader";
import ProjectDetails from "./components/ProjectDetails";
import ProjectTimeline from "./components/ProjectTimeline";
import ProjectServices from "./components/ProjectServices";
import ProjectComments from "./components/ProjectComments";
import ProjectFeedback from "./components/ProjectFeedback";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Project } from "@/lib/types/database";
import { getProjectById } from "@/lib/firebase/services/services";

export default function ProjectPage() {
    const params = useParams();
    const id = params.id as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchProject = async () => {
            setLoading(true);
            const projectData = await getProjectById(id);
            if (!projectData) {
                router.push("/dashboard");
                return;
            }
            setProject(projectData);
            setLoading(false);
        };

        fetchProject();
    }, [id, router]);

    if (loading) return <p className="text-center py-10">Loading project...</p>;

    return (
        <div>
            <div className="p-8 max-w-7xl mx-auto">
                <ProjectHeader project={project!} />

                <Tabs defaultValue="overview" className="mt-8">
                    <TabsList className="border-b border-gray-200 w-full justify-start">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <ProjectDetails project={project!} />
                    </TabsContent>

                    <TabsContent value="timeline" className="mt-6">
                        <ProjectTimeline project={project!} />
                    </TabsContent>

                    <TabsContent value="services" className="mt-6">
                        <ProjectServices project={project!} />
                    </TabsContent>

                    <TabsContent value="feedback" className="mt-6">
                        <ProjectFeedback project={project!} />
                    </TabsContent>

                    <TabsContent value="comments" className="mt-6">
                        <ProjectComments project={project!} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}