import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiConfigService } from '../config/api-config.service'
import { Comment } from './comment.entity'
import { CommentDto } from './dto/comment.dto'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly config: ApiConfigService
  ) {}

  private async getCommentBranchById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: id }, relations: ['repliesComments'] })

    if (!comment) {
      return null
    }

    const replies = comment.repliesComments

    for (const reply of replies) {
      const nestedReplies = await this.getCommentBranchById(reply.id)
      reply.repliesComments = nestedReplies.repliesComments
    }

    return comment
  }

  public async getComments(): Promise<CommentDto[]> {
    //Get all parent comments
    const comments = await this.commentRepository.createQueryBuilder('comment').where('comment.parentComment is null').getMany()

    //Array of comments
    const parentComment = []
    //Get branche comment for each comment
    const start = Date.now()
    for (const comment of comments) {
      //Add comments branch in array of comments
      parentComment.push(await this.getCommentBranchById(comment.id))
    }

    const end = Date.now() - start
    console.log(end)
    // Return array of comments
    return parentComment
  }

  public async createComment(comment: CreateCommentDto): Promise<CommentDto> {
    return await this.commentRepository.save(comment)
  }

  public async createReplies(comment: CreateCommentDto, parentId: number): Promise<Comment> {
    const parentComment = await this.commentRepository.findOneBy({ id: parentId })
    console.log(comment.images)
    if (parentComment) {
      if (parentComment.depth >= 5) {
        throw new HttpException('Maximum comment depth reached', HttpStatus.BAD_REQUEST)
      }

      return await this.commentRepository.save({ ...comment, parentComment: parentComment, depth: parentComment.depth + 1 })
    }

    throw new HttpException('Parent comment does not exist', HttpStatus.NOT_FOUND)
  }

  public upload(files: Array<Express.Multer.File>): string[] {
    const filesHref: string[] = []
    for (const file of files) {
      filesHref.push(file.filename)
    }
    return filesHref
  }
}
