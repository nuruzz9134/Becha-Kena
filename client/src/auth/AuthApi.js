
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/user/' }),
  endpoints: (builder) => ({
  
    admin:builder.mutation({
        query:(user)=>{
            return{
                url:'admin/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),
    register:builder.mutation({
        query:(user)=>{
            return{
                url:'register/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),
    login:builder.mutation({
      query:(user)=>{
          return{
              url:'login/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
          }
      }
    }),
    verifyOTP:builder.mutation({
        query:(user)=>{
            return{
                url:'verify_otp/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),


  }),
})

export const {  useAdminMutation,
                useRegisterMutation,
                useLoginMutation,
                useVerifyOTPMutation
            } = AuthApi
