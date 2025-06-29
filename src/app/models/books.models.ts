import { model, Schema } from 'mongoose'
import { IBook } from '../interfaces/books.interface'

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY'
      ],
      required: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    copies: {
      type: Number,
      required: true,
      min: 0
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Update availability based on the number of copies using a instance method
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0
}

// Pre-save hook to update availability before saving
bookSchema.pre<IBook>('save', function (next) {
  this.updateAvailability()
  next()
})

export const Book = model<IBook>('Book', bookSchema)
