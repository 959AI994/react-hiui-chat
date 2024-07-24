import React from 'react'
import DemoPage from './views/demo-page'
import About from './views/about'
import { Sidebar, MenuDataItem, filterTreeData } from '@hi-ui/menu'
import Search, { SearchDataItem } from '@hi-ui/search'
import Tooltip from '@hi-ui/tooltip'
import {
  AppStoreOutlined,
  UserOutlined,
  SunOutlined,
  PadOutlined,
  SearchOutlined,
} from '@hi-ui/icons'

// <DemoPage></DemoPage>
function App() {
  const [activeId, setActiveId] = React.useState<React.ReactText>('xiaomi1')
  const [searchKey, setSearchKey] = React.useState<string>('')
  const [data] = React.useState<MenuDataItem[]>([
    {
      title: '首页',
      id: '1',
      icon: <AppStoreOutlined />,
      children: [
        {
          title: '新品发布',
          id: '1-1',
          children: [
            {
              title: '新品发布',
              id: '1-1-1',
            },
          ],
        },
        {
          title: '在线反馈',
          id: '1-2',
          children: [
            {
              title: '在线反馈',
              id: '1-2-1',
            },
            {
              title: '在线人员处理',
              id: '1-2-2',
            },
          ],
        },
      ],
    },
    {
      title: '小米MIX',
      id: '2',
      icon: <UserOutlined />,
      children: [
        {
          title: '小米Mix',
          id: '2-1',
          icon: <AppStoreOutlined />,
          children: [
            {
              title: '小米Mix1',
              id: '2-1-1',
            },
            {
              title: '小米Mix2',
              id: '2-1-2',
            },
            {
              title: '小米Mix3',
              id: '2-1-3',
            },
          ],
        },
      ],
    },
    {
      title: '手机',
      id: 'shouji',
      icon: <SunOutlined />,
      children: [
        {
          title: '小米',
          id: 'xiaomi',
          icon: <SunOutlined />,
          children: [
            {
              title: '小米1',
              id: 'xiaomi1',
            },
            {
              title: '小米2',
              id: 'xiaomi2',
            },
            {
              title: '小米3',
              id: 'xiaomi3',
            },
          ],
        },
        {
          title: '红米',
          id: 'hongmi',
          icon: <SunOutlined />,
          children: [
            {
              title: '红米1',
              id: 'redmi1',
            },
            {
              title: '红米2',
              id: 'redmi2',
            },
            {
              title: '红米3',
              id: 'redmi3',
            },
          ],
        },
        {
          title: '小米note',
          id: 'xiaominote',
          icon: <SunOutlined />,
          children: [
            {
              title: '小米 note7',
              id: 'xiaomi note7',
            },
            {
              title: '小米 note6',
              id: 'xiaomi note6',
            },
            {
              title: '小米 note5',
              id: 'xiaomi note5',
            },
          ],
        },
      ],
    },
    {
      title: (
        <Tooltip title={'超长超长超长字符超长超长超长字符'} placement="right">
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            超长超长超长字符超长超长超长字符
          </div>
        </Tooltip>
      ),
      id: '4',
      icon: <PadOutlined />,
    },
  ])

  const showData = React.useMemo(() => {
    return (filterTreeData(data, searchKey, activeId) ?? []) as SearchDataItem[]
  }, [activeId, data, searchKey])

  return (
    <>
      <div
        className="app-container"
        style={{ display: 'flex', height: '100vh', width: '100%', background: '#f5f7fa' }}
      >
        <Sidebar
          activeId={activeId}
          onClick={setActiveId}
          collapsible={false}
          data={data}
          render={(data, level) => data.title}
          extraHeader={
            <div style={{ marginBottom: 8 }}>
              <Search
                prefix={<SearchOutlined />}
                placeholder="搜索"
                value={searchKey}
                onInput={(e) => setSearchKey((e.target as HTMLInputElement).value)}
              />
            </div>
          }
        />
        <div style={{ flex: 1, background: '#fff', padding: '20px', overflowY: 'auto' }}>
          {/* 你可以根据 activeId 来渲染不同的内容 */}
          {activeId === 'xiaomi1' && <DemoPage></DemoPage>}
          {activeId === 'xiaomi2' && <div>2342432423</div>}
          {activeId === 'xiaomi3' && <div>111111111232342432423</div>}
        </div>
      </div>
    </>
  )
}

export default App
