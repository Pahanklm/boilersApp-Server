import { IBoilerPartsFilter, IBoilerPartsQuery } from './types/index';
import { BoilerParts } from './boiler-parts.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class BoilerPartsService {
    constructor(
        @InjectModel(BoilerParts)
        private boilerPartsModel: typeof BoilerParts
    ) {}

    async paginateAndFilter(
        query: IBoilerPartsQuery,
      ): Promise<{ count: number; rows: BoilerParts[] }> {
        const limit = +query.limit;
        const offset = +query.offset * 20;
        const filter = {} as Partial<IBoilerPartsFilter>;
    
        if (query.priceFrom && query.priceTo) {
          filter.price = {
            [Op.between]: [+query.priceFrom, +query.priceTo],
          };
        }
    
        if (query.boiler) {
          filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler));
        }
    
        if (query.parts) {
          filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
        }
    
        return this.boilerPartsModel.findAndCountAll({
          limit,
          offset,
          where: filter,
        });
      }
    async bestsellers(): Promise<{ count: number; rows: BoilerParts[] }> {
        return this.boilerPartsModel.findAndCountAll({
            where: { bestseller: true },
        });
    }

    async newProducts(): Promise<{ count: number; rows: BoilerParts[] }> {
        return this.boilerPartsModel.findAndCountAll({
            where: { new: true },
        });
    }

    async findOne(id: number | string): Promise<BoilerParts> {
        return this.boilerPartsModel.findOne({
            where: { id },
        });
    }

    async findAll(): Promise<BoilerParts[]> {
        return this.boilerPartsModel.findAll();
    }
    

    async findOneByName(name: string): Promise<BoilerParts> {
        return this.boilerPartsModel.findOne({
            where: { name },
        });
    }

    async searchByString(
        str: string
    ): Promise<{ count: number; rows: BoilerParts[] }> {
        return this.boilerPartsModel.findAndCountAll({
            limit: 20,
            where: { name: { [Op.like]: `%${str}%` } },
        });
    }
}
