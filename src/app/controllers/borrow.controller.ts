import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
import { Book } from '../models/books.models'

export const borrowRoutes = express.Router()

borrowRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    })
  } 
  catch (error: any) {
    res.status(400).json({
      message: error.message || 'Book borrow failed',
      success: false,
      error
    })
  }
})

borrowRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          _id: 0,
          book: { title: '$bookInfo.title', isbn: '$bookInfo.isbn' },
          totalQuantity: 1
        }
      }
    ])

    res.status(201).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get borrow summary',
      success: false,
      error
    })
  }
})
