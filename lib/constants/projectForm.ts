import { ProjectType, ProjectStatus } from '../types/enums';

export const initialFeatures = {
  pages: 0,
  revisions: 0,
  mobileResponsive: false,
  contactForm: false,
  socialMediaLinks: false,
  seoSetup: false,
  customDesign: false
};

export const initialProjectFormState = {
  name: '',
  description: '',
  type: ProjectType.WEBSITE,
  status: ProjectStatus.REQUESTED,
  userId: '',
  package: {
    id: '',
    name: '',
    description: '',
    features: initialFeatures,
    price: 0
  },
  additionalServices: [],
  services: [],
  totalCost: 0,
  paidAmount: 0
};