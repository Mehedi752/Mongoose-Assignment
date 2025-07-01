"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_models_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error
        });
    }
}));
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = 10 } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = yield books_models_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching books',
            success: false,
            error
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_models_1.Book.findById(bookId);
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Book not found',
            success: false,
            error
        });
    }
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBook = yield books_models_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true
        });
        // If the book is found, update its availability
        if (updatedBook) {
            updatedBook.updateAvailability();
            yield updatedBook.save();
        }
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(201).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Update failed',
            success: false,
            error
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield books_models_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Book deletion failed',
            success: false,
            error
        });
    }
}));
