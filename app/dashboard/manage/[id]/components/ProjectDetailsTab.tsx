import { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projectTypes } from '@/lib/data/projectTypes';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Package, Sparkles, CheckCircle2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectDetailsProps {
  project: Project;
  onServiceClick: () => void;
}

const ProjectDetailsTab: React.FC<ProjectDetailsProps> = ({ project, onServiceClick }) => {
  const projectType = projectTypes.find(type => type.id === project.type);
  const completedMilestones = project.milestones?.filter(m => m.status === 'completed').length || 0;
  const totalMilestones = project.milestones?.length || 0;
  const progressPercentage = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;
  const paidAmount = project.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const paymentProgress = (paidAmount / project.totalCost) * 100;

  const renderFeaturesList = (features: any) => {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-4">
                {typeof value === 'boolean' ? (
                  value ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Check className="h-4 w-4 text-muted-foreground/30" />
                  )
                ) : null}
              </div>
              <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
            {typeof value === 'number' && (
              <span className="font-bold text-sm">${value.toLocaleString()}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"'>
      <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-4 w-4 text-primary" />
              <div className="font-medium">Project Type</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-semibold">{projectType?.name}</div>
              <p className="text-sm text-muted-foreground">{projectType?.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <div className="font-medium">Milestones</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-semibold">{completedMilestones}/{totalMilestones}</div>
              <p className="text-sm text-muted-foreground">Completed milestones</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="font-medium">Additional Services</div>
              </div>
              <Button variant="ghost" size="sm" onClick={onServiceClick}>
                View All
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-semibold">{project.additionalServices?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Active services</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Package Details</h3>
              </div>
              <div className="flex gap-2 items-center">
                <Badge variant="secondary">{project.package.name}</Badge>
                <Badge variant="outline" className="font-bold">${project.package.price.toLocaleString()}</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {project.package.description}
            </p>
            <div className="space-y-4">
              {/* Progress bars section */}
              <div className="grid gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Project Completion</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Payment Progress</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={paymentProgress} className="h-2" />
                    <span className="text-sm font-medium">{Math.round(paymentProgress)}%</span>
                  </div>
                  <div className="flex justify-between  font-bold text-sm">
                    <span>Paid: ${paidAmount.toLocaleString()}</span>
                    <span>Total: ${project.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Package Features */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Package Features</h4>
                {renderFeaturesList(project.package.features)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Services Card */}
        {project.additionalServices?.length > 0 && (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Additional Services</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={onServiceClick}>
                  View All Services
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.additionalServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      {service.description && (
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="font-bold">${service.price?.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsTab;