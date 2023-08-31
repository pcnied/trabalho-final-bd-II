interface BaseRepositoryInterface<A> {
  getAll(): A[];
  getById(id: string): A | undefined;
  getByOne(key: string, value: string): A | undefined;
  create(item: A): A;
  delete(id: string): void;
  update(id: string, item: any): A;
}

export default BaseRepositoryInterface;
