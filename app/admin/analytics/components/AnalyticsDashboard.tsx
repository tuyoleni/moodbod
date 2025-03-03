'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserMetricsCard } from './cards/UserMetricsCard';
import { ProjectMetricsCard } from './cards/ProjectMetricsCard';
import { RevenueMetricsCard } from './cards/RevenueMetricsCard';
import { ActiveProjectsCard } from './cards/ActiveProjectsCard';
import { ChartWrapper } from './charts/ChartWrapper';
import { RevenueChart } from './charts/RevenueChart';
import { ProjectStatusChart } from './charts/ProjectStatusChart';
import { UserActivityChart } from './charts/UserActivityChart';
import { MilestoneCompletionChart } from './charts/MilestoneCompletionChart';
import { ProjectTimelineChart } from './charts/ProjectTimelineChart';
import { UserGrowthChart } from './charts/UserGrowthChart';
import { PaymentHistoryChart } from './charts/PaymentHistoryChart';
import { ServiceDistributionChart } from './charts/ServiceDistributionChart';
import { MilestoneStatusChart } from './charts/MilestoneStatusChart';
import { UserEngagementChart } from './charts/UserEngagementChart';
import { ProjectCategoryChart } from './charts/ProjectCategoryChart';
import { RevenueByServiceChart } from './charts/RevenueByServiceChart';

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UserMetricsCard />
        <ProjectMetricsCard />
        <RevenueMetricsCard />
        <ActiveProjectsCard />
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartWrapper 
              title="Revenue Trend" 
              description="Track monthly revenue patterns over the last 6 months to identify growth trends and seasonal variations."
            >
              <RevenueChart />
            </ChartWrapper>
            
            <ChartWrapper 
              title="Project Status" 
              description="Overview of projects by their current status"
            >
              <ProjectStatusChart />
            </ChartWrapper>
            <ChartWrapper 
              title="User Activity" 
              description="Daily user interactions and engagement metrics"
            >
              <UserActivityChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Service Distribution" 
              description="Breakdown of services across all projects"
            >
              <ServiceDistributionChart />
            </ChartWrapper>
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartWrapper 
              title="Milestone Completion"
              description="Track the completion status of project milestones"
            >
              <MilestoneCompletionChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Project Timeline"
              description="Visual representation of project timelines"
            >
              <ProjectTimelineChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Project Categories"
              description="Distribution of projects across different categories"
            >
              <ProjectCategoryChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Milestone Status"
              description="Current status of project milestones"
            >
              <MilestoneStatusChart />
            </ChartWrapper>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartWrapper 
              title="User Growth"
              description="Track user acquisition and growth over time"
            >
              <UserGrowthChart />
            </ChartWrapper>
            <ChartWrapper 
              title="User Activity"
              description="Monitor daily user interactions and engagement"
            >
              <UserActivityChart />
            </ChartWrapper>
            <ChartWrapper 
              title="User Engagement"
              description="Analyze user engagement patterns and metrics"
            >
              <UserEngagementChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Project Distribution"
              description="Distribution of projects across user base"
            >
              <ProjectStatusChart />
            </ChartWrapper>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartWrapper 
              title="Revenue Overview"
              description="Overall revenue performance and trends"
            >
              <RevenueChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Payment History"
              description="Historical payment data and patterns"
            >
              <PaymentHistoryChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Revenue by Service"
              description="Revenue breakdown by service category"
            >
              <RevenueByServiceChart />
            </ChartWrapper>
            <ChartWrapper 
              title="Project Value Distribution"
              description="Distribution of project values across portfolio"
            >
              <ProjectStatusChart />
            </ChartWrapper>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}