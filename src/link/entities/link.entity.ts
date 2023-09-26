import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column({ nullable: true, default: null })
  description: string;

  @CreateDateColumn()
  created_at: number;

  @CreateDateColumn()
  updated_at: number;
}
