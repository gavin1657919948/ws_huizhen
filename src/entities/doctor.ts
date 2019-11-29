import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("doctor", { schema: "websocket_test" })
export class Doctor {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "doctor_id"
    })
    doctorId: number;


    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "name"
    })
    name: string | null;


    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "title"
    })
    title: string | null;


    @Column("varchar", {
        nullable: true,
        name: "agora_token"
    })
    agoraToken: string | null;

}
