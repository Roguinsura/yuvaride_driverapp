import {
  RIDEREQUEST,
  DRIVERRIDEREQUEST,
  ACCEPTRIDEREQUEST,
  CANCELRIDEREQUEST,
  REJECTRIDEREQUEST,
  SYNC_CURRENT_RIDE_REQUEST,
} from '../types/index'
import { rideRequestService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { DriverRideRequest } from '../../interface/rideRequestInterface'
import { settleResponse } from '../settleResponse'

export const rideRequestDataGet = createAsyncThunk(
  RIDEREQUEST,
  async (zone_id: number) => {
    const response = await rideRequestService.rideRequestValue(zone_id)

    return response?.data
  },
)

export const driverRequestDataGet = createAsyncThunk(
  DRIVERRIDEREQUEST,
  async (data: DriverRideRequest, { rejectWithValue }) =>
    settleResponse(
      await rideRequestService.driverRequestValue(data),
      rejectWithValue,
    ),
)

// Accept/reject/cancel decide who owns the ride. A silent failure here leaves
// the driver believing they hold a ride the server never assigned them.
export const acceptRequestValue = createAsyncThunk(
  ACCEPTRIDEREQUEST,
  async (data: DriverRideRequest, { rejectWithValue }) =>
    settleResponse(
      await rideRequestService.acceptRequestValue(data),
      rejectWithValue,
    ),
)

export const rejectRequestValue = createAsyncThunk(
  REJECTRIDEREQUEST,
  async (data: DriverRideRequest, { rejectWithValue }) =>
    settleResponse(
      await rideRequestService.rejectRequestValue(data),
      rejectWithValue,
    ),
)

export const cancelRideRequestValue = createAsyncThunk(
  CANCELRIDEREQUEST,
  async (ride_riquest_id: number, { rejectWithValue }) =>
    settleResponse(
      await rideRequestService.cancelRideRequestValue(ride_riquest_id),
      rejectWithValue,
    ),
)

export const syncCurrentRideRequestData = createAsyncThunk(
  SYNC_CURRENT_RIDE_REQUEST,
  async () => {
    const response = await rideRequestService.syncCurrentRideRequest()
    return response?.data
  },
)
