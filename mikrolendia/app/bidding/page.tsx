'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { motion } from 'framer-motion'

const DUMMY_LOANS = [
  { id: 1, type: 'Personal', amount: 1000, description: 'Home renovation' },
  { id: 2, type: 'Business', amount: 5000, description: 'Inventory purchase' },
  { id: 3, type: 'Student', amount: 2000, description: 'Tuition fees' },
  { id: 4, type: 'Personal', amount: 3000, description: 'Medical expenses' },
  { id: 5, type: 'Business', amount: 10000, description: 'Equipment upgrade' },
]

export default function Bidding() {
  const [searchAmount, setSearchAmount] = useState('')
  const [filteredLoans, setFilteredLoans] = useState(DUMMY_LOANS)

  const handleSearch = () => {
    const amount = parseFloat(searchAmount)
    if (!isNaN(amount)) {
      setFilteredLoans(DUMMY_LOANS.filter(loan => loan.amount <= amount))
    } else {
      setFilteredLoans(DUMMY_LOANS)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Loan Bidding</h1>
      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <Input
          type="number"
          placeholder="Max loan amount"
          value={searchAmount}
          onChange={(e) => setSearchAmount(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLoans.map((loan, index) => (
              <motion.tr
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell>{loan.type}</TableCell>
                <TableCell>${loan.amount}</TableCell>
                <TableCell>{loan.description}</TableCell>
                <TableCell>
                  <Button variant="outline">Bid</Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}

