import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/utils/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<Category>
    ){
        super(categoryModel)
    }
}
