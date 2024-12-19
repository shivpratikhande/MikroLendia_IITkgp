'use client'

import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DUMMY_REQUESTED_LOANS = [
  { id: 1, type: 'Personal', amount: 2000, status: 'Pending' },
  { id: 2, type: 'Business', amount: 5000, status: 'Approved' },
]

const DUMMY_BIDS = [
  { id: 1, loanType: 'Student', amount: 1500, status: 'Active' },
  { id: 2, loanType: 'Personal', amount: 3000, status: 'Completed' },
]

const DUMMY_TRANSACTIONS = [
  { id: 1, type: 'Deposit', amount: 1000, date: '2023-06-01' },
  { id: 2, type: 'Withdrawal', amount: 500, date: '2023-06-15' },
]

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="requested-loans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requested-loans">Requested Loans</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="requested-loans">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DUMMY_REQUESTED_LOANS.map((loan, index) => (
                  <motion.tr
                    key={loan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>${loan.amount}</TableCell>
                    <TableCell>{loan.status}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="bids">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Bid Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DUMMY_BIDS.map((bid, index) => (
                  <motion.tr
                    key={bid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>{bid.loanType}</TableCell>
                    <TableCell>${bid.amount}</TableCell>
                    <TableCell>{bid.status}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DUMMY_TRANSACTIONS.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

