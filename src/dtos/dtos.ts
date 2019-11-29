import { ApiModelProperty } from '@nestjs/swagger';

export class DoctorLoginDto {
    @ApiModelProperty({ required: true, description: '医生id' })
    doctorId: number;
    @ApiModelProperty({ required: false, description: '若token失效，则传1可刷新token' })
    type?: number;
}
