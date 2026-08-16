import { RIDEGET, RIDESTART, RIDECOMPLETE, RIDEGETS, AMBULANCERIDE } from '../types/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rideServices } from '../../services'
import { RidePostInterface } from '../../interface/rideInterface'

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
  ) => {
    // rideUpdate swallows the axios error and hands back `e.response`, so a
    // failed status update looks identical to a successful one from here.
    // Surface it as a rejection instead — the arrived radius check returns 422
    // and the caller has to be able to see that.
    const response = await rideServices.rideUpdate({ data, ride_id })

    if (!response) {
      return rejectWithValue({ status: 0, message: null })
    }

    if (response.status >= 400) {
      return rejectWithValue({ status: response.status, ...response.data })
    }

    return response?.data
  },
)

export const rideStartData = createAsyncThunk(
  RIDESTART,
  async (data: RidePostInterface) => {
    const response = await rideServices.userstartRide(data)
    return response?.data
  },
)

export const ambulanceRideData = createAsyncThunk(AMBULANCERIDE, async ({ data }: { data: RidePostInterface }) => {
  const response = await rideServices.ambulanceRideData(data)
  return response?.data
})