'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { BASE_URL } from '@/lib/utils'

export default function DeleteModal({ id }: { id: string }) {
    const handleSubmit = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/routing/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await res.json()

        close()

        toast(`${data.message}`)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-fit p-2  rounded-xl shadow-xl hover:scale-110 cursor-pointer bg-red-500 text-white">
                    <TrashIcon />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your book.
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={handleSubmit} variant={'destructive'}>
                    Remove
                </Button>
            </DialogContent>
        </Dialog>
    )
}
