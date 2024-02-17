import { Column, Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Tweet } from "src/modules/tweets/entities/tweet.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment') 
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    userName: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(type => Tweet, tweet => tweet.user)
    tweets: Tweet[];

    @CreateDateColumn()
    cretedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}