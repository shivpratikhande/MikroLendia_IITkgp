'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const DUMMY_REQUESTED_LOANS = [
  { id: 1, type: 'Personal', amount: 2000, status: 'Pending', description: 'Home repairs', interestRate: 5 },
  { id: 2, type: 'Business', amount: 5000, status: 'Approved', description: 'Inventory purchase', interestRate: 7 },
]

const DUMMY_BIDS = [
  { id: 1, loanType: 'Student', amount: 1500, status: 'Active', borrower: 'Alice Johnson', interestRate: 4 },
  { id: 2, loanType: 'Personal', amount: 3000, status: 'Completed', borrower: 'Bob Smith', interestRate: 6 },
]

const DUMMY_TRANSACTIONS = [
  { id: 1, type: 'Deposit', amount: 1000, date: '2023-06-01', status: 'Completed' },
  { id: 2, type: 'Withdrawal', amount: 500, date: '2023-06-15', status: 'Pending' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  console.log(activeTab)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requested-loans">Requested Loans</TabsTrigger>
          <TabsTrigger value="my-bids">My Bids</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Biddings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">7</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$1,200</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requested-loans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_REQUESTED_LOANS.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <CardTitle>{loan.type} Loan</CardTitle>
                  <CardDescription>${loan.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="mb-2">{loan.status}</Badge>
                  <p className="text-sm mb-2">{loan.description}</p>
                  <p className="text-sm">Interest Rate: {loan.interestRate}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-bids">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_BIDS.map((bid) => (
              <Card key={bid.id}>
                <CardHeader>
                  <CardTitle>{bid.loanType} Loan</CardTitle>
                  <CardDescription>${bid.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="mb-2">{bid.status}</Badge>
                  <p className="text-sm mb-2">Borrower: {bid.borrower}</p>
                  <p className="text-sm">Interest Rate: {bid.interestRate}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_TRANSACTIONS.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader>
                  <CardTitle>{transaction.type}</CardTitle>
                  <CardDescription>{transaction.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">${transaction.amount}</p>
                  <Badge>{transaction.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

