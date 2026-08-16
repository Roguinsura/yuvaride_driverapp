import {
  UPDATEPROFILE,
  DELETE_ACCOUNT,
  SELF_DRIVER,
  SELF_FLEET,
  USER_BANKDETAILS,
  UPDATE_DOCUMENT,
  UPDATE_VEHICLE,
  COUNTRY,
  PREFERENCE,
  UPDATEMOBILEMAIL,
  VERIFYMOBILEMAIL
} from '../types/index'
import { accountServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BankDetailsinterface, UpdateProfileInterface, updateVehicleInterface } from '../../interface/accountInterface'
import { settleResponse } from '../settleResponse'


export const selfDriverData = createAsyncThunk(SELF_DRIVER, async () => {
  const response = await accountServices.selfDriverData()
  return response?.data
})

export const selfFleetData = createAsyncThunk(SELF_FLEET, async () => {
  const response = await accountServices.selfFleetData()
  return response?.data
})

export const updateProfile = createAsyncThunk(
  UPDATEPROFILE,
  async (data: any, { rejectWithValue }) => {
    const response = await accountServices.updateProfile(data.data)

    if (!response || response.status >= 400) {
      return settleResponse(response, rejectWithValue)
    }

    // Refresh the cached driver record only once the update actually landed.
    data.dispatch(selfDriverData())
    return response.data
  },
)

export const deleteProfile = createAsyncThunk(
  DELETE_ACCOUNT,
  async (_, { rejectWithValue }) =>
    settleResponse(await accountServices.deleteProfile(), rejectWithValue),
)

export const updateBankDetails = createAsyncThunk(
  USER_BANKDETAILS,
  async (data: BankDetailsinterface, { rejectWithValue }) =>
    settleResponse(
      await accountServices.updateBankDetails(data),
      rejectWithValue,
    ),
)

export const updateDocument = createAsyncThunk(
  UPDATE_DOCUMENT,
  async (data: BankDetailsinterface, { rejectWithValue }) =>
    settleResponse(await accountServices.updateDocument(data), rejectWithValue),
)

export const updateVehicle = createAsyncThunk(
  UPDATE_VEHICLE,
  async (data: updateVehicleInterface, { rejectWithValue }) =>
    settleResponse(
      await accountServices.updateVehicleRegis(data),
      rejectWithValue,
    ),
)

export const countryData = createAsyncThunk(COUNTRY, async () => {
  const response = await accountServices.countryData()
  return response?.data
})

export const preferenceData = createAsyncThunk(PREFERENCE, async () => {
  const response = await accountServices.preferenceData()
  return response?.data
})

export const updateMobileEmail = createAsyncThunk(UPDATEMOBILEMAIL, async (data: UpdateProfileInterface) => {
  const response = await accountServices.updateMobileEmail(data);
  return response;
});

export const verifyMobileEmail = createAsyncThunk(VERIFYMOBILEMAIL, async (data: UpdateProfileInterface) => {
  const response = await accountServices.verifyMobileEmail(data);
  return response;
});
