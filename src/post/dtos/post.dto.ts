import { IsNotEmpty } from "class-validator";

export class CreatePostDto{
    @IsNotEmpty()
    title: string
    description: string
    content: string
    user: any
    categories: [string]
}

export class UpdatePostDto{
    @IsNotEmpty()
    id: string
    @IsNotEmpty()
    title: string
    description: string
    content: string
}