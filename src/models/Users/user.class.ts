import { BaseClass } from "../BaseClass/baseClass.class";

export class User extends BaseClass {
  constructor(
    private name: string,
    private email: string,
    private password: string
  ) {
    super();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
