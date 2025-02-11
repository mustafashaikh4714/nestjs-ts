import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { cleanDoc } from '../../utils/cleanDoc'

@Schema(cleanDoc)
export class Todo extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ default: false })
  completed: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
