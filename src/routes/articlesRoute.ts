import express from 'express';
import type { Request, Response } from 'express';

import type Api from '../api/Api';
import {
  ARTICLES_SEARCH_DEFAULT_CAPACITY,
  ARTICLES_SEARCH_DEFAULT_ORDER,
} from '../api/const';

function initRouter(api: Api) {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response) => {
    const data = await api.articles.getArticles();
    res.status(200).send(data);
  });

  router.get('/search', async (req: Request, res: Response) => {
    const page = Math.max(1, +req.query.page || 1);
    const name =
      typeof req.query.name === 'string' ? req.query.name : req.query.name?.[0];

    const data = await api.articles.searchArticles({
      order: ARTICLES_SEARCH_DEFAULT_ORDER,
      capacity: ARTICLES_SEARCH_DEFAULT_CAPACITY,
      page,
      searchParams: { name },
    });
    res.status(200).send(data);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await api.articles.getArticle(id);
    res.status(200).send(data);
  });

  return router;
}

export default initRouter;
