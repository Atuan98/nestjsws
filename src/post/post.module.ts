import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { CategoryController } from './controllers/category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './models/post.model';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';
import { UserModule } from 'src/user/user.module';
import { CategorySchema } from './models/category.model';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema
      },
    ]),
  ],
  controllers: [PostController, CategoryController],
  providers: [PostService, PostRepository, CategoryRepository, CategoryService],
})
export class PostsModule { }
