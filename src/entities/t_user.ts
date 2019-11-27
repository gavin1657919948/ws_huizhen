import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('t_user' , {schema: 'websocket_test' } )
export class TUser {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id',
        })
    userId: number;

    @Column('int', {
        nullable: true,
        default: () => '\'0\'',
        name: 'is_doctor',
        })
    isDoctor: number | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'name',
        })
    name: string | null;

}
