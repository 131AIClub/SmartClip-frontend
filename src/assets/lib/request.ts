import axios from "axios"
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import {api_url} from "@/assets/lib/settings";

interface Request<T> {
  code: number
  msg: string
  data: T
}

class Client {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: api_url
    })
  }

  async request<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    if (!config.headers) config.headers = {}
    if (localStorage.getItem("token")) config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    return (await this.instance.request<Request<T>>(config)).data
  }

  async get<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "GET"})
  }

  async post<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "POST"})
  }

  async delete<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "DELETE"})
  }

  async patch<T>(config: AxiosRequestConfig): Promise<Request<T>> {
    return await this.request({...config, method: "PATCH"})
  }
}

export const client = new Client()
