import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IBooks } from '@/lib/types'
import { TrashIcon } from 'lucide-react'
import DeleteModal from './modal/delete'

export default function BookTable({ books }: { books: IBooks[] }) {
    return (
        <div className="p-2 w-full">
            <Table className="w-full">
                <TableHeader className="w-full">
                    <TableRow className="w-full text-white font-semibold text-3xl">
                        <TableHead className="capitalize">Title</TableHead>
                        <TableHead className="capitalize">Author</TableHead>
                        <TableHead className="capitalize">genre</TableHead>
                        <TableHead className="capitalize">
                            published year
                        </TableHead>
                        <TableHead className="capitalize">status</TableHead>
                        <TableHead className="capitalize">actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow
                            className="font-medium p-2"
                            key={`book-${index}`}
                        >
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.year}</TableCell>
                            <TableCell className="capitalize">
                                {book.status}
                            </TableCell>
                            <TableCell>
                                <DeleteModal id={`${book.id}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
