import BookTable from '@/components/book-table'
import { BASEURL } from '@/lib/utils'

export default async function Home() {
    const res = await fetch(`${BASEURL}/routing`)

    const data = await res.json()

    return (
        <div className="flex w-screen h-screen justify-center bg-primary">
            <div className="flex flex-col gap-12 w-full p-4 items-center">
                <h1 className="text-8xl font-black uppercase text-white my-4">
                    Books Club
                </h1>

                <div className="flex p-4 border-2 border-white w-full rounded-xl">
                    <BookTable books={data} />
                </div>
            </div>
        </div>
    )
}
