import express, { Request, Response } from 'express'
import { Book } from '../models/books.models'

export const bookRoutes = express.Router()

bookRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    })
  } catch (error) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error
    })
  }
})

bookRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = 10 } = req.query

    const query: any = {}
    if (filter) query.genre = filter

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit))

    res.status(201).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching books',
      success: false,
      error
    })
  }
})

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)
    res.json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    })
  } catch (error) {
    res.status(404).json({
      message: 'Book not found',
      success: false,
      error
    })
  }
})

bookRoutes.put('/:bookId', async (req: Request, res: Response): Promise<any> => {
  try {
    const bookId = req.params.bookId
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true
    })

    // If the book is found, update its availability
    if (updatedBook) {
      updatedBook.updateAvailability()
      await updatedBook.save()
    }
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      })
    }

    res.status(201).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    })
  } catch (error) {
    res.status(400).json({
      message: 'Update failed',
      success: false,
      error
    })
  }
})

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    await Book.findByIdAndDelete(bookId)

    res.status(201).json({
      success: true,
      message: 'Book deleted successfully',
      data: null
    })
  } catch (error) {
    res.status(404).json({
      message: 'Book deletion failed',
      success: false,
      error
    })
  }
})
