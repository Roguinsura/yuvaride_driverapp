import { RIDEGET, RIDESTART, RIDECOMPLETE, RIDEGETS, AMBULANCERIDE } from '../types/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rideServices } from '../../services'
import { RidePostInterface } from '../../interface/rideInterface'
import { settleResponse } from '../settleResponse'

export const rideDataGet = createAsyncThunk(
  RIDEGET,
  async (ride_id: number) => {
    const response = await rideServices.rideDataGet(ride_id)
    return response?.data
  },
)

export const rideDataGets = createAsyncThunk(RIDEGETS, async () => {
  const response = await rideServices.rideDataGets()
  return response?.data
})

export const rideDataPut = createAsyncThunk(
  RIDECOMPLETE,
  async (
    { data, ride_id }: { data: any; ride_id: number },
    { rejectWithValue },
  ) =>
    // Must reject on failure: the arrived radius check returns 422, and without
    // this the caller would advance the driver as if it had succeeded.
    settleResponse(
      await rideServices.rideUpdate({ data, ride_id }),
      rejectWithValue,
    ),
)

export const rideStartData = createAsyncThunk(
  RIDESTART,
  async (data: RidePostInterface, { rejectWithValue }) =>
    settleResponse(await rideServices.userstartRide(data), rejectWithValue),
)

export const ambulanceRideData = createAsyncThunk(
  AMBULANCERIDE,
  async ({ data }: { data: RidePostInterface }, { rejectWithValue }) =>
    settleResponse(await rideServices.ambulanceRideData(data), rejectWithValue),
)