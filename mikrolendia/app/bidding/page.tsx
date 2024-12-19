'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import useLoanContract from '@/lib/hooks/useLoanContract'

// Define a Loan type to provide better type safety
type Loan = {
  id: number;
  type: string;
  name: string;
  amount: number;
  description: string;
  contactNumber: string;
  strikes: number;
}

const DUMMY_LOANS: Loan[] = [
  { id: 1, type: 'Personal', name: 'John Doe', amount: 1000, description: 'Home renovation', contactNumber: '+1234567890', strikes: 0 },
  { id: 2, type: 'Business', name: 'Jane Smith', amount: 5000, description: 'Inventory purchase', contactNumber: '+1987654321', strikes: 1 },
  { id: 3, type: 'Student', name: 'Bob Johnson', amount: 2000, description: 'Tuition fees', contactNumber: '+1122334455', strikes: 0 },
  { id: 4, type: 'Personal', name: 'Alice Brown', amount: 3000, description: 'Medical expenses', contactNumber: '+1555666777', strikes: 2 },
  { id: 5, type: 'Business', name: 'Charlie Davis', amount: 10000, description: 'Equipment upgrade', contactNumber: '+1999888777', strikes: 0 },
]

export default function Bidding() {
  const {loanData}=useLoanContract()
  useEffect(()=>{
    console.log(loanData)
  }, [loanData])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(DUMMY_LOANS)
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [interestRate, setInterestRate] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    setFilteredLoans(
      DUMMY_LOANS.filter(loan => 
        loan.type.toLowerCase().includes(term) ||
        loan.name.toLowerCase().includes(term) ||
        loan.description.toLowerCase().includes(term)
      )
    )
  }

  const handleBid = (loan: Loan) => {
    setSelectedLoan(loan)
  }

  const submitBid = () => {
    if (selectedLoan && interestRate) {
      // Here you would typically send the bid to your backend
      console.log(`Bid submitted for loan ${selectedLoan.id} with interest rate ${interestRate}%`)
      setSelectedLoan(null)
      setInterestRate('')
    } else {
      console.error('Please select a loan and enter an interest rate before submitting the bid.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Loan Bidding</h1>
      <Input
        type="text"
        placeholder="Search loans..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => (
          <Card key={loan.id}>
            <CardHeader>
              <CardTitle>{loan.type} Loan</CardTitle>
              <CardDescription>{loan.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">${loan.amount}</p>
              <p className="text-sm mb-2">{loan.description}</p>
              <p className="text-sm mb-2">Contact: {loan.contactNumber}</p>
              <Badge variant={loan.strikes > 0 ? "destructive" : "secondary"}>
                Strikes: {loan.strikes}
              </Badge>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => handleBid(loan)}>Bid</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Place a Bid</DialogTitle>
                    <DialogDescription>
                      Enter the interest rate you want to offer for this loan.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="interest-rate" className="text-right">
                        Interest Rate (%)
                      </Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={submitBid}>Submit Bid</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
