import UsersControl from './dp/controls/UsersControl';
import ArticlesControl from './dp/controls/ArticlesControl';

import createPool from './dp/createPool';

class Api {
  config: Record<string, unknown>;

  pool: Record<string, unknown>;

  users: UsersControl;

  articles: ArticlesControl;

  constructor(config: Record<string, unknown>) {
    this.config = config;

    this.pool = createPool(this.config);
    this.users = new UsersControl(this.pool);
    this.articles = new ArticlesControl(this.pool);
  }
}

export default Api;
