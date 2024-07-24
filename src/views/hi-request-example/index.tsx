import request from '@/utils/request'
import Alert from '@hi-ui/alert'
import Select, { SelectDataItem } from '@hi-ui/select'
import Upload, { UploadFileItem } from '@hi-ui/upload'
import React, { useState } from 'react'

const HiRequestDemo = () => {
  const [fileList, setFileList] = useState<UploadFileItem[]>([
    {
      name: 'a.png',
      fileType: 'img', // 文件类型，可取值img, zip, word, pdf, ppt, excel, other
      uploadState: 'success', // 上传状态，可取值success, error
    },
    {
      name: 'b.png',
      fileType: 'img',
      uploadState: 'error',
    },
  ])
  return (
    <div>
      <Alert
        type="primary"
        title="HiRequest 使用示例"
        onClose={() => {
          console.log('alert关闭回调')
        }}
      />
      <h3>1. Select 组件使用 HiRequest 自定义异步搜索</h3>
      <Select
        dataSource={(keyword: string) => {
          const url =
            'https://www.fastmock.site/mock/eef9b373d82560f30585521549c4b6cb/hiui/api/list?keyword=' +
            keyword
          return request<{ list?: SelectDataItem[] }>(url)
            .then((response) => {
              console.log('response', response)
              return response.data?.list
            })
            .catch(console.log)
        }}
        placeholder="请选择"
        onChange={(item) => {
          console.log('异步单选结果', item)
        }}
      />
      <h3>2. Upload 组件结合 HiRequest 自定义上传</h3>
      <Upload
        type="default"
        customUpload={(files) => {
          if (!files) return

          const fileName = files[0].name
          request({
            type: 'upload',
            url: '/shop/order', // 替换为自己的接口
            name: 'filename', // 文件参数
            file: files[0], // 文件
            headers: {
              token: 'token',
            },
            onUploadProgress: (event) => {
              // 上传进度
              console.log(event)
            },
          })
            .then((res) => {
              // 返回结果
              console.log('res', res)
              const _fileList = fileList.concat({
                fileId: fileName,
                name: fileName,
                fileType: fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase(),
                uploadState: 'success',
                url: '',
              })
              setFileList(_fileList)
            })
            .catch(console.log)
        }}
        content="上传文件"
        fileList={fileList}
      />
    </div>
  )
}

export default HiRequestDemo
