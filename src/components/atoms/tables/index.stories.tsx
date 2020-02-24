import React from 'react'
import { Table } from './index'

const headers = [
  {
    id: '1',
    cells: [
      { id: '11', content: 'header1' },
      { id: '12', content: 'header2' },
      { id: '13', content: 'header3' },
    ]
  },
]

const contents = [
  {
    id: '1',
    cells: [
      { id: '11', content: 'hoge11' },
      { id: '12', content: 'hoge12' },
      { id: '13', content: 'hoge13' },
    ]
  },
  {
    id: '2',
    cells: [
      { id: '21', content: 'hoge21' },
      { id: '22', content: 'hoge22' },
      { id: '23', content: 'hoge23' },
    ]
  },
  {
    id: '3',
    cells: [
      { id: '31', content: 'hoge31' },
      { id: '32', content: 'hoge32' },
      { id: '33', content: 'hoge33' },
    ]
  },
]

const footers = [
  {
    id: '1',
    cells: [
      { id: '11', content: 'footer1' },
      { id: '12', content: 'footer2' },
      { id: '13', content: 'footer3' },
    ]
  },
]

export default { title: 'atoms/tables' }
export const table = () => (
  <Table<any> contents={contents} headers={headers} footers={footers} />
);
