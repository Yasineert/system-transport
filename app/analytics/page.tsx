"use client"

import { useState } from "react"
import Link from "next/link"
import { Bus, Download, LineChart, BarChartIcon, PieChartIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [year, setYear] = useState("2023")
  const [dateRange, setDateRange] = useState("last30days")
  const [chartType, setChartType] = useState("line")
  
  // Handle exporting data
  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Preparing analytics data for export...",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Data Exported",
        description: "Analytics data has been exported successfully to CSV format.",
      });
    }, 1500);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6 text-rose-600" />
          <span className="text-lg font-semibold">Marrakech Transport</span>
        </div>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground">
            Dashboard
          </Link>
          <Link href="/fleet-management" className="text-sm font-medium text-muted-foreground">
            Fleet Management
          </Link>
          <Link href="/routes" className="text-sm font-medium text-muted-foreground">
            Routes
          </Link>
          <Link href="/schedules" className="text-sm font-medium text-muted-foreground">
            Schedules
          </Link>
          <Link href="/drivers" className="text-sm font-medium text-muted-foreground">
            Drivers
          </Link>
          <Link href="/maintenance" className="text-sm font-medium text-muted-foreground">
            Maintenance
          </Link>
          <Link href="/fares" className="text-sm font-medium text-muted-foreground">
            Fares
          </Link>
          <Link href="/bus-stops" className="text-sm font-medium text-muted-foreground">
            Bus Stops
          </Link>
          <Link href="/passenger-app" className="text-sm font-medium text-muted-foreground">
            Passenger App
          </Link>
          <Link href="/reports" className="text-sm font-medium text-muted-foreground">
            Reports
          </Link>
          <Link href="/analytics" className="text-sm font-medium">
            Analytics
          </Link>
          <Link href="/settings" className="text-sm font-medium text-muted-foreground">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Analyze performance and usage data</p>
          </div>
          <div className="flex gap-2">
            <Select 
              value={year} 
              onValueChange={(value) => {
                setYear(value);
                toast({
                  title: "Year Changed",
                  description: `Analytics data updated for year ${value}.`,
                });
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={dateRange} 
              onValueChange={(value) => {
                setDateRange(value);
                toast({
                  title: "Date Range Changed",
                  description: `Analytics data updated for ${value.replace('last', 'last ')}${value === 'custom' ? ' range' : ''}.`,
                });
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">635,240</div>
              <p className="text-xs text-muted-foreground">+8.2% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average On-Time Performance</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.4%</div>
              <p className="text-xs text-muted-foreground">+3.1% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8M MAD</div>
              <p className="text-xs text-muted-foreground">+5.4% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">Improvement from last year</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="passengers" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-[400px] grid-cols-3">
                <TabsTrigger value="passengers">Passenger Trends</TabsTrigger>
                <TabsTrigger value="performance">Route Performance</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Select 
                  value={chartType} 
                  onValueChange={setChartType}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="passengers" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Passenger Volume</CardTitle>
                  <CardDescription>Total passenger count across all routes by month</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Chart visualization is currently under maintenance.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Route Performance Analysis</CardTitle>
                  <CardDescription>On-time performance metrics for top routes</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Chart visualization is currently under maintenance.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                  <CardDescription>Breakdown of revenue by service type</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Chart visualization is currently under maintenance.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Peak Hour Analysis</CardTitle>
              <CardDescription>Passenger volume by hour of day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Chart visualization is currently under maintenance.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Route Popularity</CardTitle>
              <CardDescription>Most used routes by passenger volume</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Chart visualization is currently under maintenance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

