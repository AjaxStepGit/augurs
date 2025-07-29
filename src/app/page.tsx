import BookTable from '@/components/book-table'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/utils'
import Link from 'next/link'

export default async function Home() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/routing`)

    const data = await res.json()

    return (
        <div className="flex w-screen h-auto justify-center bg-primary md:h-screen">
            <div className="flex flex-col gap-12 w-full p-4 items-center">
                <h1 className="text-6xl text-center font-black uppercase text-white my-4 md:text-8xl">
                    Books Club
                </h1>

                <div className="flex p-4 border-2 border-white w-full rounded-xl">
                    <BookTable books={data} />
                </div>
                <div className="flex justify-center">
                    <Link
                        className="w-[200px] bg-red-500 p-3 flex rounded-xl shadow-xl hover:scale-110 justify-center text-white font-black transition transform-gpu"
                        href={'/add-book'}
                    >
                        Add Book
                    </Link>
                </div>
            </div>
        </div>
    )
}
