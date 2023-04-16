import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator'

export class CommentDto {
  @IsInt()
  id: number

  @IsDate()
  postDate: Date

  @IsString()
  username: string

  @IsString()
  comment: string

  @IsString()
  email: string

  @IsString()
  @IsOptional()
  homepageUrl?: string

  @IsInt()
  depth: number

  @IsArray({ message: 'Must be an array' })
  repliesComments: CommentDto[]
}
