import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Todo } from '../../src/modules/todos/todo.entity'
import { TodosService } from '../../src/modules/todos/todos.service'

const mockTodo = {
  title: 'Test Todo',
  description: 'Test Description',
  completed: false
}

const mockTodoModel = {
  create: jest.fn().mockResolvedValue(mockTodo),
  find: jest.fn().mockResolvedValue([mockTodo]),
  findById: jest.fn().mockResolvedValue(mockTodo),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockTodo),
  findByIdAndRemove: jest.fn().mockResolvedValue(mockTodo)
}

describe('TodosService', () => {
  let service: TodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel
        }
      ]
    }).compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should create a todo', async () => {
    const todo = await service.create(mockTodo)
    expect(todo).toEqual(mockTodo)
    expect(mockTodoModel.create).toHaveBeenCalledWith(mockTodo)
  })

  it('should find all todos', async () => {
    const todos = await service.findAll()
    expect(todos).toEqual([mockTodo])
    expect(mockTodoModel.find).toHaveBeenCalled()
  })

  it('should find one todo', async () => {
    const todo = await service.findOne('1')
    expect(todo).toEqual(mockTodo)
    expect(mockTodoModel.findById).toHaveBeenCalledWith('1')
  })

  it('should update a todo', async () => {
    const todo = await service.update('1', mockTodo)
    expect(todo).toEqual(mockTodo)
    expect(mockTodoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      mockTodo,
      { new: true }
    )
  })

  it('should remove a todo', async () => {
    const todo = await service.remove('1')
    expect(todo).toEqual(mockTodo)
    expect(mockTodoModel.findByIdAndRemove).toHaveBeenCalledWith('1')
  })
})
