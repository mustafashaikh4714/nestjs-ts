import { Document } from 'mongoose'

export const cleanDoc = {
  timestamps: true,
  toJSON: {
    transform: (doc: Document, ret: Record<string, any>): void => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
    }
  }
}
