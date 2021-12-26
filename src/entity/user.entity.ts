import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:10, nullable:false})
    username: string;
    @Column({nullable:false})
    password: string;
    @Column({length:50, nullable:true})
    nama: string;
    @Column({type:'timestamp', nullable:true, default:  () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    @Column({type:'timestamp', nullable:true})
    updated_at: Date;
    @Column({type:'int', nullable:false, default: 0 })
    level: number;
}