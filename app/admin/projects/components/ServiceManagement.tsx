import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
  approveServiceRequest, 
  rejectServiceRequest, 
  getServiceRequests} from '@/lib/services/serviceManagementService';
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/types";

const ServiceManagement = () => {
  const [project, setProject] = useState<Service | null>(null);
  const [pendingRequests, setPendingRequests] = useState<Service[]>([]);

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveServiceRequest(requestId);
      if (project) {
        const approvedRequest = pendingRequests.find(req => req.id === requestId);
        const updatedProject = {
          ...project,
          price: (project.price || 0) + (approvedRequest?.price || 0),
        };
        setProject(updatedProject);
        setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
        toast.success("Service approved!");
      }
    } catch (error) {
      toast.error("Failed to approve the service.");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectServiceRequest(requestId);
      // Update pending requests list by removing the rejected request
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      toast.success("Service rejected!");
    } catch (error) {
      toast.error("Failed to reject the service.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pending service requests
        const fetchedRequests = await getServiceRequests();
        setPendingRequests(fetchedRequests);

        // If you need to fetch a specific project's services, you can use:
        // const projectServices = await getProjectServices(projectId);
        // setProject(projectServices[0] || null);
      } catch (error) {
        toast.error("Failed to fetch project or requests.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Service Management</h2>
      {project && (
        <div>
          <h3>{project.name}</h3>
          <p>Total Cost: ${project.price || 0}</p>
        </div>
      )}

      <div className="my-4">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{request.name}</p>
                <p className="text-sm text-muted-foreground">${request.price || 0}</p>
                <p className="text-sm text-muted-foreground">{request.description}</p>
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
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceManagement;