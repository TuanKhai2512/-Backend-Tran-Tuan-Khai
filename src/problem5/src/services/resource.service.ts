import { Op } from 'sequelize';
import Resource from '../models/resource.model';
import { CreateResourceDto, UpdateResourceDto, FilterResourceDto } from '../types';

export class ResourceService {
  async create(data: CreateResourceDto, userId: number): Promise<Resource> {
    try {
      const resource = await Resource.create({
        name: data.name,
        description: data.description,
        userId: userId
      });
      return resource;
    } catch (error) {
      console.error('Create resource error:', error);
      throw error;
    }
  }

  async findAll(filters: FilterResourceDto): Promise<{ rows: Resource[]; count: number }> {
    const { name, page = 1, limit = 10 } = filters;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    return Resource.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Resource | null> {
    return Resource.findByPk(id);
  }

  async update(id: number, data: UpdateResourceDto, userId: number): Promise<Resource | null> {
    const resource = await Resource.findOne({ where: { id, userId } });
    if (!resource) return null;
    
    return resource.update(data);
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const deleted = await Resource.destroy({ where: { id, userId } });
    return deleted > 0;
  }
} 