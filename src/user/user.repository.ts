import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/utils/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>
    ){
        super(userModel)
    }
}
