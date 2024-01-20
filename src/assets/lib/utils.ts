import type {LocationQueryValue} from "vue-router";


export class DateParser {
  date: Date

  constructor(raw_data: number | string | null = null) {
    if (typeof raw_data === "number" && raw_data < 1e12) {
      raw_data *= 1e3
    }
    this.date = raw_data ? new Date(raw_data) : new Date()
  }

  seconds() {
    return this.date.getSeconds()
  }

  hours() {
    return this.date.getHours()
  }

  minutes() {
    return this.date.getMinutes()
  }

  day() {
    return this.date.getDate()
  }

  month() {
    return this.date.getMonth() + 1
  }

  year() {
    return this.date.getFullYear()
  }

  //16:25
  hoursMinutes() {
    return this.hours().toString().padStart(2, "0") + ":" + this.minutes().toString().padStart(2, "0")
  }

  //10-21
  monthDay() {
    return this.month().toString().padStart(2, "0") + "-" + this.day().toString().padStart(2, "0")
  }

  //10-21 16:25
  monthDayHoursMinutes() {
    return this.monthDay() + " " + this.hoursMinutes()
  }

  //2021-10-21
  yearMonthDay() {
    return this.year() + "-" + this.monthDay()
  }

  all() {
    return this.yearMonthDay() + " " + this.hoursMinutes()
  }
}

export const dateDelta = (value: number) => {
  const nowDate = new DateParser()
  const valueDate = new DateParser(value)
  let str = ""
  if (nowDate.date > valueDate.date) {
    if (nowDate.year() > valueDate.year()) str += nowDate.year() - valueDate.year() + "年"
    if (nowDate.month() > valueDate.month()) str += nowDate.month() - valueDate.month() + "月"
    if (nowDate.day() > valueDate.day()) str += nowDate.day() - valueDate.day() + "天"
    if (nowDate.hours() > valueDate.hours()) str += nowDate.hours() - valueDate.hours() + "小时"
    if (nowDate.minutes() > valueDate.minutes()) str += nowDate.minutes() - valueDate.minutes() + "分钟"
  } else {
    if (nowDate.year() < valueDate.year()) str += valueDate.year() - nowDate.year() + "年"
    if (nowDate.month() < valueDate.month()) str += valueDate.month() - nowDate.month() + "月"
    if (nowDate.day() < valueDate.day()) str += valueDate.day() - nowDate.day() + "天"
    if (nowDate.hours() < valueDate.hours()) str += valueDate.hours() - nowDate.hours() + "小时"
    if (nowDate.minutes() < valueDate.minutes()) str += valueDate.minutes() - nowDate.minutes() + "分钟"
  }
  return str
}
export const datetime = (value: number) => {
  const nowDate = new DateParser()
  const valueDate = new DateParser(value)
  if (nowDate.year() > valueDate.year()) return valueDate.yearMonthDay()
  if (nowDate.monthDay() > valueDate.monthDay()) return valueDate.monthDay() + " " + valueDate.hoursMinutes()
  if (nowDate.hours() > valueDate.hours()) return `${nowDate.hours() - valueDate.hours()}小时前`
  if (nowDate.minutes() > valueDate.minutes()) return `${nowDate.minutes() - valueDate.minutes()}分钟前`
  if (nowDate.seconds() > valueDate.seconds()) return `${nowDate.seconds() - valueDate.seconds()}秒前`
  return "刚刚"
}

export const flat_query = (query: LocationQueryValue | LocationQueryValue[]): LocationQueryValue => {
  return query && (typeof query === "string" ? query : query[0])
}

export const auth = (url: string) => `${url}/?token=${localStorage.getItem("token")}`
export const second_to_time = (s: number) => {
  const hour = Math.floor(s / 3600)
  const minute = Math.floor(s / 60) % 60
  const second = s % 60
  let t = (hour < 10) ? "0" + hour + ":" : hour + ":"
  if (minute < 10) t += "0"
  t += minute + ":"
  if (second < 10) t += "0"
  t += second.toFixed(0)
  return t
}
