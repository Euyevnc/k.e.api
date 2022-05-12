import Control from '../Control';
import type { SearchQueryParams } from '../../types';

type SearchParams = {
  name: string;
};

class ArticlesControl extends Control {
  getArticles() {
    return this.sqlPromise(`SELECT id, name FROM articles ORDER BY name`);
  }

  getArticle(id: string) {
    return this.sqlPromise(
      `SELECT id, name, ownerId, ownerName, created FROM articles WHERE id='${id}'`
    );
  }

  searchArticles({
    order,
    page,
    capacity,
    searchParams,
  }: SearchQueryParams<SearchParams>) {
    const { name } = searchParams;
    let conditionsString = '';

    if (name) conditionsString += ` name LIKE '%${name}%'`;

    return this.sqlPromise(
      `SELECT id, name, ownerId, ownerName, created FROM articles ${
        conditionsString ? 'WHERE' + conditionsString : ''
      } ORDER BY ${order} LIMIT ${capacity} OFFSET ${capacity * (page - 1)}`
    );
  }
}
export default ArticlesControl;
