import { SOS, SOS_ALERT } from '../types/index'
import sosServices from '../../services/sosService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { sosAlertDataInterface } from '../../interface/sosInterface'
import { settleResponse } from '../settleResponse'

// Fetching sos data
export const sosDataGet = createAsyncThunk(SOS, async () => {
    const response = await sosServices.sosDataGet()
    return response?.data
})

// Despite the name this POSTs an emergency alert. If it fails, the driver must
// be told it did not go through rather than shown a silent success.
export const sosAlertGet = createAsyncThunk(
    SOS_ALERT,
    async (data: sosAlertDataInterface, { rejectWithValue }) =>
        settleResponse(await sosServices.sosAlertGet(data), rejectWithValue),
)
