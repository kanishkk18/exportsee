

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import ReactApexChart from "react-apexcharts"
import ReactDatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { postApi } from "services/api"

const ReportChart = ({ dashboard = false }) => {
  const [reportChart, setReportChart] = useState({})
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 14)))
  const [endDate, setEndDate] = useState(new Date())
  const [select, setSelect] = useState('all')
  const [selection, setSelection] = useState('day')
  const modules = useSelector((state) => state?.modules?.data)
  const user = JSON.parse(localStorage.getItem("user"))

  const isEmailsActive = modules?.find((item) => item?.moduleName === "Emails")?.isActive
  const isCallsActive = modules?.find((item) => item?.moduleName === "Calls")?.isActive

  const fetchChart = async () => {
    const data = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      filter: selection
    }
    const result = await postApi(user.role === 'superAdmin' ? 'api/reporting/index' : `api/reporting/index?sender=${user._id}`, data)
    if (result.status === 200) {
      setReportChart(result?.data)
    }
  }

  useEffect(() => {
    fetchChart()
  }, [startDate, endDate, selection])

  const series = Object.keys(reportChart).map((key) => {
    const dataSet = reportChart[key][0]
    let seriesData = []

    if (dataSet?.Emails && isEmailsActive) {
      seriesData = seriesData.concat(
        dataSet?.Emails?.map((item) => ({ x: new Date(item?.date).getTime(), y: item?.Emailcount }))
      )
    }
    if (dataSet?.Calls && isCallsActive) {
      seriesData = seriesData.concat(
        dataSet?.Calls?.map((item) => ({ x: new Date(item?.date).getTime(), y: item?.Callcount }))
      )
    }

    return {
      name: key === "Email" ? "Emails" : key === "Call" ? "Calls" : "",
      data: seriesData,
    }
  }).filter(series => series.name !== "")

  const selectedSeries = select === 'all' ? series : series.filter(s => s.name === select)

  const options = {
    chart: {
      id: 'area-chart',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          color: '#64748b',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#3b82f6', '#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#64748b',
      },
    },
  }

  return (
    <div className="bg-white/10 w-full rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Activity Report</h2>
        <p className="text-sm text-gray-600 mb-6">Overview of emails and calls over time</p>
        
        {!dashboard && (
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
            <select 
              value={select} 
              onChange={(e) => setSelect(e.target.value)}
              className="w-full md:w-40 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="Email">Emails</option>
              <option value="Call">Calls</option>
            </select>
            
            <div className="flex space-x-2">
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-40 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-40 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="interval"
                  value="day"
                  checked={selection === 'day'}
                  onChange={(e) => setSelection(e.target.value)}
                />
                <span className="ml-2 text-gray-700">Daily</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="interval"
                  value="week"
                  checked={selection === 'week'}
                  onChange={(e) => setSelection(e.target.value)}
                />
                <span className="ml-2 text-gray-700">Weekly</span>
              </label>
            </div>
          </div>
        )}
        
        <div className="w-full h-[400px]">
          <ReactApexChart
            options={options}
            series={selectedSeries}
            type="area"
            height="100%"
          />
        </div>
      </div>
    </div>
  )
}

export default ReportChart

