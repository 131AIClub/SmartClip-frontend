import {Notification} from "@arco-design/web-vue";

export const fullMap = (o: Record<string, string>) => {
  return !Object.values(o).filter(x => !x).length
}

export const assertNotEmpty = <T>(data: T | null | undefined, message: string): T => {
  if (data) return data
  Notification.error(message)
  throw Error(message)
}
