// 曲面
// 曲面单个元素数据类型
export interface curvedSurfaceListItemType {
  url: string
  isBig: boolean
}
// 曲面：坐标类型
export interface curvedSurfaceCoordinateType {
  position: { x: number; y: number; z: number }
  lookAt: { x: number; y: number; z: number }
  deg: number
}
