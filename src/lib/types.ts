export interface IBooks {
    id: number
    title: string
    author: string
    genre: string
    year: string
    status: 'available' | 'issued'
}

export interface IPBooks {
    title: string
    author: string
    genre: string
    year: string
    status: 'available' | 'issued'
}
