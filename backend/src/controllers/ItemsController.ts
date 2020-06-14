import express from 'express';
import knex from '../database/connection';
import {API, EXPO} from '../../util/api';

import {Request, Response } from 'express';

class ItemsController {

    async index (req: Request, res: Response){
        const items = await knex('items').select('*');
      
        const serializedItems = items.map(item => {
          return {
            id: item.id,
            title: item.title,
            image_url: `${EXPO}uploads/${item.image}`
          };
        })
      
        return res.json(serializedItems);
      }
}

export default ItemsController;