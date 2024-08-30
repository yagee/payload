import {
  type Column,
  type SQL,
  type SQLWrapper,
  and,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  lt,
  lte,
  ne,
  notInArray,
  or,
} from 'drizzle-orm'

type OperatorKeys =
  | 'and'
  | 'contains'
  | 'equals'
  | 'exists'
  | 'greater_than'
  | 'greater_than_equal'
  | 'in'
  | 'isNull'
  | 'less_than'
  | 'less_than_equal'
  | 'like'
  | 'not_equals'
  | 'not_in'
  | 'or'

export type Operators = Record<OperatorKeys, (column: Column, value: SQLWrapper | unknown) => SQL>

export const operatorMap: Operators = {
  and,
  contains: ilike,
  equals: eq,
  exists: isNotNull,
  greater_than: gt,
  greater_than_equal: gte,
  in: inArray,
  isNull, // handles exists: false
  less_than: lt,
  less_than_equal: lte,
  like: ilike,
  not_equals: ne,
  // TODO: geojson queries
  // intersects: intersects,
  // near: near,
  // within: within,
  // all: all,
  not_in: notInArray,
  or,
}
