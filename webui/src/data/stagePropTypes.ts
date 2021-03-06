export type StagePropType = {
  id: string
  name: string
  width: number
  height: number
  path: string
}

const stagePropTypes: Record<string, StagePropType> = {
  ARCH: {
    id: 'ARCH',
    name: 'Arch',
    width: 100,
    height: 50,
    path: 'M0,50.5c0-28,22.4-50,50-50s50,22,50,50'
  },
  LINE: { id: 'LINE', name: 'Line', width: 100, height: 2, path: 'M0,0l100,0' },
  RING: {
    id: 'RING',
    name: 'Ring',
    width: 100,
    height: 100,
    path: 'M0,50a50,50 0 1,0 100,0a50,50 0 1,0 -100,0'
  },
  SPIRAL: {
    id: 'SPIRAL',
    name: 'Spiral',
    width: 100,
    height: 20,
    path:
      'M20,0C20,2.5,0,2.5,0,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5 c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5 c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5c0,2.5,20,2.5,20,5c0,2.5-20,2.5-20,5 s20,2.5,20,5'
  }
}

export default stagePropTypes
