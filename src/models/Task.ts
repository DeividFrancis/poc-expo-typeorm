import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Todo } from "./Todo";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "description", type: "varchar" })
  description!: string;

  @Column({ name: "is_completed", type: "boolean" })
  isCompleted: boolean = false;

  @ManyToOne(() => Todo)
  @JoinColumn({ name: "todo_id" })
  todo!: Todo;
}
