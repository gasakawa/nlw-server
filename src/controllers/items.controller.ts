import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
  async index(req: Request, res: Response): Promise<any> {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      imageURL: `http://192.168.1.108:3333/uploads/${item.image}`,
    }));
    return res.json(serializedItems);
  }
}
