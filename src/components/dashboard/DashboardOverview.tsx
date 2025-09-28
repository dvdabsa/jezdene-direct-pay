import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";
import { PaymentLinks } from "./PaymentLinks";

export function DashboardOverview() {
  // Mock data - in real app this would come from API
  const stats = {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalTransactions: 2350,
    transactionsChange: 180.1,
    successRate: 98.5,
    successRateChange: 1.2,
    pendingPayouts: 12543.21,
  };

  const recentTransactions = [
    { id: "txn_001", amount: 299.99, status: "completed", customer: "john@example.com", time: "2 minutes ago" },
    { id: "txn_002", amount: 149.50, status: "completed", customer: "sarah@example.com", time: "5 minutes ago" },
    { id: "txn_003", amount: 599.00, status: "pending", customer: "mike@example.com", time: "8 minutes ago" },
    { id: "txn_004", amount: 89.99, status: "completed", customer: "lisa@example.com", time: "12 minutes ago" },
    { id: "txn_005", amount: 399.99, status: "failed", customer: "david@example.com", time: "15 minutes ago" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your payments today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.revenueChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.transactionsChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.successRateChange}% from last month
            </p>
            <Progress value={stats.successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Next payout in 2 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-links">Payment Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest payment activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">${transaction.amount}</p>
                          <p className="text-xs text-muted-foreground">{transaction.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(transaction.status)}
                        <p className="text-xs text-muted-foreground mt-1">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Create Payment Link
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View All Customers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Request Payout
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-links">
          <PaymentLinks />
        </TabsContent>
      </Tabs>
    </div>
  );
}