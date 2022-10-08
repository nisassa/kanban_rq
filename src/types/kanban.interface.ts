export interface ColumnType {
  id: number;
  name: string;
  order: number;
  color: string;
}

export interface TaskType {
  id: number;
  title: string;
  column_id: number;
}

export interface DragItem {
  index: number;
  id: number;
  from: number;
}