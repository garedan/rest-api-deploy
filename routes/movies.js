import { Router } from "express";
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { createRequire } from 'node:module'
import { MovieModel } from "../models/movie.js";
const require = createRequire(import.meta.url)
const movies = require('../movies.json')
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)