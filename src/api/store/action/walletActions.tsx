import {
  WALLET,
  PAYMENT,
  PURCHASE_PLAN,
  VERIFY_PAYMENT,
  WITHDRAW_PAYMENT,
  WITHDRAE_REQUEST,
  WALLET_TOPUP,
  PAYMENT_AMOUNT,
  FLEET_WALLET,
  FLEET_WITHDRAW_REQUEST,
  FLEET_WITHDRAW_PAYMENT,
} from '../types/index'
import { walletServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  PaymentRideInterface,
  PaymentVerifyInterface,
  PurchasePlanDataInterface,
  WalletTopUpDatainterface,
  WithdrawDataInterface,
  fleetWalletInterface,
} from '../../interface/walletInterface'
import { settleResponse } from '../settleResponse'

export const walletData = createAsyncThunk(WALLET, async () => {
  const response = await walletServices.walletData()
  return {
    data: response?.data,
    status: response?.status,
  }
})

export const paymentsData = createAsyncThunk(PAYMENT, async () => {
  const response = await walletServices.paymentData()
  return {
    data: response.data,
    status: response.status,
  }
})

export const withdrawRequestData = createAsyncThunk(
  WITHDRAE_REQUEST,
  async () => {
    const response = await walletServices.withdrawRequestData()
    return response?.data
  },
)

export const purchaseData = createAsyncThunk(
  PURCHASE_PLAN,
  async (data: PurchasePlanDataInterface, { rejectWithValue }) =>
    settleResponse(await walletServices.purchaseData(data), rejectWithValue),
)

export const paymentVerify = createAsyncThunk(
  VERIFY_PAYMENT,
  async (data: PaymentVerifyInterface, { rejectWithValue }) =>
    settleResponse(await walletServices.paymentVerify(data), rejectWithValue),
)

export const withdrawData = createAsyncThunk(
  WITHDRAW_PAYMENT,
  async (data: WithdrawDataInterface, { rejectWithValue }) =>
    settleResponse(await walletServices.withdrawData(data), rejectWithValue),
)

export const walletTopUpData = createAsyncThunk(
  WALLET_TOPUP,
  async (data: WalletTopUpDatainterface, { rejectWithValue }) =>
    settleResponse(await walletServices.walletTopUpData(data), rejectWithValue),
)

export const allpayment = createAsyncThunk(
  PAYMENT_AMOUNT,
  // Rejects on failure. Collecting cash is the one action the driver cannot
  // undo from the app, so a failed call must not read as success at the call
  // site — the server may have recorded nothing.
  async (data: PaymentRideInterface, { rejectWithValue }) =>
    settleResponse(await walletServices.allpayment(data), rejectWithValue),
)


export const fleetWalletData = createAsyncThunk(FLEET_WALLET, async () => {
  const response = await walletServices.fleetWalletData()
  return {
    data: response?.data,
    status: response?.status,
  }
})

export const fleetWithdrawRequestData = createAsyncThunk(
  FLEET_WITHDRAW_REQUEST,
  async () => {
    const response = await walletServices.fleetWithdrawRequestData()
    return response?.data
  },
)

export const fleetWithdrawData = createAsyncThunk(
  FLEET_WITHDRAW_PAYMENT,
  async (data: WithdrawDataInterface, { rejectWithValue }) =>
    settleResponse(await walletServices.fleetWithdrawData(data), rejectWithValue),
)