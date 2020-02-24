import React, { ReactNode, useMemo} from 'react'
import css from './index.module.css'
import classNames from 'classnames'

type BaseRowType = {
  id: string
  className?: string
}

type BaseCellType = {
  id: string
  className?: string
  content?: ReactNode
}

export type Props<C, H, F> = {
  className?: string
  caption?: ReactNode
  contents: Array<BaseRowType & { cells: Array<BaseCellType & C> }>
  headers?: Array<BaseRowType & { cells: Array<BaseCellType & H> }>
  footers?: Array<BaseRowType & { cells: Array<BaseCellType & F> }>
  cellRenderer?: (args: BaseCellType & C) => ReactNode
  headerCellRenderer?: (args: BaseCellType & H) => ReactNode
  footerCellRenderer?: (args: BaseCellType & F) => ReactNode
}

export const Table = <C, H = Record<string, any>, F = Record<string, any>>(
  {
    className,
    caption,
    contents,
    headers,
    footers,
    cellRenderer = ({ content }) => content,
    headerCellRenderer = ({ content }) => content,
    footerCellRenderer = ({ content }) => content
  }: Props<C, H, F>
) => (
  <table className={classNames(css.root, className)}>
    {caption && <caption>{caption}</caption>}
    {headers && (
      <thead className={css.header}>
      {headers.map(header => (
        <tr key={header.id} className={classNames(css.headerRow, header.className)}>
          {header.cells.map(cell => (
            <th key={cell.id} className={classNames(css.headerCell, cell.className)}>
              {useMemo(() => headerCellRenderer(cell), [headerCellRenderer, cell])}
            </th>)
          )}
        </tr>)
      )}
      </thead>
    )}
    <tbody className={css.content}>
      {contents.map(row => (
        <tr key={row.id} className={classNames(css.contentRow, row.className)}>
          {row.cells.map(cell => (
            <th key={cell.id} className={classNames(css.contentCell, cell.className)}>
              {useMemo(() => cellRenderer(cell), [cellRenderer, cell])}
            </th>)
          )}
        </tr>)
      )}
    </tbody>
    {footers && (
      <tfoot className={css.footer}>
        {footers.map(row => (
          <tr key={row.id} className={classNames(css.footerRow, row.className)}>
            {row.cells.map(cell => (
              <th key={cell.id} className={classNames(css.footerCell, cell.className)}>
                {useMemo(() => footerCellRenderer(cell), [footerCellRenderer, cell])}
              </th>)
            )}
          </tr>)
        )}
      </tfoot>
    )}
  </table>
)

