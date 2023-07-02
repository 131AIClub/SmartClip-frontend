export {}

declare global {
  type User = {
    userId: number
    username: string
    point: number
    superUser: boolean
  }
}
