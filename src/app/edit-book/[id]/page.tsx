import EditForm from '@/components/form/edit-form'
import { BASE_URL } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function EditBook({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/routing/${id}`,
        {
            cache: 'no-store',
        }
    )

    if (!res.ok) redirect('/')

    const book = await res.json()

    return <EditForm id={id} currentBook={book} />
}
