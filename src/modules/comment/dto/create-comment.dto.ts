import { IsArray, IsDate, isEmail, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { CommentDto } from './comment.dto'

export class CreateCommentDto {
  @IsDate()
  @IsNotEmpty({ message: 'Provide post date' })
  postDate: Date

  @IsString({ message: 'Wrong data type' })
  @IsNotEmpty({ message: 'Provide username' })
  @MinLength(3, { message: 'Provide username' })
  username: string

  @IsString({ message: 'Wrong data type' })
  @IsNotEmpty({ message: 'Provide comment' })
  comment: string

  @IsEmail(undefined, { message: 'provide an email' })
  @IsNotEmpty({ message: 'Provide an email' })
  email: string

  @IsString({ message: 'Wrong data type' })
  @IsOptional()
  homepageUrl?: string

  @IsArray()
  @IsOptional()
  images?: string[]

  @IsArray({ message: 'Must be an array' })
  repliesComments: CommentDto[]
}
