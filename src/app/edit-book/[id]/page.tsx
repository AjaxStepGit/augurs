import EditForm from '@/components/form/edit-form'
import { BASEURL } from '@/lib/utils'

export default async function EditBook({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const res = await fetch(`${BASEURL}/routing/${id}`)
    const book = await res.json()

    console.log('books', book)

    return <EditForm id={id} currentBook={book} />
}
