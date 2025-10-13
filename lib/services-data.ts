export interface ServiceData {
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton: {
      text: string;
      href: string;
    };
  };
  feature: {
    tagline: string;
    title: string;
    description: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    image: string;
    imageAlt: string;
  };
  content: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  showcase: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      buttonText: string;
    }>;
  };
  testimonials: Array<{
    quote: string;
    author: string;
    position: string;
    company: string;
    companyLogo: string;
    image: string;
    imageAlt: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    image: string;
    imageAlt: string;
  };
}

export const servicesData: ServiceData[] = [
  {
    slug: "custom-software",
    meta: {
      title: "Custom Software Development | Moodbod Digital Agency",
      description:
        "Transform your business with tailored custom software solutions designed to streamline operations and boost productivity.",
      keywords: [
        "custom software",
        "web applications",
        "business automation",
        "software development",
        "digital transformation",
      ],
    },
    hero: {
      tagline: "Tailored",
      title: "Custom Software Solutions",
      description:
        "Every business has unique challenges that require personalized solutions. Our custom software and web applications are designed to streamline your operations and enhance productivity.",
      primaryButton: {
        text: "Learn More",
        href: "#feature",
      },
      secondaryButton: {
        text: "Get Started",
        href: "/contact",
      },
    },
    feature: {
      tagline: "Streamline",
      title: "Transform Your Business with Custom Software",
      description:
        "Custom software solutions are designed to simplify your daily operations. By tailoring tools to your unique workflow, we help you save time and enhance productivity.",
      benefits: [
        {
          title: "Efficiency Boost",
          description:
            "Automate repetitive tasks and focus on what truly matters for your business.",
        },
        {
          title: "User-Friendly",
          description:
            "Our solutions are intuitive, making it easy for your team to adapt and thrive.",
        },
      ],
      image: "/images/services/service-software.jpg",
      imageAlt:
        "Custom software development workspace with code and design tools",
    },
    content: {
      title:
        "Empower Your Team with Custom Web Applications for Seamless Adaptation",
      description:
        "In today's fast-paced environment, web applications enable teams to pivot quickly and efficiently. Tailored solutions ensure that your business can respond to changes and challenges with agility.",
      image: "/images/services/service-software.jpg",
      imageAlt: "Team collaborating on custom software development",
    },
    showcase: {
      title:
        "Unlock Your Potential with Tailored Software Solutions for Your Business Needs",
      description:
        "Choosing custom software and web applications enhances your business efficiency by streamlining operations and reducing manual tasks. These solutions are designed to adapt to your unique workflows, ensuring that your team can respond swiftly to changing demands. Ultimately, improved workflows lead to increased productivity and higher satisfaction for both employees and customers.",
      image: "/images/services/service-software.jpg",
      imageAlt: "Business transformation through custom software solutions",
    },
    process: {
      title:
        "Transforming your vision into tailored software solutions for your business.",
      description:
        "Our process begins with a thorough consultation to understand your unique needs. We collaborate closely with you to design and develop custom software that enhances your operations. Finally, we ensure a smooth deployment, so you can start reaping the benefits immediately.",
      steps: [
        {
          title:
            "A seamless journey from concept to creation of your software solution.",
          description:
            "We prioritize your goals at every stage of development.",
          buttonText: "Start",
        },
        {
          title:
            "Iterative feedback ensures your software meets expectations and requirements.",
          description:
            "We value your input to refine and perfect the solution.",
          buttonText: "Review",
        },
        {
          title: "Launch your custom software and watch your business thrive.",
          description:
            "Experience the impact of tailored technology in your operations.",
          buttonText: "Go",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "Moodbod's custom software transformed our workflow, making it more efficient and user-friendly. We've seen a significant increase in productivity since implementation.",
        author: "Jane Doe",
        position: "CEO",
        company: "Tech Innovations",
        companyLogo: "/images/clients/tech-innovations-logo.svg",
        image: "/images/testimonials/testimonial-jane-doe.jpg",
        imageAlt: "Jane Doe, CEO of Tech Innovations",
      },
    ],
    cta: {
      title: "Transform Your Business Today",
      description:
        "Get a personalized consultation for custom software solutions tailored to your unique business needs.",
      buttonText: "Get Started",
      image: "/images/cta/cta-main.jpg",
      imageAlt: "Custom software development consultation",
    },
  },
  {
    slug: "ecommerce",
    meta: {
      title: "E-commerce Development | Moodbod Digital Agency",
      description:
        "Build powerful online stores that convert visitors into customers with our comprehensive e-commerce solutions.",
      keywords: [
        "e-commerce",
        "online store",
        "digital commerce",
        "shopify",
        "woocommerce",
        "online retail",
      ],
    },
    hero: {
      tagline: "E-commerce",
      title: "E-commerce & Digital Commerce Solutions",
      description:
        "Build powerful online stores that convert visitors into customers with our comprehensive e-commerce solutions. From design to deployment, we create seamless shopping experiences.",
      primaryButton: {
        text: "Learn More",
        href: "#feature",
      },
      secondaryButton: {
        text: "Get Started",
        href: "/contact",
      },
    },
    feature: {
      tagline: "Convert",
      title: "Transform Your Business with E-commerce Solutions",
      description:
        "E-commerce solutions are designed to maximize your online sales potential. By creating user-friendly stores with optimized checkout processes, we help you reach more customers and increase revenue.",
      benefits: [
        {
          title: "Sales Growth",
          description:
            "Optimized user experience and conversion funnels to maximize your online sales.",
        },
        {
          title: "Mobile-First",
          description:
            "Responsive design ensures your store works perfectly on all devices.",
        },
      ],
      image: "/images/services/service-ecommerce.jpg",
      imageAlt:
        "Modern e-commerce platform with online shopping cart and payment processing",
    },
    content: {
      title: "Empower Your Business with Mobile-First E-commerce Solutions",
      description:
        "In today's mobile-first world, your e-commerce platform must work seamlessly across all devices. Our solutions ensure your customers can shop easily from anywhere, anytime.",
      image: "/images/services/service-ecommerce.jpg",
      imageAlt: "Mobile e-commerce shopping experience",
    },
    showcase: {
      title: "Unlock Your Potential with Advanced E-commerce Solutions",
      description:
        "Choosing the right e-commerce platform enhances your business reach by connecting you with customers worldwide. These solutions are designed to scale with your growth, ensuring that your online presence can handle increased traffic and sales. Ultimately, a well-designed e-commerce platform leads to higher conversion rates and customer satisfaction.",
      image: "/images/services/service-ecommerce.jpg",
      imageAlt: "E-commerce business growth and digital transformation",
    },
    process: {
      title:
        "Transforming your vision into a powerful e-commerce platform for your business.",
      description:
        "Our process begins with understanding your products and target audience. We design and develop an e-commerce solution that showcases your brand and converts visitors into customers. Finally, we ensure smooth integration with payment processors and inventory management systems.",
      steps: [
        {
          title: "A seamless journey from concept to your online store launch.",
          description:
            "We prioritize your brand and customer experience at every stage of development.",
          buttonText: "Start",
        },
        {
          title:
            "Iterative feedback ensures your store meets customer expectations.",
          description:
            "We value your input to create the perfect shopping experience.",
          buttonText: "Review",
        },
        {
          title: "Launch your e-commerce store and watch your sales grow.",
          description:
            "Experience the impact of a professional online presence.",
          buttonText: "Go",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "Our e-commerce platform built by Moodbod has increased our online sales by 300%. The user experience is flawless and our customers love the checkout process.",
        author: "Mike Johnson",
        position: "Founder",
        company: "Retail Plus",
        companyLogo: "/images/clients/retail-plus-logo.svg",
        image: "/images/testimonials/testimonial-mike-johnson.jpg",
        imageAlt: "Mike Johnson, Founder of Retail Plus",
      },
    ],
    cta: {
      title: "Launch Your Online Store Today",
      description:
        "Get a personalized consultation for e-commerce solutions that will transform your business and increase your online sales.",
      buttonText: "Get Started",
      image: "/images/cta/cta-main.jpg",
      imageAlt: "E-commerce development consultation",
    },
  },
  {
    slug: "ai-automation",
    meta: {
      title: "AI & Automation Solutions | Moodbod Digital Agency",
      description:
        "Leverage artificial intelligence and automation to streamline your processes and boost productivity with our cutting-edge AI solutions.",
      keywords: [
        "AI automation",
        "artificial intelligence",
        "business automation",
        "machine learning",
        "process optimization",
        "digital transformation",
      ],
    },
    hero: {
      tagline: "Innovation",
      title: "AI & Automation Solutions",
      description:
        "Leverage artificial intelligence and automation to streamline your processes and boost productivity. Our AI solutions help you make better decisions and automate repetitive tasks.",
      primaryButton: {
        text: "Learn More",
        href: "#feature",
      },
      secondaryButton: {
        text: "Get Started",
        href: "/contact",
      },
    },
    feature: {
      tagline: "Automate",
      title: "Transform Your Business with AI & Automation",
      description:
        "AI and automation solutions are designed to revolutionize your business operations. By implementing intelligent systems, we help you reduce manual work and make data-driven decisions.",
      benefits: [
        {
          title: "Smart Automation",
          description:
            "Automate complex processes with AI that learns and adapts to your business needs.",
        },
        {
          title: "Data Insights",
          description:
            "Transform your data into actionable insights with machine learning algorithms.",
        },
      ],
      image: "/images/services/service-ai-automation.jpg",
      imageAlt:
        "Artificial intelligence and automation technology with data analytics",
    },
    content: {
      title:
        "Empower Your Team with AI-Powered Solutions for Intelligent Automation",
      description:
        "In today's data-driven world, AI solutions enable businesses to make smarter decisions faster. Our intelligent automation ensures that your processes adapt and improve over time.",
      image: "/images/services/service-ai-automation.jpg",
      imageAlt: "AI-powered business automation and machine learning",
    },
    showcase: {
      title: "Unlock Your Potential with Advanced AI & Automation Solutions",
      description:
        "Choosing AI and automation enhances your business intelligence by processing data faster and more accurately than ever before. These solutions are designed to learn from your operations, ensuring continuous improvement and optimization. Ultimately, AI-powered automation leads to increased efficiency and competitive advantage.",
      image: "/images/services/service-ai-automation.jpg",
      imageAlt: "AI automation transforming business operations",
    },
    process: {
      title:
        "Transforming your vision into intelligent automation solutions for your business.",
      description:
        "Our process begins with analyzing your current workflows and identifying automation opportunities. We develop AI solutions that integrate seamlessly with your existing systems. Finally, we ensure smooth implementation with training and ongoing support.",
      steps: [
        {
          title:
            "A seamless journey from concept to intelligent automation implementation.",
          description:
            "We prioritize your business goals and data security at every stage of development.",
          buttonText: "Start",
        },
        {
          title:
            "Iterative feedback ensures your AI solutions meet business requirements.",
          description:
            "We value your input to refine and optimize the automation processes.",
          buttonText: "Review",
        },
        {
          title:
            "Launch your AI solutions and watch your business become more intelligent.",
          description:
            "Experience the power of AI-driven automation in your operations.",
          buttonText: "Go",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "The AI automation solutions from Moodbod have revolutionized our operations. We've reduced manual work by 80% and our decision-making is now data-driven and incredibly accurate.",
        author: "Sarah Chen",
        position: "CTO",
        company: "DataFlow Systems",
        companyLogo: "/images/clients/dataflow-systems-logo.svg",
        image: "/images/testimonials/testimonial-sarah-chen.jpg",
        imageAlt: "Sarah Chen, CTO of DataFlow Systems",
      },
    ],
    cta: {
      title: "Automate Your Business Today",
      description:
        "Get a personalized consultation for AI and automation solutions that will transform your business operations and boost productivity.",
      buttonText: "Get Started",
      image: "/images/cta/cta-main.jpg",
      imageAlt: "AI automation consultation",
    },
  },
  {
    slug: "mobile-apps",
    meta: {
      title: "Mobile App Development | Moodbod Digital Agency",
      description:
        "Engage your customers anytime, anywhere with our user-friendly mobile app solutions for iOS and Android platforms.",
      keywords: [
        "mobile app development",
        "iOS app",
        "Android app",
        "mobile applications",
        "app design",
        "mobile solutions",
      ],
    },
    hero: {
      tagline: "Mobile",
      title: "Mobile App Development",
      description:
        "Engage your customers anytime, anywhere with our user-friendly mobile app solutions. From iOS to Android, we create apps that your users will love.",
      primaryButton: {
        text: "Learn More",
        href: "#feature",
      },
      secondaryButton: {
        text: "Get Started",
        href: "/contact",
      },
    },
    feature: {
      tagline: "Connect",
      title: "Transform Your Business with Mobile Apps",
      description:
        "Mobile app solutions are designed to keep your customers engaged and connected. By creating intuitive apps, we help you build stronger relationships with your audience.",
      benefits: [
        {
          title: "User Engagement",
          description:
            "Create engaging mobile experiences that keep your customers coming back.",
        },
        {
          title: "Cross-Platform",
          description:
            "Native iOS and Android apps that work seamlessly on all devices.",
        },
      ],
      image: "/images/services/service-mobile-apps.jpg",
      imageAlt:
        "Modern mobile app development with smartphone interface design",
    },
    content: {
      title:
        "Empower Your Business with Mobile-First Solutions for Maximum Reach",
      description:
        "In today's mobile-first world, your customers expect seamless experiences on their smartphones. Our mobile solutions ensure your business is always accessible and engaging.",
      image: "/images/services/service-mobile-apps.jpg",
      imageAlt: "Mobile app development and user experience design",
    },
    showcase: {
      title: "Unlock Your Potential with Professional Mobile App Solutions",
      description:
        "Choosing mobile app development enhances your customer engagement by providing convenient access to your services. These solutions are designed to work offline and online, ensuring that your customers can interact with your business anytime. Ultimately, a well-designed mobile app leads to increased customer loyalty and business growth.",
      image: "/images/services/service-mobile-apps.jpg",
      imageAlt: "Mobile app business growth and customer engagement",
    },
    process: {
      title:
        "Transforming your vision into powerful mobile applications for your business.",
      description:
        "Our process begins with understanding your target audience and app requirements. We design and develop native mobile apps that provide exceptional user experiences. Finally, we ensure smooth deployment to app stores with ongoing maintenance and updates.",
      steps: [
        {
          title: "A seamless journey from concept to your mobile app launch.",
          description:
            "We prioritize user experience and performance at every stage of development.",
          buttonText: "Start",
        },
        {
          title: "Iterative feedback ensures your app meets user expectations.",
          description:
            "We value your input to create the perfect mobile experience.",
          buttonText: "Review",
        },
        {
          title:
            "Launch your mobile app and watch your customer engagement soar.",
          description:
            "Experience the impact of a professional mobile presence.",
          buttonText: "Go",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "The mobile app developed by Moodbod has transformed our customer engagement. Our users love the intuitive interface and we've seen a 250% increase in customer interactions.",
        author: "David Rodriguez",
        position: "Product Manager",
        company: "ConnectApp",
        companyLogo: "/images/clients/connectapp-logo.svg",
        image: "/images/testimonials/testimonial-david-rodriguez.jpg",
        imageAlt: "David Rodriguez, Product Manager at ConnectApp",
      },
    ],
    cta: {
      title: "Launch Your Mobile App Today",
      description:
        "Get a personalized consultation for mobile app solutions that will engage your customers and grow your business.",
      buttonText: "Get Started",
      image: "/images/cta/cta-main.jpg",
      imageAlt: "Mobile app development consultation",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug);
}
