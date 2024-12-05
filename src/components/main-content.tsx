'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DiagnosisInfo {
  month: string;
  blood_pressure: {
    systolic: {
      value: number;
      levels: string;
    };
    diastolic: {
      value: number;
      levels: string;
    };
  };
  heart_rate: {
      value: number;
      levels: string
      };
  respiratory_rate: {
      value: number;
      levels: string
      };
  temperature: {
      value: number;
      levels: string
      };
}

export default function MainContent({ info }: { info: DiagnosisInfo[] }) {
  const data = info?.map((x) => ({
    name: x.month,
    systolic_value: x.blood_pressure.systolic.value,
    systolic_label: x.blood_pressure.systolic.levels,
    diastolic_value: x.blood_pressure.diastolic.value,
    diastolic_label: x.blood_pressure.diastolic.levels,
    heart_rate_value: x.heart_rate.value,
    heart_rate_label: x.heart_rate.levels,
    respiratory_rate_value: x.respiratory_rate.value,
    respiratory_rate_label: x.respiratory_rate.levels,
    temperature_value: x.temperature.value,
    temperature_label: x.temperature.levels,

  })) || [];
  
  const lastReading = data.length > 0 ? data[data.length - 1] : null;

  if (!lastReading) return null;

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Diagnosis History</h2>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last 1 year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="systolic_value" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="diastolic_value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm font-medium text-pink-600">Systolic</p>
              <p className="text-2xl font-bold">{lastReading.systolic_value}</p>
              <p className="text-sm text-gray-500">{lastReading.systolic_label}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">Diastolic</p>
              <p className="text-2xl font-bold">{lastReading.diastolic_value}</p>
              <p className="text-sm text-gray-500">{lastReading.diastolic_label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respiratory Rate</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastReading.respiratory_rate_value}</div>
            <p className="text-xs text-muted-foreground">{lastReading.respiratory_rate_label}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastReading.temperature_value}</div>
            <p className="text-xs text-muted-foreground">{lastReading.temperature_label}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastReading.heart_rate_value}</div>
            <p className="text-xs text-muted-foreground">{lastReading.heart_rate_label}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


