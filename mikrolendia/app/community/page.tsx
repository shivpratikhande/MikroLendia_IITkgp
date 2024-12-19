'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Community, LoanRequest } from '@/types/type'
import CommunityCard from '@/components/community-card'

const initialCommunities: Community[] = [
  { id: 1, name: 'Small Business Boost', description: 'Supporting local entrepreneurs', funds: 50000, members: 1200, joined: false, interestRate: 5 },
  { id: 2, name: 'Tech Startups United', description: 'Fueling innovation in tech', funds: 75000, members: 800, joined: true, interestRate: 7 },
  { id: 3, name: 'Green Energy Initiative', description: 'Investing in sustainable projects', funds: 100000, members: 1500, joined: false, interestRate: 6 },
]

const initialLoanRequests: LoanRequest[] = [
  { id: 1, title: 'Eco-friendly Packaging', amount: 5000, description: 'Funds for sustainable packaging materials', approvals: 45, totalVotes: 60, requestor: 'Alice Green', communityId: 1 },
  { id: 2, title: 'AI-powered Crop Monitoring', amount: 10000, description: 'Developing smart agriculture solutions', approvals: 30, totalVotes: 50, requestor: 'Bob Smith', communityId: 2 },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('all')
  const [communities, setCommunities] = useState<Community[]>(initialCommunities)
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(initialLoanRequests)
  const [newCommunityName, setNewCommunityName] = useState('')
  const [newCommunityDescription, setNewCommunityDescription] = useState('')
  const [newCommunityInterestRate, setNewCommunityInterestRate] = useState('')
  const [showNewCommunityDialog, setShowNewCommunityDialog] = useState(false)

  const joinedCommunities = communities.filter(c => c.joined)

  const handleJoin = (communityId: number) => {
    setCommunities(communities.map(c => 
      c.id === communityId ? { ...c, joined: true } : c
    ))
  }

  const handleCreateCommunity = () => {
    const newCommunity: Community = {
      id: communities.length + 1,
      name: newCommunityName,
      description: newCommunityDescription,
      funds: 0,
      members: 1,
      joined: true,
      interestRate: parseFloat(newCommunityInterestRate)
    }
    setCommunities([...communities, newCommunity])
    setShowNewCommunityDialog(false)
    setNewCommunityName('')
    setNewCommunityDescription('')
    setNewCommunityInterestRate('')
  }

  const handleLoanRequest = (communityId: number, loanType: string, amount: number, description: string) => {
    const newLoanRequest: LoanRequest = {
      id: loanRequests.length + 1,
      title: `${loanType} Loan`,
      amount,
      description,
      approvals: 0,
      totalVotes: 0,
      requestor: 'Current User', // In a real app, this would be the logged-in user's name
      communityId
    }
    setLoanRequests([...loanRequests, newLoanRequest])
  }

  const handleApproveLoan = (loanId: number) => {
    setLoanRequests(loanRequests.map(loan =>
      loan.id === loanId ? { ...loan, approvals: loan.approvals + 1, totalVotes: loan.totalVotes + 1 } : loan
    ))
  }

  const filteredCommunities = activeTab === 'all' ? communities : joinedCommunities

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Communities</h1>
        <Button onClick={() => setShowNewCommunityDialog(true)}>Create Community</Button>
      </div>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Communities</TabsTrigger>
          <TabsTrigger value="joined">Joined Communities</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.id} 
                community={community} 
                onJoin={handleJoin} 
                onLoanRequest={handleLoanRequest}
                loanRequests={loanRequests}
                onApproveLoan={handleApproveLoan}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="joined">
          {joinedCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.map((community) => (
                <CommunityCard 
                  key={community.id} 
                  community={community} 
                  onJoin={handleJoin} 
                  onLoanRequest={handleLoanRequest}
                  loanRequests={loanRequests}
                  onApproveLoan={handleApproveLoan}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">You haven&#39;t joined any communities yet.</p>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showNewCommunityDialog} onOpenChange={setShowNewCommunityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Community</DialogTitle>
            <DialogDescription>Fill out the details to create a new community.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="community-name">Community Name</Label>
              <Input
                id="community-name"
                value={newCommunityName}
                onChange={(e) => setNewCommunityName(e.target.value)}
                placeholder="Enter community name"
              />
            </div>
            <div>
              <Label htmlFor="community-description">Description</Label>
              <Textarea
                id="community-description"
                value={newCommunityDescription}
                onChange={(e) => setNewCommunityDescription(e.target.value)}
                placeholder="Describe the community's purpose"
              />
            </div>
            <div>
              <Label htmlFor="community-interest-rate">Fixed Loan Interest Rate (%)</Label>
              <Input
                id="community-interest-rate"
                type="number"
                value={newCommunityInterestRate}
                onChange={(e) => setNewCommunityInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCommunity}>Create Community</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}


