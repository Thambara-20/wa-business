import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Template } from "./template";

@Entity()
export class Button {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Template, template => template.buttons)
  @JoinColumn({ name: "templateId" })
  template: Template;
}
