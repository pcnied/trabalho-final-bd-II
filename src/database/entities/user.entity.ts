import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Column({ unique: true, type: "varchar", length: 50 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
  }
}
