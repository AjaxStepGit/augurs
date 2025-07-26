import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IBooks } from './types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type ErrorObject = {
    title?: string
    author?: string
    genre?: string
    year?: string
}

export function validateBook(book: IBooks): ErrorObject {
    const errors: ErrorObject = {}

    if (typeof book.title !== 'string') {
        errors.title = 'Title has to be a string'
    }

    if (typeof book.author !== 'string') {
        errors.author = 'Author name has to be a string'
    }

    if (typeof book.genre !== 'string') {
        errors.genre = 'Genre has to be a string'
    }

    const yearAsNumber = Number(book.year)

    if (isNaN(yearAsNumber)) {
        if (typeof book.year === 'string' && book.year.length < 4) {
            errors.year = 'Year must be at least 4 digits'
        } else {
            errors.year = 'Year must be a valid number'
        }
    }

    return errors
}
