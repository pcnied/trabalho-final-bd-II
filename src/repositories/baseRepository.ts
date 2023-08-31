import BaseRepositoryInterface from "./baseRepository.interface";

export abstract class BaseRepository<A> implements BaseRepositoryInterface<A> {
  constructor(protected repository: A[]) {
    this.repository = repository;
  }

  getByOne(key: string, value: string): A | undefined {
    const item = this.repository.find((item) => item[key as keyof A] === value);
    return item || undefined;
  }

  getAll(): A[] {
    return this.repository;
  }

  getById(id: string): A | undefined {
    return this.repository.find((item) => item["id" as keyof A] === id);
  }

  getBy(key: string, value: string): A[] {
    const items = this.repository.filter((item) => {
      return item[key as keyof A] == value;
    });

    return items;
  }

  create(item: A): A {
    this.repository.push(item);
    return item;
  }

  delete(id: string): void {
    const index = this.repository.findIndex(
      (item) => item["id" as keyof A] === id
    );
    this.repository.splice(index, 1);
  }

  update(id: string, item: any): A {
    const indexFound = this.repository.findIndex(
      (item) => item["id" as keyof A] === id
    );
    const keys = Object.keys(item);

    for (const key of keys) {
      this.repository[indexFound][key as keyof A] = item[key];
    }

    return this.repository[indexFound];
  }
}
