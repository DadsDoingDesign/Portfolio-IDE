"use client";

import { CaseStudy } from './types';

/**
 * Sample case study data
 * This simulates data that would come from a CMS
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-fintech-app',
    title: 'Fintech Mobile Banking Platform',
    slug: 'fintech-mobile-app',
    company: 'Umba',
    timeline: '2023 - 2024',
    category: ['fintech', 'mobile'],
    summary: 'Redesigned a mobile banking application to improve user experience and increase customer engagement.',
    challenge: 'The existing app had poor user engagement and high drop-off rates during the onboarding process. Transaction flows were complex and confusing for users.',
    solution: 'Completely redesigned the user interface with a focus on simplicity and progressive disclosure. Implemented a streamlined onboarding flow and simplified transaction processes.',
    impact: 'Increased user engagement by 45%, reduced onboarding abandonment by 60%, and improved app store ratings from 3.2 to 4.7 stars.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Fintech', 'UX Design'],
    role: 'Lead Developer',
    team: ['2 Developers', '1 Designer', '1 Product Manager'],
    tools: ['React Native', 'TypeScript', 'Firebase', 'Figma'],
    images: [
      {
        id: 'img-1',
        url: '/images/case-studies/fintech/dashboard.png',
        alt: 'Mobile banking dashboard',
        caption: 'Redesigned dashboard with transaction history and quick actions',
        order: 1
      },
      {
        id: 'img-2',
        url: '/images/case-studies/fintech/transactions.png',
        alt: 'Transaction flow',
        caption: 'Simplified transaction flow with visual confirmation',
        order: 2
      }
    ],
    features: [
      {
        title: 'Streamlined Onboarding',
        description: 'Reduced onboarding steps from 9 to 4 while maintaining security and compliance requirements.'
      },
      {
        title: 'Transaction Simplification',
        description: 'Redesigned transaction flow with visual feedback and confirmation steps.'
      },
      {
        title: 'Performance Optimization',
        description: 'Reduced app size by 30% and improved load times by 50%.'
      }
    ],
    testimonial: {
      quote: 'The redesigned app has transformed our user experience and significantly improved our metrics.',
      author: 'Jane Smith',
      role: 'CEO',
      company: 'Umba'
    }
  },
  {
    id: 'cs-analytics-dashboard',
    title: 'Analytics Dashboard for E-commerce',
    slug: 'analytics-dashboard',
    company: 'Gastrograph',
    timeline: '2022 - 2023',
    category: ['analytics', 'web'],
    summary: 'Built a real-time analytics dashboard for e-commerce businesses to track sales, customer behavior, and inventory.',
    challenge: 'The client needed a way to visualize complex data sets from multiple sources in a user-friendly interface that non-technical team members could use for decision-making.',
    solution: 'Developed a customizable dashboard with modular widgets and interactive visualizations. Implemented real-time data processing and automated reporting.',
    impact: 'Reduced reporting time by 80% and enabled data-driven decision making that increased sales by 23% within 6 months.',
    tags: ['React', 'D3.js', 'Next.js', 'GraphQL', 'AWS'],
    role: 'Frontend Developer',
    team: ['3 Developers', '1 Data Scientist', '1 Product Designer'],
    tools: ['React', 'D3.js', 'Next.js', 'GraphQL', 'AWS Lambda'],
    images: [
      {
        id: 'img-1',
        url: '/images/case-studies/analytics/dashboard.png',
        alt: 'Analytics dashboard overview',
        caption: 'Main dashboard with customizable widgets',
        order: 1
      },
      {
        id: 'img-2',
        url: '/images/case-studies/analytics/reports.png',
        alt: 'Automated reports interface',
        caption: 'Automated reporting system with scheduling options',
        order: 2
      }
    ],
    features: [
      {
        title: 'Interactive Visualizations',
        description: 'Dynamic charts and graphs with drill-down capabilities for detailed analysis.'
      },
      {
        title: 'Custom Report Builder',
        description: 'Drag-and-drop interface for creating custom reports without coding.'
      },
      {
        title: 'Real-time Alerts',
        description: 'Configurable alert system for important metrics and thresholds.'
      }
    ]
  },
  {
    id: 'cs-ai-chatbot',
    title: 'AI-Powered Customer Service Chatbot',
    slug: 'ai-chatbot',
    company: 'Simi',
    timeline: '2023',
    category: ['ai', 'web'],
    summary: 'Developed an AI chatbot that handles customer inquiries for an e-commerce platform, reducing support costs and improving response times.',
    challenge: 'The client was struggling with high support volume and long wait times, leading to customer dissatisfaction and lost sales.',
    solution: 'Built a context-aware chatbot using large language models that can understand customer queries, access product information, and handle common support tasks automatically.',
    impact: 'Reduced support ticket volume by 65%, decreased response time from hours to seconds, and improved customer satisfaction scores by 35%.',
    tags: ['OpenAI', 'React', 'Node.js', 'MongoDB', 'WebSockets'],
    role: 'Full Stack Developer',
    team: ['2 Developers', '1 ML Engineer', '1 UX Designer'],
    tools: ['OpenAI API', 'React', 'Node.js', 'MongoDB', 'WebSockets'],
    images: [
      {
        id: 'img-1',
        url: '/images/case-studies/chatbot/interface.png',
        alt: 'Chatbot interface',
        caption: 'Conversational interface with context awareness',
        order: 1
      },
      {
        id: 'img-2',
        url: '/images/case-studies/chatbot/analytics.png',
        alt: 'Chatbot analytics dashboard',
        caption: 'Admin dashboard for monitoring chatbot performance',
        order: 2
      }
    ],
    features: [
      {
        title: 'Natural Language Understanding',
        description: 'Advanced NLP capabilities to understand customer intent and context.'
      },
      {
        title: 'Product Knowledge Base',
        description: 'Integration with product database for accurate information retrieval.'
      },
      {
        title: 'Human Handoff',
        description: 'Seamless transition to human support agents for complex issues.'
      }
    ],
    testimonial: {
      quote: 'This chatbot has revolutionized our customer service operations. Our team can now focus on complex issues while the AI handles routine inquiries.',
      author: 'Michael Johnson',
      role: 'Customer Service Director',
      company: 'Simi'
    }
  }
];

/**
 * Get all case studies
 */
export function getAllCaseStudies(): Promise<CaseStudy[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(caseStudies);
    }, 500);
  });
}

/**
 * Get a case study by slug
 */
export function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const caseStudy = caseStudies.find(cs => cs.slug === slug);
      resolve(caseStudy || null);
    }, 300);
  });
}

/**
 * Get case studies by category
 */
export function getCaseStudiesByCategory(category: string): Promise<CaseStudy[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredCaseStudies = caseStudies.filter(cs => 
        cs.category.includes(category as any)
      );
      resolve(filteredCaseStudies);
    }, 300);
  });
}
