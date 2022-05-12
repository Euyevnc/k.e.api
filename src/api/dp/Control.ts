import { sqlPromise } from '../../utils/utils';

class Control {
  connection: Record<string, unknown>;

  sqlPromise: (query: string) => Promise<unknown>;

  constructor(connection: Record<string, unknown>) {
    this.connection = connection;
    this.sqlPromise = sqlPromise.bind(null, this.connection);
  }
}

export default Control;
