import Control from '../Control';
import type { SearchQueryParams } from '../../types';

type SearchParams = {
  name?: string;
};

class UsersControl extends Control {
  getUsers() {
    return this.sqlPromise(`SELECT id, username FROM users ORDER BY username`);
  }

  getUser(id: string) {
    return this.sqlPromise(
      `SELECT id, username, visibleName, bio FROM users WHERE id='${id}'`
    );
  }

  searchUsers({
    order,
    page,
    capacity,
    searchParams,
  }: SearchQueryParams<SearchParams>) {
    const { name } = searchParams;
    let conditionsString = '';

    if (name) conditionsString += ` username LIKE '%${name}%'`;

    return this.sqlPromise(
      `SELECT id, username, visibleName FROM users ${
        conditionsString ? 'WHERE' + conditionsString : ''
      } ORDER BY ${order} LIMIT ${capacity} OFFSET ${capacity * (page - 1)}`
    );
  }
}
export default UsersControl;
