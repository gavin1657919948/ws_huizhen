import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("board_record", { schema: "websocket_test" })
export class BoardRecord {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "x"
    })
    x: string | null;


    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "y"
    })
    y: string | null;


    @Column("datetime", {
        nullable: true,
        name: "create_time"
    })
    createTime: Date | null;


    @Column("bigint", {
        nullable: true,
        name: "audio_ms"
    })
    audioMs: string | null;


    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "color"
    })
    color: string | null;

}
