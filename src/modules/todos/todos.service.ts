import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateTodoDto, UpdateTodoDto } from './todo.dto'
import { Todo } from './todo.entity'

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto)
    return newTodo.save()
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec()
  }

  async findOne(id: string): Promise<Todo | null> {
    return this.todoModel.findById(id).exec()
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec()
  }

  async remove(id: string): Promise<Todo | null> {
    return this.todoModel.findByIdAndRemove(id).exec()
  }
}
