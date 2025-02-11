import { Test, TestingModule } from '@nestjs/testing'

import { CreateTodoDto, UpdateTodoDto } from '../../src/modules/todos/todo.dto'
import { TodosController } from '../../src/modules/todos/todos.controller'
import { TodosService } from '../../src/modules/todos/todos.service'

const mockTodo = {
  title: 'Test Todo',
  description: 'Test Description',
  completed: false
}

const mockTodosService = {
  create: jest.fn().mockResolvedValue(mockTodo),
  findAll: jest.fn().mockResolvedValue([mockTodo]),
  findOne: jest.fn().mockResolvedValue(mockTodo),
  update: jest.fn().mockResolvedValue(mockTodo),
  remove: jest.fn().mockResolvedValue(mockTodo)
}

describe('TodosController', () => {
  let controller: TodosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService
        }
      ]
    }).compile()

    controller = module.get<TodosController>(TodosController)
  })

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test Todo',
      description: 'Test Description',
      completed: false
    }
    const todo = await controller.create(createTodoDto)
    expect(todo).toEqual(mockTodo)
    expect(mockTodosService.create).toHaveBeenCalledWith(createTodoDto)
  })

  it('should find all todos', async () => {
    const todos = await controller.findAll()
    expect(todos).toEqual([mockTodo])
    expect(mockTodosService.findAll).toHaveBeenCalled()
  })

  it('should find one todo', async () => {
    const todo = await controller.findOne('1')
    expect(todo).toEqual(mockTodo)
    expect(mockTodosService.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      title: 'Updated Todo',
      description: 'Updated Description',
      completed: true
    }
    const todo = await controller.update('1', updateTodoDto)
    expect(todo).toEqual(mockTodo)
    expect(mockTodosService.update).toHaveBeenCalledWith('1', updateTodoDto)
  })

  it('should remove a todo', async () => {
    const todo = await controller.remove('1')
    expect(todo).toEqual(mockTodo)
    expect(mockTodosService.remove).toHaveBeenCalledWith('1')
  })
})
