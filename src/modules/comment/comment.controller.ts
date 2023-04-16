import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Response, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Comment } from './comment.entity'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import * as path from 'path'
import { diskStorage } from 'multer'

@Controller('comments')
export class CommentController {
  constructor(private readonly userService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getComments(): Promise<CommentDto[]> {
    return await this.userService.getComments()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createComment(@Body('comment') comment: CreateCommentDto): Promise<CommentDto> {
    return await this.userService.createComment(comment)
  }

  @Post('/:id/create-reply')
  @HttpCode(HttpStatus.CREATED)
  public async createRepliesComment(@Body('comment') comment: CreateCommentDto, @Param('id') id: number): Promise<Comment> {
    return await this.userService.createReplies(comment, id)
  }

  @Get('/:path/image')
  @HttpCode(HttpStatus.OK)
  public async getImage(@Response() res, @Param('path') path: number) {
    return res.sendFile(`${__dirname}/images/${path}`)
  }

  @Post('/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FilesInterceptor('images', 8, {
      storage: diskStorage({
        destination: './dist/modules/comment/images',
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}${path.extname(file.originalname)}`
          callback(null, fileName)
        }
      })
    })
  )
  public async upload(@UploadedFiles() files: Array<Express.Multer.File>): Promise<string[]> {
    return this.userService.upload(files)
  }
}
