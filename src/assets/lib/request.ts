import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {api_url} from "@/assets/lib/settings"

interface Request<T> {
  code: number
  message: string
  data: T
}

class Client {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: api_url
    })
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Request<T>>> {
    return await this.instance.request<Request<T>>(config)
  }

  async get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Request<T>>> {
    return await this.request({...config, method: "GET"})
  }

  async post<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Request<T>>> {
    return await this.request({...config, method: "POST"})
  }

  async delete<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Request<T>>> {
    return await this.request({...config, method: "DELETE"})
  }

  async patch<T>(config: AxiosRequestConfig): Promise<AxiosResponse<Request<T>>> {
    return await this.request({...config, method: "PATCH"})
  }
}

export default new Client()
