import { Module } from '@nestjs/common';
import { EventsGateWay } from './events.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
    imports:[UserModule],
    providers: [EventsGateWay]
})
export class GateWayModule {}