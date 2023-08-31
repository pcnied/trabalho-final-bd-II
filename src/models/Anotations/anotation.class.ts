import { v4 as uuid } from "uuid";

export class Anotation {
  private _userId: string;
  private _id: string;
  private _title: string;
  private _description: string;
  private _date: string;
  private _archived: boolean;

  constructor(
    userId: string,
    title: string,
    description: string,
    date: string
  ) {
    this._userId = userId;
    this._id = uuid();
    this._title = title;
    this._description = description;
    this._date = date;
    this._archived = false;
  }

  get userId(): string {
    return this._userId;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get date(): string {
    return this._date;
  }

  get archived(): boolean {
    return this._archived;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set date(date: string) {
    this._date = date;
  }

  set archived(archived: boolean) {
    this._archived = archived;
  }
}
