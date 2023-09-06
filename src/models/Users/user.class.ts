import { BaseClass } from "../BaseClass/baseClass.class";

export type UserJSON = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class User extends BaseClass {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    super();
  }

  public toJSON(): UserJSON {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      password: this._password,
    };
  }
}
