"use client";

import { ApiResponse, CaseStudy } from './types';
import { getAllCaseStudies, getCaseStudyBySlug, getCaseStudiesByCategory } from './data';

/**
 * CMS API client for interacting with case study content
 * This implementation uses local data but is structured to be easily
 * replaced with an actual CMS API integration in the future
 */
export class CmsClient {
  private baseUrl: string = '/api/cms';
  
  /**
   * Get all case studies
   */
  async getCaseStudies(): Promise<ApiResponse<CaseStudy[]>> {
    try {
      // In a real implementation, this would be a fetch call to an API
      const caseStudies = await getAllCaseStudies();
      
      return {
        data: caseStudies,
        meta: {
          pagination: {
            page: 1,
            pageSize: caseStudies.length,
            pageCount: 1,
            total: caseStudies.length
          }
        }
      };
    } catch (error) {
      console.error('Error fetching case studies:', error);
      throw error;
    }
  }
  
  /**
   * Get a case study by slug
   */
  async getCaseStudy(slug: string): Promise<ApiResponse<CaseStudy>> {
    try {
      const caseStudy = await getCaseStudyBySlug(slug);
      
      if (!caseStudy) {
        throw new Error(`Case study with slug "${slug}" not found`);
      }
      
      return {
        data: caseStudy
      };
    } catch (error) {
      console.error(`Error fetching case study with slug "${slug}":`, error);
      throw error;
    }
  }
  
  /**
   * Get case studies by category
   */
  async getCaseStudiesByCategory(category: string): Promise<ApiResponse<CaseStudy[]>> {
    try {
      const caseStudies = await getCaseStudiesByCategory(category);
      
      return {
        data: caseStudies,
        meta: {
          pagination: {
            page: 1,
            pageSize: caseStudies.length,
            pageCount: 1,
            total: caseStudies.length
          }
        }
      };
    } catch (error) {
      console.error(`Error fetching case studies for category "${category}":`, error);
      throw error;
    }
  }
  
  /**
   * Search case studies by query
   */
  async searchCaseStudies(query: string): Promise<ApiResponse<CaseStudy[]>> {
    try {
      const allCaseStudies = await getAllCaseStudies();
      
      // Simple search implementation - this would be more sophisticated in a real CMS
      const normalizedQuery = query.toLowerCase();
      const results = allCaseStudies.filter(cs => {
        return (
          cs.title.toLowerCase().includes(normalizedQuery) ||
          cs.summary.toLowerCase().includes(normalizedQuery) ||
          cs.company.toLowerCase().includes(normalizedQuery) ||
          cs.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
        );
      });
      
      return {
        data: results,
        meta: {
          pagination: {
            page: 1,
            pageSize: results.length,
            pageCount: 1,
            total: results.length
          }
        }
      };
    } catch (error) {
      console.error(`Error searching case studies with query "${query}":`, error);
      throw error;
    }
  }
}

// Export a singleton instance for convenience
export const cmsClient = new CmsClient();
