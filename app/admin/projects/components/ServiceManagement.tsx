import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  approveServiceRequest, 
  rejectServiceRequest, 
  getServiceRequests,
  getProjectServices
} from '@/lib/services/serviceManagementService';
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/types";

interface ServiceManagementProps {
  projectId: string;
}

export const ServiceManagement = ({ projectId }: ServiceManagementProps) => {
  const [projectServices, setProjectServices] = useState<Service[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveServiceRequest(requestId);
      // Update both project services and pending requests
      await fetchProjectData();
      toast.success("Service approved successfully");
    } catch (error) {
      console.error('Error approving service:', error);
      toast.error("Failed to approve the service");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectServiceRequest(requestId);
      // Update pending requests list
      await fetchProjectData();
      toast.success("Service rejected successfully");
    } catch (error) {
      console.error('Error rejecting service:', error);
      toast.error("Failed to reject the service");
    }
  };

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      // Fetch project's services
      const services = await getProjectServices(projectId);
      setProjectServices(services);

      // Fetch pending service requests for this project
      const requests = await getServiceRequests(projectId);
      setPendingRequests(requests);
    } catch (error) {
      console.error('Error fetching project data:', error);
      toast.error("Failed to fetch project data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <div className="p-4">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Services</h2>
        {projectServices.length > 0 ? (
          <div className="space-y-4">
            {projectServices.map((service) => (
              <div
                key={service.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-medium mt-2">${service.price || 0}</p>
                  </div>
                  <div className="px-2 py-1 text-sm rounded-full bg-muted">
                    {service.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No active services</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                    <p className="text-sm font-medium mt-2">${request.price || 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No pending service requests</p>
        )}
      </div>
    </div>
  );
};
