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
import { IBooks } from '@/lib/types'
import { BASEURL } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddForm() {
    const [book, setBook] = useState<IBooks>({
        id: -1,
        title: '',
        author: '',
        genre: '',
        status: 'available',
        year: '',
    })

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${BASEURL}/routing/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            })

            const data = await res.json()

            toast(`${data.message}`)

            setBook({
                id: -1,
                title: '',
                author: '',
                genre: '',
                status: 'available',
                year: '',
            })

            redirect('/')
        } catch (e) {
            toast(`Something went wrong`)
        }
    }

    const regex = /^[A-Za-z\s]+$/

    return (
        <div className="flex flex-col gap-6 p-4 border-2 border-white justify-center w-fit min-w-lg rounded-xl">
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
