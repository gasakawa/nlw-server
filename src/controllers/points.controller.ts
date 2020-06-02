import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointsController {
  async create(req: Request, res: Response): Promise<any> {
    const { name, email, whatsapp, lat, lng, city, uf, items } = req.body;
    try {
      const trx = await knex.transaction();

      const point = {
        name,
        email,
        whatsapp,
        lat,
        lng,
        city,
        uf,
        image:
          'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      };

      const [insertedId] = await trx('points').insert(point);

      const pointItems = items.map((itemId: number) => {
        return {
          item_id: itemId,
          point_id: insertedId,
        };
      });

      await trx('point_items').insert(pointItems);

      await trx.commit();

      return res.json({
        ...point,
        id: insertedId,
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ message: 'point not found' });
    }

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({
      point,
      items,
    });
  }

  async index(req: Request, res: Response): Promise<any> {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return res.json(points);
  }
}
