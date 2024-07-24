/**
 * 为了方便以及统一大家对于数据请求的方式，HiUI 特封装请求工具 HiRequest
 * HiRequest 提供了上传、下载、jsonp等方法
 * 文档地址：https://infra.mioffice.cn/hiui/zh-CN/documents/hi-request
 */
import config from '@/config'
import { History } from '@hi-ui/classic-theme'
import Message from '@hi-ui/message'
import HiRequest, { HiRequestOptions } from '@hi-ui/request'

// 如需在自己项目中使用，一般大家会设置 统一 loading，或者公用的 header 等配置；
// 另外同时也会由 response 的状态码，做一些统一的处理，我们对此提供了一个简单的示例。

// TODO: 在这里，你可以根据业务自行定义通用业务接口的类型，以下为前后端自定义规范的示例
export interface BaseResponse<T> {
  code: number
  message?: string
  data?: T
}
export type BaseResponsePromise<T> = Promise<BaseResponse<T>>

export type CodeMessage = Record<number, string>

export const codeMessage: CodeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  404: '发出的请求不存在，请联系管理员。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务异常，请稍后重试。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

const { API_ORIGIN, API_BASE } = config
export const baseURL = API_ORIGIN + API_BASE

export const isSuccess = (status: number) => status >= 200 && status < 300

function request<T>(
  url: string | HiRequestOptions,
  options?: HiRequestOptions
): BaseResponsePromise<T> {
  const baseOptions = typeof url === 'string' ? { url } : url
  const {
    url: urlOption,
    baseURL: baseURLOption,
    headers,
    ...restOptions
  } = Object.assign({}, baseOptions, options)

  const _options: HiRequestOptions = {
    url: (baseURLOption ?? baseURL) + urlOption,
    headers: {
      // token: 'user.token', // 自定义全局 token 头凭证
      ...headers,
    },
    // 发送接口时: request 拦截器
    beforeRequest(config) {
      return config
    },
    // 获取结果时：返回页面层数据拦截器
    beforeResponse(response) {
      return response
    },
    // 返回数据异常结果时
    errorResponse(error) {
      const status = error.response?.status

      if (status) {
        Message.open({
          type: 'error',
          title: codeMessage[status] || error.message,
        })

        if (status === 403) {
          History.browserHistory.push('/403')
        }
      }

      if (__DEV__) {
        console.log(error, error.request || error.response)
      }

      return Promise.reject(error)
    },
    // 请求异常结果时
    errorRequest(error) {
      if (__DEV__) {
        console.log('errorRequest', error.request)
      }
      return Promise.reject(error)
    },
    validateStatus: isSuccess,
    ...restOptions,
  }

  return HiRequest(_options).then((res) => res.data)
}

export default request
