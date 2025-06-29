import { model, Schema } from 'mongoose'
import { IBorrow } from '../interfaces/borrow.interface'
import { Book } from './books.models'

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    dueDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

borrowSchema.pre<IBorrow>('save', async function (next) {
  const book = await Book.findById(this.book)
  if (!book) {
    return next(new Error('Book not found'))
  }

  if (book.copies < this.quantity) {
    return next(new Error(`Sorry, Only ${book.copies} copies available but you requested ${this.quantity} copies.`))
  }


  book.copies -= this.quantity
  book.updateAvailability() // instance method
  await book.save()

  next()
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema)
