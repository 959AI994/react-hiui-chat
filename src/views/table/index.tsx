import React, { Component } from 'react'
import Input from '@hi-ui/input'
import Button from '@hi-ui/button'
import Grid from '@hi-ui/grid'
import Table from '@hi-ui/table'
import Notification from '@hi-ui/notification'
import {
  EditOutlined,
  CloseOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@hi-ui/icons'
import request from '@/utils/request'

type Props = Readonly<Record<string, unknown>>
type State = Readonly<typeof initialState>

type Keys = keyof typeof initialColumnMixins

interface TableData {
  id: number
  orderDate: string
  orderDelivery: string
  orderId: string
  orderPayment: string
  orderPlatform: string
  orderStatus: string
  orderTotal: number
}

interface Column {
  key: Keys
  title: string
  dataKey: string
  hide: boolean
}

interface PageInfo {
  page: number
  total: number
  pageSize: number
}

interface OrderAsyncData {
  columns: Column[]
  list: TableData[]
  pageInfo: PageInfo
}

const { Row, Col } = Grid

const initialColumnMixins = {
  id: {
    sorter(pre: TableData, next: TableData) {
      return pre.id - next.id
    },
  },
  action: {
    render() {
      return (
        <React.Fragment>
          <EditOutlined />
          <CloseOutlined />
          <EllipsisOutlined />
        </React.Fragment>
      )
    },
  },
}

const initialState = {
  pageSize: 10,
  total: 0,
  page: 1,
  list: [] as TableData[],
  columns: [] as Column[],
  keyword: '',
}

export default class Template extends Component<Props, State> {
  state = initialState
  columnMixins = initialColumnMixins

  componentDidMount() {
    this.fetchData()
  }

  fetchData(page = this.state.page) {
    const keyword = this.state.keyword || 'id'

    request<OrderAsyncData>(`/shop/order`, {
      method: 'POST',
      params: {
        keyword,
        page,
      },
    })
      .then((ret) => {
        const { code, data } = ret

        if (code === 200 && data) {
          const columns = data.columns
          const pageInfo = data.pageInfo

          const list: TableData[] = data.list.map((item) => {
            return { ...item, key: item.id }
          })

          this.setState({
            list,
            page,
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
            columns: this.setTableColumns(columns),
          })
        } else {
          Notification.open({
            key: ret.code + '',
            type: 'error',
            title: ret.code + '',
            content: ret.message as string,
          })
        }
      })
      .catch(console.log)
  }

  setTableColumns(columns: Column[]) {
    return columns.map((column: Column) => {
      const { key } = column
      return {
        ...column,
        ...this.columnMixins[key || ''],
      }
    })
  }

  search = () => {
    if (!this.state.keyword) {
      return
    }

    this.setState({ page: 1 }, this.fetchData)
  }

  render() {
    const { keyword, pageSize, total, page, list, columns } = this.state

    return (
      <div>
        <Row>
          <Col span={16}>
            <Input
              value={keyword}
              placeholder="搜索关键词"
              style={{ width: '200px' }}
              append={<Button type="primary" icon={<SearchOutlined />} onClick={this.search} />}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ keyword: e.target.value })
              }}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="secondary" appearance="filled" icon={<DownloadOutlined />} />
            <Button type="secondary" appearance="filled" icon={<EllipsisOutlined />} />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ padding: '12px', backgroundColor: '#fff' }}>
            <Table
              columns={columns}
              data={list}
              pagination={{
                pageSize,
                total,
                current: page,
                onChange: (page: number) => {
                  this.setState({ page }, this.fetchData)
                },
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
