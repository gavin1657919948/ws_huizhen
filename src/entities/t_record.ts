// tslint:disable-next-line:quotemark
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// tslint:disable-next-line:quotemark
@Entity("t_record", { schema: "websocket_test" })
export class TRecord {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('longtext', {
        nullable: true,
        name: 'detail',
    })
    detail: string | null;

    @Column('int', {
        nullable: true,
        name: 'user_id',
    })
    userId: number | null;

    @Column('int', {
        nullable: true,
        name: 'room_id',
    })
    roomId: number | null;

    @Column('datetime', {
        nullable: true,
        name: 'create_at',
    })
    createAt: Date | null;

}
