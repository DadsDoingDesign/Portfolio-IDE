"use client";

/**
 * Case Study content model
 */
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  company: string;
  logo?: string;
  timeline: string;
  category: CaseStudyCategory[];
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  role: string;
  team?: string[];
  tools: string[];
  images: CaseStudyImage[];
  features?: CaseStudyFeature[];
  testimonial?: Testimonial;
}

export type CaseStudyCategory = 
  | 'fintech' 
  | 'mobile' 
  | 'web' 
  | 'ai' 
  | 'analytics' 
  | 'enterprise';

export interface CaseStudyImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
  image?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * API responses
 */
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}
