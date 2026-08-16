import { REVIEW } from '../types/index'
import { ReviewInterface } from '../../interface/reviewInterface'
import { reviewService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { settleResponse } from '../settleResponse'

export const userReview = createAsyncThunk(
  REVIEW,
  async (data: ReviewInterface, { rejectWithValue }) =>
    settleResponse(await reviewService.review(data), rejectWithValue),
)
