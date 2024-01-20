export {}

declare global {
  type PaginatedResponse<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }

  type User = {
    id: number
    phone: string
    username: string
    free_point: number
  }

  type Source = {
    id: number
    file: string
    cover: string
    name: string
    size: number
    length: number
    create_time: string
  }

  type Task = {
    id: number
    title: string
    status: number
    remark: string
    description: string
    source: Source
    clip_num: number
    clip_type: 0 | 1 | 2
    lock_point: number
    create_time: string
    error_message: string
  }
}
