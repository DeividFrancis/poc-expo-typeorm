import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

interface TodoParams extends Partial<Todo> {}

@Entity("todos")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "title", type: "varchar" })
  title!: string;

  @Column({ name: "is_completed", type: "boolean" })
  isCompleted: boolean = false;

  tasks?: Task[];
}
