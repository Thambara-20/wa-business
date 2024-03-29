import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user";
import { Button } from "./button";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Button, button => button.template, { cascade: true })
  buttons: Button[];
}
