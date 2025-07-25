import { books } from '@/app/_lib/test-data'

export async function GET(
    _reques: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const index = books.findIndex((book) => book.id === parseInt(id))

    return Response.json(books[index])
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const book = await request.json()

    const { id } = await params

    const { title, author, genre, status, year } = book

    const index = books.findIndex((book) => book.id === parseInt(id))

    if (index === -1)
        return Response.json(
            {
                message: 'Book Not Found',
            },
            { status: 401 }
        )

    books[index].title = title
    books[index].author = author
    books[index].genre = genre
    books[index].status = status
    books[index].year = year

    return Response.json({
        message: 'Book Information Edited',
        book: books[index],
    })
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const index = books.findIndex((book) => book.id === parseInt(id))

    books.splice(index, 1)

    return Response.json({
        message: 'Book Removed  Successfully !!',
    })
}
