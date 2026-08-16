import { ZONE_UPDATE, RENTAL_ZONE, Current_Zone, DRIVERS_STATUS } from '../types/index'
import { ZoneUpdatePayload } from '../../interface/zoneInterface'
import { zoneService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { settleResponse } from '../settleResponse'

export const driverZone = createAsyncThunk(
  ZONE_UPDATE,
  async (data: ZoneUpdatePayload, { rejectWithValue }) =>
    settleResponse(await zoneService.zone(data), rejectWithValue),
);


export const rentalZone = createAsyncThunk(
  RENTAL_ZONE,
  async ({ vehicle_type_id }: { vehicle_type_id: number }) => {
    const response = await zoneService.rentalZone(vehicle_type_id)
    return response?.data
  },
)

export const currentZone = createAsyncThunk(
  Current_Zone,
  async (data: any) => {
    const response = await zoneService.currentZone(data.lat, data.lng);
    return response?.data;
  },
);

// Online/offline toggle. All three call sites already await .unwrap() inside a
// try/catch that reverts the local state and warns the driver — but the thunk
// never rejected, so a server-side refusal read as success and left the driver
// showing "online" while the server had them offline.
export const driversStatus = createAsyncThunk(
  DRIVERS_STATUS,
  async (data: ZoneUpdatePayload, { rejectWithValue }) =>
    settleResponse(await zoneService.driversStatus(data), rejectWithValue),
);

