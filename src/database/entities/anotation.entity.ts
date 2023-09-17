import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "anotations" })
export class AnotationEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", nullable: false })
  title!: string;

  @Column({ type: "varchar", nullable: false })
  description!: string;

  @Column({ name: "created_at", type: "timestamp", nullable: false })
  createdAt!: Date;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId!: string;

  @ManyToOne(() => UserEntity, (u) => u.anotations)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "anotations_user_id_fkey",
    referencedColumnName: "id",
  })
  user!: UserEntity;
}
