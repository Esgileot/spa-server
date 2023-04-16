import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('timestamp')
  postDate: Date

  @Column()
  username: string

  @Column()
  comment: string

  @Column()
  email: string

  @Column({ nullable: true })
  homepageUrl?: string

  @Column('jsonb', { nullable: true })
  images?: string[]

  @Column({ default: 0 })
  depth: number

  @OneToMany(() => Comment, comment => comment.parentComment)
  @JoinColumn()
  repliesComments: Comment[]

  @ManyToOne(() => Comment, comment => comment.repliesComments, { onDelete: 'CASCADE' })
  @JoinColumn()
  parentComment: Comment
}
