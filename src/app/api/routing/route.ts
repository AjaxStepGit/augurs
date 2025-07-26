import { books } from '@/app/_lib/test-data'
import { IBooks } from '@/lib/types'

export async function GET() {
    return Response.json(books)
}

export async function POST(request: Request) {
    const book = await request.json()
    const { title, author, genre, status, year } = await book
    const newBook: IBooks = {
        id: books.length + 1,
        title: title,
        author: author,
        genre: genre,
        year: year,
        status: status,
    }

    books.push(newBook)
    return Response.json(
        {
            message: 'Book added successfully',
            book: newBook,
            status: 201,
        },
        {
            status: 201,
        }
    )
}
