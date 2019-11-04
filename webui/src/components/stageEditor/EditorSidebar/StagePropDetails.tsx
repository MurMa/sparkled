import { Button, Grid, TextField } from '@material-ui/core'
import { find } from 'lodash'
import React, { useCallback, useContext, useEffect } from 'react'
import useForm from 'react-hook-form'
import { POSITIVE_INTEGER, POSITIVE_NUMBER } from '../../../utils/regexes'
import {
  StageEditorDispatchContext,
  StageEditorStateContext
} from '../StageEditorReducer'

const StagePropDetails: React.FC = () => {
  const state = useContext(StageEditorStateContext)
  const dispatch = useContext(StageEditorDispatchContext)

  const { register, errors, reset, setValue, watch } = useForm({
    mode: 'onChange'
  })

  const stageProp = find(state.stage.stageProps, {
    uuid: state.selectedStageProp
  })
  const hasStageProp = stageProp !== undefined

  useEffect(() => {
    if (!stageProp) {
      reset()
    } else {
      setValue('positionX', stageProp.positionX.toString(), true)
      setValue('positionY', stageProp.positionY.toString(), true)
      setValue('scaleX', stageProp.scaleX.toString(), true)
      setValue('scaleY', stageProp.scaleY.toString(), true)
      setValue('rotation', stageProp.rotation.toString(), true)
    }
  }, [reset, setValue, stageProp])

  const [positionX, positionY, scaleX, scaleY, rotation] = watch([
    'positionX',
    'positionY',
    'scaleX',
    'scaleY',
    'rotation'
  ])

  useEffect(() => {
    if (!errors.positionX && !errors.positionY) {
      dispatch({
        type: 'MoveStageProp',
        payload: {
          x: Number(positionX),
          y: Number(positionY)
        }
      })
    }
  }, [dispatch, errors.positionX, errors.positionY, positionX, positionY])

  useEffect(() => {
    if (!errors.scaleX && !errors.scaleY) {
      dispatch({
        type: 'ScaleStageProp',
        payload: {
          x: Number(scaleX),
          y: Number(scaleY)
        }
      })
    }
  }, [dispatch, errors.scaleX, errors.scaleY, scaleX, scaleY])

  useEffect(() => {
    if (!errors.rotation) {
      dispatch({
        type: 'RotateStageProp',
        payload: { rotation: Number(rotation) }
      })
    }
  }, [dispatch, errors.rotation, rotation])

  const deleteStageProp = useCallback(() => {
    dispatch({ type: 'DeleteStageProp' })
  }, [dispatch])

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Position X"
            name="positionX"
            type="number"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            disabled={!hasStageProp}
            error={errors.positionX !== undefined}
            inputRef={register({
              required: true,
              min: 0,
              pattern: POSITIVE_INTEGER
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Position Y"
            name="positionY"
            type="number"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            disabled={!hasStageProp}
            error={errors.positionY !== undefined}
            inputRef={register({
              required: true,
              min: 0,
              pattern: POSITIVE_INTEGER
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Scale X"
            name="scaleX"
            type="number"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            disabled={!hasStageProp}
            error={errors.scaleX !== undefined}
            inputRef={register({
              required: true,
              min: 0.1,
              max: 10,
              pattern: POSITIVE_NUMBER
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Scale Y"
            name="scaleY"
            type="number"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            disabled={!hasStageProp}
            error={errors.scaleY !== undefined}
            inputRef={register({
              required: true,
              min: 0.1,
              max: 10,
              pattern: POSITIVE_NUMBER
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Rotation &deg;"
            name="rotation"
            type="number"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            disabled={!hasStageProp}
            error={errors.rotation !== undefined}
            inputRef={register({
              required: true,
              min: 0,
              max: 359,
              pattern: POSITIVE_INTEGER
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            disabled={!hasStageProp}
            onClick={deleteStageProp}
          >
            Delete stage prop
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StagePropDetails
