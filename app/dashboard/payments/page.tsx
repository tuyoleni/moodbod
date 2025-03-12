'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { fetchAllProjects } from '@/lib/services/projectService';
import { getProjectServices } from '@/lib/services/serviceManagementService';
import { useCurrency } from '@/lib/context/CurrencyContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loading, setLoading] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const { formatAmount } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchAllProjects();
        const projectsWithServices = await Promise.all(
          projectsData.map(async (project) => {
            const services = await getProjectServices(project.id);
            return { ...project, services };
          })
        );
        setProjects(projectsWithServices);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handlePayment = async (projectId, amount, isService = false, serviceId) => {
    setProcessingPayment(serviceId || projectId);
    try {
      // TODO: Integrate with your payment gateway here
      // For demonstration, we'll simulate a payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment processed successfully');
      // Refresh the projects data after successful payment
      loadProjects();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium tracking-tight">Payments</h1>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Details</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <TableRow key={project.id} className={`group cursor-pointer hover:bg-muted/50 ${project.services && project.services.length > 0 ? 'relative' : ''}`}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.package.name}</Badge>
                  </TableCell>
                  <TableCell>{formatAmount(project.package.price)}</TableCell>
                  <TableCell>
                    <Badge variant={project.payments?.some(p => p.status === 'completed') ? 'success' : 'warning'}>
                      {project.payments?.some(p => p.status === 'completed') ? 'Paid' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {formatAmount(
                        project.package.price +
                        (project.services?.reduce((sum, service) => sum + (service.price || 0), 0) || 0)
                      )}
                      {project.services && project.services.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => toggleProjectExpansion(project.id)}
                        >
                          {expandedProjects.has(project.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/manage/${project.id}`)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Project
                          </DropdownMenuItem>
                          {!project.payments?.some(p => p.status === 'completed') && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay Now
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Payment</DialogTitle>
                                  <DialogDescription>
                                    You are about to pay {formatAmount(project.package.price)} for the {project.package.name} package.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="default"
                                    onClick={() => handlePayment(project.id, project.package.price)}
                                    disabled={processingPayment === project.id}
                                  >
                                    {processingPayment === project.id ? (
                                      <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                        Processing...
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-2">
                                        Confirm Payment
                                      </span>
                                    )}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedProjects.has(project.id) && project.services && project.services.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50 p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {project.services.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>{service.name}</TableCell>
                              <TableCell>{service.description}</TableCell>
                              <TableCell>{formatAmount(service.price || 0)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Badge variant={service.status === 'APPROVED' ? 'success' : 'warning'}>
                                    {service.status}
                                  </Badge>
                                  {service.status === 'APPROVED' && !service.paid && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={processingPayment === service.id}
                                        >
                                          {processingPayment === service.id ? (
                                            <span className="flex items-center gap-2">
                                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                              Processing...
                                            </span>
                                          ) : (
                                            <span className="flex items-center gap-2">
                                              <CreditCard className="h-4 w-4" />
                                              Pay Service
                                            </span>
                                          )}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Confirm Service Payment</DialogTitle>
                                          <DialogDescription>
                                            You are about to pay {formatAmount(service.price || 0)} for the {service.name} service.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            variant="default"
                                            onClick={() => handlePayment(project.id, service.price || 0, true, service.id)}
                                            disabled={processingPayment === service.id}
                                          >
                                            Confirm Payment
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}                          
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
