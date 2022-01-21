import { useState } from "react"

export default function Alert({ type, headline, message }) {

  if (type == "SUCCESS") {
    return (
      <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 mb-4">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className="text-green-500">
            <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="text-sm font-medium ml-3">{headline}</div>
        </div>
        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">{message}</div>
      </div>
    )
  } else if (type === "ERROR") {
    return (
      <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className="text-red-500">
            <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="text-sm font-medium ml-3">{headline}</div>
        </div>
        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">{message}</div>
      </div>
    )
  }





}