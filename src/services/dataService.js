/**
 * Data Service & API Abstraction Layer
 * 
 * Provides an asynchronous service interface for all portfolio data.
 * Ready for seamless transition to REST API + Express + MongoDB backend:
 * Simply toggle VITE_USE_API=true in .env to point to a live backend.
 */

import { profileData } from '../data/profile.js';
import { technicalSkills, professionalSkills, skillCategories } from '../data/skills.js';
import { projectsData, projectCategories } from '../data/projects.js';
import { experienceData } from '../data/experience.js';
import { servicesData } from '../data/services.js';
import { socialsData } from '../data/socials.js';
import { bpoStrengthsData, bpoMetricsOverview } from '../data/bpoStrengths.js';

const USE_API = import.meta.env.VITE_USE_API === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const dataService = {
  /**
   * Fetch core profile information
   */
  async getProfile() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile from API');
      return await res.json();
    }
    return Promise.resolve(profileData);
  },

  /**
   * Fetch all skills (Technical and Professional)
   */
  async getSkills() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/skills`);
      if (!res.ok) throw new Error('Failed to fetch skills from API');
      return await res.json();
    }
    return Promise.resolve({
      technical: technicalSkills,
      professional: professionalSkills,
      categories: skillCategories,
    });
  },

  /**
   * Fetch portfolio projects
   */
  async getProjects() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects from API');
      return await res.json();
    }
    return Promise.resolve({
      projects: projectsData,
      categories: projectCategories,
      featured: projectsData.find((p) => p.featured) || projectsData[0],
    });
  },

  /**
   * Fetch experience and timeline
   */
  async getExperience() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/experience`);
      if (!res.ok) throw new Error('Failed to fetch experience from API');
      return await res.json();
    }
    return Promise.resolve(experienceData);
  },

  /**
   * Fetch personal services / capabilities
   */
  async getServices() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (!res.ok) throw new Error('Failed to fetch services from API');
      return await res.json();
    }
    return Promise.resolve(servicesData);
  },

  /**
   * Fetch social links
   */
  async getSocials() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/socials`);
      if (!res.ok) throw new Error('Failed to fetch socials from API');
      return await res.json();
    }
    return Promise.resolve(socialsData);
  },

  /**
   * Fetch dedicated BPO and operations strengths
   */
  async getBpoStrengths() {
    if (USE_API) {
      const res = await fetch(`${API_BASE_URL}/bpo-strengths`);
      if (!res.ok) throw new Error('Failed to fetch BPO strengths from API');
      return await res.json();
    }
    return Promise.resolve({
      strengths: bpoStrengthsData,
      metrics: bpoMetricsOverview,
    });
  },

  /**
   * Submit Contact Form (delegates to centralized contactService)
   * @param {Object} messageData
   */
  async submitContact(messageData) {
    const { contactService } = await import('./contactService.js');
    return contactService.sendMessage(messageData);
  },
};
