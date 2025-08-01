import { ReactNode } from 'react'

export default function EditBookLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex w-screen h-auto justify-center bg-primary">
            <div className="flex flex-col gap-12 w-full p-4 items-center">
                <h1 className="text-6xl md:text-8xl font-black uppercase text-white my-4">
                    Edit Book
                </h1>
                {children}
            </div>
        </div>
    )
}
