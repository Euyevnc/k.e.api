import { NextFunction, Response, Request } from 'express';

function asyncWrapper(fn: (req: Request) => unknown) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req))
      .then((result) => res.send(result))
      .catch((err) => next(err));
  };
}

function sqlPromise(connection: Record<string, any>, sqlRequest: string) {
  return new Promise((resolve, reject) => {
    connection.query(sqlRequest, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

export { asyncWrapper, sqlPromise };
