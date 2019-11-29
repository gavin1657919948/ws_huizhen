import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("patient",{schema:"websocket_test" } )
export class Patient {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"patient_id"
        })
    patientId:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"name"
        })
    name:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"create_at"
        })
    createAt:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"update_at"
        })
    updateAt:Date | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"agora_token"
        })
    agoraToken:string | null;
        
}
