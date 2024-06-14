import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersManagment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  problems: boolean;
}
