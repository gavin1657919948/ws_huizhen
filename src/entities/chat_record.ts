import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("chat_record",{schema:"websocket_test" } )
export class ChatRecord {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("longtext",{ 
        nullable:true,
        name:"detail"
        })
    detail:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"patient_id"
        })
    patientId:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"doctor_id"
        })
    doctorId:number | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"create_at"
        })
    createAt:Date | null;
        

    @Column("int",{ 
        nullable:true,
        default: () => "'0'",
        name:"type"
        })
    type:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"file_url"
        })
    fileUrl:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"file_suffix_type"
        })
    fileSuffixType:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:64,
        name:"room_sn"
        })
    roomSn:string | null;
        
}
