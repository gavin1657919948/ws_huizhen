import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('room', { schema: 'websocket_test' })
export class Room {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        length: 64,
        name: 'room_sn',
    })
    roomSn: string | null;

    @Column('datetime', {
        nullable: true,
        name: 'create_at',
    })
    createAt: Date | null;

    @Column('int', {
        nullable: true,
        name: 'doctor_id',
    })
    doctorId: number | null;
    @Column('int', {
        nullable: true,
        name: 'status',
    })
    status: number | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'room_name',
    })
    roomName: string | null;

}
