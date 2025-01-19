import { Request, Response } from 'express';
import { ResourceService } from '../services/resource.service';
import { AuthRequest } from '../middleware/auth.middleware';

const resourceService = new ResourceService();

export class ResourceController {
  async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'User ID not found in request' });
      }
      const resource = await resourceService.create(req.body, req.user.id);
      return res.status(201).json(resource);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating resource' });
    }
  }

  async findAll(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const filters = req.query;
      const resources = await resourceService.findAll(filters);
      return res.json(resources);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching resources' });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const resource = await resourceService.findOne(parseInt(req.params.id));
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      return res.json(resource);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching resource' });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const resource = await resourceService.update(
        parseInt(req.params.id),
        req.body,
        req.user!.id
      );
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      return res.json(resource);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating resource' });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const deleted = await resourceService.delete(
        parseInt(req.params.id),
        req.user!.id
      );
      if (!deleted) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting resource' });
    }
  }
} 