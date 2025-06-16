import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class v_color {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  c_name: string;

  @Field()
  @Column()
  c_hex: string;

  @Field()
  @Column()
  c_rgb: string;
}