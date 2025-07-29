'use client'
//Making it a controlled component so using use state it will render on client side

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { IBooks, IPBooks } from '@/lib/types'
import { BASE_URL, ErrorObject, validateBook } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EditForm({
    id,
    currentBook,
}: {
    id: string
    currentBook: IBooks
}) {
    const [book, setBook] = useState<IBooks>({
        id: -1,
        title: '',
        author: '',
        genre: '',
        status: 'available',
        year: '',
    })

    const [error, setError] = useState<ErrorObject>({
        title: '',
        author: '',
        genre: '',
        year: '',
    })

    useEffect(() => {
        if (currentBook) {
            setBook(currentBook)
        }
    }, [currentBook])

    const router = useRouter()

    const handleSubmit = async () => {
        const errors = validateBook(book)

        if (Object.keys(errors).length > 0) {
            setError(errors)
            return
        }
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/routing/${book.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book),
                }
            )

            if (!res.ok) toast(`Something went wrong!`)

            const data = await res.json()

            if (data.status === 401) {
                toast(
                    'Sorry for not editing it is static data sometime it erase the new entry'
                )
            }

            if (data.status === 201) {
                toast(`${data.message}`)
            }

            toast(`${data.message}`)

            setTimeout(() => {
                router.push('/')
            }, 500)
        } catch (e) {
            toast(`Something went wrong`)
        }
    }

    const regex = /^[A-Za-z\s]+$/

    return (
        <div className="flex flex-col gap-6 p-4 border-2 border-white justify-center w-full md:min-w-lg rounded-xl">
            <div className="gap-2 flex flex-col">
                <Label className="text-white font-black">Book Title</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="enter book name"
                    className="capitalize"
                    value={book.title}
                    onChange={(e) => {
                        setBook({
                            ...book,
                            title: e.target.value,
                        })
                    }}
                />
                <Label className="text-red-500">{error.title}</Label>
            </div>
            <div className="gap-2 flex flex-col">
                <Label className="text-white font-black">Author Name</Label>
                <Input
                    type="text"
                    name="author"
                    placeholder="enter book name"
                    className="capitalize"
                    value={book.author}
                    onChange={(e) => {
                        if (regex.test(e.target.value)) {
                            setBook({
                                ...book,
                                author: e.target.value,
                            })
                        }
                    }}
                />
                <Label className="text-red-500">{error.author}</Label>
            </div>
            <div className="gap-2 flex flex-col">
                <Label className="text-white font-black">Genre</Label>
                <Input
                    type="text"
                    name="genre"
                    placeholder="enter book name"
                    className="capitalize"
                    value={book.genre}
                    onChange={(e) => {
                        if (regex.test(e.target.value)) {
                            setBook({
                                ...book,
                                genre: e.target.value,
                            })
                        }
                    }}
                />
                <Label className="text-red-500">{error.genre}</Label>
            </div>
            <div className="gap-2 flex flex-col">
                <Label className="text-white font-black">Published Year</Label>
                <Input
                    type="text"
                    name="year"
                    placeholder="enter book name"
                    className="capitalize"
                    value={book.year}
                    onChange={(e) =>
                        setBook({
                            ...book,
                            year: e.target.value,
                        })
                    }
                />
                <Label className="text-red-500">{error.year}</Label>
            </div>
            <div className="gap-2 flex flex-col">
                <Label className="text-white font-black">Status</Label>
                <Select
                    onValueChange={(value: 'available' | 'issued') => {
                        setBook({
                            ...book,
                            status: value,
                        })
                    }}
                    defaultValue={book.status}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="issued">Issued</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button
                onClick={handleSubmit}
                className="w-3/4 uppercase self-center cursor-pointer capitalize text-black/90 font-bold bg-white"
            >
                Submit
            </Button>
        </div>
    )
}
