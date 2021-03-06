import _ from 'lodash'
import * as PIXI from 'pixi.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Point,
  SvgPathProperties,
  svgPathProperties
} from 'svg-path-properties'
import stagePropTypes from '../../../data/stagePropTypes'
import { StagePropViewModel } from '../../../types/ViewModel'
import Logger from '../../../utils/Logger'
import { StageEditorDispatchContext } from '../StageEditorReducer'
import StagePropBackground from './StagePropBackground'
import StagePropPath from './StagePropPath'
import StagePropRotateHandle from './StagePropRotateHandle'
import StagePropLeds from './StagePropLeds'

const logger = new Logger('StageProp')

interface Props {
  /** The PIXI application used to render the stage canvas. */
  pixiApp: PIXI.Application

  /** The stage prop being displayed or edited. */
  stageProp: StagePropViewModel

  /** Whether or not to enable stage prop editing. */
  editable: boolean
}

interface State {
  /** The PIXI container that holds the stage prop. */
  pixiContainer: PIXI.Container

  /** The width of the unscaled stage prop. */
  width: number

  /** The height of the unscaled stage prop. */
  height: number

  /** The scaled points of the path that makes up the stage prop. */
  pathPoints: Point[]

  /** The position of the LEDs on the stage prop. */
  ledPoints: Point[]
}

const StageProp: React.FC<Props> = props => {
  const { stageProp } = props

  const [state] = useState<State>(() => initState(props.pixiApp, stageProp))
  const dispatch = useContext(StageEditorDispatchContext)
  const { pixiContainer, width, height, pathPoints, ledPoints } = state

  const selectStageProp = useCallback(() => {
    dispatch({ type: 'SelectStageProp', payload: { uuid: stageProp.uuid } })
  }, [dispatch, stageProp.uuid])

  const setPosition = useCallback(() => {
    pixiContainer.x = stageProp.positionX + pixiContainer.width / 2
    pixiContainer.y = stageProp.positionY + pixiContainer.height / 2
  }, [pixiContainer, stageProp.positionX, stageProp.positionY])

  const setRotation = useCallback(() => {
    pixiContainer.rotation = (stageProp.rotation / 180) * Math.PI
  }, [pixiContainer, stageProp.rotation])

  setPosition()
  useEffect(setPosition, [pixiContainer, stageProp.positionX, stageProp.positionY])

  setRotation()
  useEffect(setRotation, [pixiContainer, stageProp.rotation])

  useEffect(() => {
    return () => {
      logger.info(`Destroying ${stageProp.uuid}.`)
      state.pixiContainer.destroy({ children: true })
    }
  }, [stageProp.uuid, state.pixiContainer])

  const moveStageProp = useCallback(
    (offsetX: number, offsetY: number) => {
      dispatch({
        type: 'MoveStageProp',
        payload: {
          x: Math.round(stageProp.positionX + offsetX),
          y: Math.round(stageProp.positionY + offsetY)
        }
      })
    },
    [dispatch, stageProp.positionX, stageProp.positionY]
  )

  const rotateStageProp = useCallback(
    (rotation: number) => {
      dispatch({
        type: 'RotateStageProp',
        payload: { rotation: Math.round(rotation) }
      })
    },
    [dispatch]
  )

  return (
    <>
      <StagePropBackground
        parent={pixiContainer}
        width={width}
        height={height}
        editable={props.editable}
        onClicked={selectStageProp}
        onMoved={moveStageProp}
      />

      <StagePropPath
        parent={pixiContainer}
        points={pathPoints}
        width={width}
        height={height}
      />

      <StagePropLeds
        parent={pixiContainer}
        uuid={stageProp.uuid}
        points={ledPoints}
        width={width}
        height={height}
      />

      <StagePropRotateHandle
        parent={pixiContainer}
        width={width}
        editable={props.editable}
        onClicked={selectStageProp}
        onRotated={rotateStageProp}
      />
    </>
  )
}

function initState(
  pixiApp: PIXI.Application,
  stageProp: StagePropViewModel
): State {
  const { path } = stagePropTypes[stageProp.type!]
  const pathProperties = svgPathProperties(path)

  const pathPoints = getLinePoints(pathProperties, stageProp)
  const ledPoints = getLinePoints(pathProperties, stageProp, stageProp.ledCount)
  const width = _.maxBy(pathPoints, 'x')!.x
  const height = _.maxBy(pathPoints, 'y')!.y

  const pixiContainer = buildContainer(stageProp, width, height)
  pixiApp.stage.addChild(pixiContainer)

  return { pixiContainer, pathPoints, ledPoints, width, height }
}

function buildContainer(
  stageProp: StagePropViewModel,
  width: number,
  height: number
) {
  const pixiContainer = new PIXI.Container()
  pixiContainer.sortableChildren = true
  pixiContainer.scale.x = pixiContainer.scale.y = 1
  pixiContainer.pivot.x = width / 2
  pixiContainer.pivot.y = height / 2
  return pixiContainer
}

function getLinePoints(
  pathProperties: SvgPathProperties,
  stageProp: StagePropViewModel,
  pointCount: number = -1
): Point[] {
  const length = pathProperties.getTotalLength()
  pointCount = pointCount === -1 ? Math.floor(length) : pointCount

  const linePoints: Point[] = []

  if (pointCount === 1) {
    linePoints.push(pathProperties.getPointAtLength(length * .5))
  } else {
    _.forEach(Array(pointCount), (a, i) => {
      const progress = length * (i / (pointCount - 1))
      const point = pathProperties.getPointAtLength(progress)
      linePoints.push(point)
    })
  }

  return _.map(linePoints, point => ({
    x: point.x * stageProp.scaleX!,
    y: point.y * stageProp.scaleY!
  }))
}

export default StageProp
