import { memo } from 'react';
import {Spinner} from '../';
import "./styles.css";

type ColumnType = {
  name: string;
  key: string | number;
  styles: Record<string, any>;
  dataRef: string;
}

type Props<T> = {
  columns: ColumnType[];
  data: T[];
  headerStyles?: Record<string, any>;
  error?: string | null;
  isLoading?: boolean;
}

function ListView<T extends Record<string, any>>({columns, data, headerStyles, error, isLoading}: Props<T>) {
  return (
    <div className="list-container">
      <div className="list-header flex" style={headerStyles}>
        {columns.map((item) => {
          return (
            <div key={`${Number(item.key) * Math.random()}`} style={item.styles}>{item.name}</div>
          )
        })}
      </div>
      <div className="list-body">
        {error && !isLoading && (
          <div className="flex justify-center align-center flex-column error-container">
            Some error occured
            <div>{error}</div>
          </div>
        )}
        {isLoading && (
          <div className='flex justify-center align-center flex-column spinner-container'>
            <Spinner />
          </div>
        )}
        
        {!isLoading && !error && data.length > 0 && data.map((item, index) => {
          return (
            <div key={index * Math.random()} data-testid="listview-item" className="flex list-body-item">{
              columns.map(col => {
                return (
                  <div key={`${Number(col.key) * Math.random()}`} style={{width: col.styles.width}} className="list-body-col-item">{item[col.dataRef]}</div>
                )
              })
            }</div>
          )
        })}
      </div>
    </div>
  )
}

export type {Props, ColumnType};
export default memo(ListView);