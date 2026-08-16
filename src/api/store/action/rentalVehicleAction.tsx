import {
  RENTAL_VEHICLE,
  RENTAL_VEHICLE_LIST,
  RENTAL_VEHICLE_UPDATE,
  DELETE_RENTAL_VEHICLE,
  RENTAL_VEHICLE_DETAIL
} from '../types/index'
import { RentalInterface } from '../../interface/rentalVehicleInterface'
import { rentalvehicleService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { settleResponse } from '../settleResponse'

export const rentalVehicleAdd = createAsyncThunk(
  RENTAL_VEHICLE,
  async (data: RentalInterface, { rejectWithValue }) =>
    settleResponse(
      await rentalvehicleService.rentalVehicleAdd(data),
      rejectWithValue,
    ),
)

export const rentalVehicleData = createAsyncThunk(
  RENTAL_VEHICLE_LIST,
  async () => {
    const response = await rentalvehicleService.rentalVehicleData()
    return response?.data
  },
)

export const rentalVehicleDetail = createAsyncThunk(
  RENTAL_VEHICLE_DETAIL,
  async ({ id }: { id: number }) => {
    const response = await rentalvehicleService.rentalVehicleDetail(id)
    return response?.data
  },
)

export const rentalVehicleUpdate = createAsyncThunk(
  RENTAL_VEHICLE_UPDATE,
  async (
    { rentalVehicleId, status }: { rentalVehicleId: number; status: number },
    { rejectWithValue },
  ) =>
    settleResponse(
      await rentalvehicleService.rentalVehicleUpdate(rentalVehicleId, status),
      rejectWithValue,
    ),
)

export const deleteRentalVehicle = createAsyncThunk(
  DELETE_RENTAL_VEHICLE,
  async (id: any, { rejectWithValue }) =>
    settleResponse(
      await rentalvehicleService.deleteRentalVehicle(id),
      rejectWithValue,
    ),
)

