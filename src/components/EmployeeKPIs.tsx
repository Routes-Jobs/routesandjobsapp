import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Users, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const KPICard = ({ title, value, subtitle, icon, trend, trendValue }: KPICardProps) => (
  <Card className="bg-card hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      {trend && trendValue && (
        <div className="flex items-center mt-2">
          <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}>
            <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trendValue}
          </Badge>
        </div>
      )}
    </CardContent>
  </Card>
);

const EmployeeKPIs = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Employee Performance Dashboard</h1>
        <p className="text-muted-foreground">Key performance indicators for Routes & Jobs workforce rideshare</p>
      </div>

      {/* Employee Arrival Tracking */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Employee Arrival Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="On-Time Arrival Rate"
            value="94.2%"
            subtitle="Employees arriving on schedule"
            icon={<Clock className="h-4 w-4" />}
            trend="up"
            trendValue="+2.1%"
          />
          <KPICard
            title="Rides Within Expected Time"
            value="89.7%"
            subtitle="Arrivals within 10-min window"
            icon={<CheckCircle className="h-4 w-4" />}
            trend="up"
            trendValue="+1.8%"
          />
          <KPICard
            title="No-Show/Late Rate"
            value="5.8%"
            subtitle="Missed or delayed arrivals"
            icon={<AlertTriangle className="h-4 w-4" />}
            trend="down"
            trendValue="-0.9%"
          />
        </div>
      </div>

      {/* Usage & Success Rate */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage & Success Rate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Weekly Active Users"
            value="73.4%"
            subtitle="Employees using app weekly"
            icon={<Users className="h-4 w-4" />}
            trend="up"
            trendValue="+5.2%"
          />
          <KPICard
            title="Monthly Active Users"
            value="91.1%"
            subtitle="Employees using app monthly"
            icon={<Users className="h-4 w-4" />}
            trend="up"
            trendValue="+3.7%"
          />
          <KPICard
            title="Rides Completed per Employee"
            value="18.3"
            subtitle="Average monthly rides"
            icon={<CheckCircle className="h-4 w-4" />}
            trend="up"
            trendValue="+2.1"
          />
        </div>
      </div>

      {/* Employee Satisfaction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Employee Satisfaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="App Rating"
            value="4.6/5"
            subtitle="Employee satisfaction score"
            icon={<TrendingUp className="h-4 w-4" />}
            trend="up"
            trendValue="+0.2"
          />
          <KPICard
            title="Service Rating"
            value="4.4/5"
            subtitle="Transportation quality rating"
            icon={<CheckCircle className="h-4 w-4" />}
            trend="neutral"
            trendValue="0.0"
          />
          <KPICard
            title="Recommendation Rate"
            value="87%"
            subtitle="Would recommend to colleagues"
            icon={<Users className="h-4 w-4" />}
            trend="up"
            trendValue="+4%"
          />
        </div>
      </div>

      {/* Cost & Savings Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Cost & Savings Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Cost Savings per Employee"
            value="$247"
            subtitle="Monthly transportation savings"
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
            trendValue="+$23"
          />
          <KPICard
            title="Total Company Savings"
            value="$186,420"
            subtitle="Monthly cost reduction"
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
            trendValue="+$15,200"
          />
          <KPICard
            title="Turnover Reduction"
            value="23%"
            subtitle="Decrease since implementation"
            icon={<TrendingUp className="h-4 w-4" />}
            trend="up"
            trendValue="+8%"
          />
          <KPICard
            title="Absenteeism Reduction"
            value="31%"
            subtitle="Decrease in missed days"
            icon={<CheckCircle className="h-4 w-4" />}
            trend="up"
            trendValue="+12%"
          />
        </div>
      </div>

      {/* Cost Breakdown Card */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Cost Comparison Breakdown</h2>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Transportation Cost Analysis</CardTitle>
            <CardDescription>Monthly cost comparison per employee</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Traditional Commuting (Gas + Parking)</span>
                <span className="font-medium text-foreground">$342/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Public Transit Pass</span>
                <span className="font-medium text-foreground">$128/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Routes & Jobs Service</span>
                <span className="font-medium text-primary">$95/month</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-foreground">Average Savings vs Alternatives</span>
                  <span className="text-green-600">$247/month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeKPIs;