'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserMetricsCard } from './cards/UserMetricsCard';
import { ProjectMetricsCard } from './cards/ProjectMetricsCard';
import { RevenueMetricsCard } from './cards/RevenueMetricsCard';
import { ActiveProjectsCard } from './cards/ActiveProjectsCard';
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
            <Card>
              <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
              <CardContent><RevenueChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Project Status</CardTitle></CardHeader>
              <CardContent><ProjectStatusChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>User Activity</CardTitle></CardHeader>
              <CardContent><UserActivityChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Service Distribution</CardTitle></CardHeader>
              <CardContent><ServiceDistributionChart /></CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Milestone Completion</CardTitle></CardHeader>
              <CardContent><MilestoneCompletionChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Project Timeline</CardTitle></CardHeader>
              <CardContent><ProjectTimelineChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Project Categories</CardTitle></CardHeader>
              <CardContent><ProjectCategoryChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Milestone Status</CardTitle></CardHeader>
              <CardContent><MilestoneStatusChart /></CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
              <CardContent><UserGrowthChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>User Activity</CardTitle></CardHeader>
              <CardContent><UserActivityChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>User Engagement</CardTitle></CardHeader>
              <CardContent><UserEngagementChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Project Distribution</CardTitle></CardHeader>
              <CardContent><ProjectStatusChart /></CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
              <CardContent><RevenueChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
              <CardContent><PaymentHistoryChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Revenue by Service</CardTitle></CardHeader>
              <CardContent><RevenueByServiceChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Project Value Distribution</CardTitle></CardHeader>
              <CardContent><ProjectStatusChart /></CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}