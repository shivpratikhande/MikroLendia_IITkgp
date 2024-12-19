'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Mock data for communities
const communities = [
  { id: 1, name: 'Small Business Boost', description: 'Supporting local entrepreneurs', funds: 50000, members: 1200, joined: false },
  { id: 2, name: 'Tech Startups United', description: 'Fueling innovation in tech', funds: 75000, members: 800, joined: true },
  { id: 3, name: 'Green Energy Initiative', description: 'Investing in sustainable projects', funds: 100000, members: 1500, joined: false },
]

// Mock data for loan requests
const loanRequests = [
  { id: 1, title: 'Eco-friendly Packaging', amount: 5000, description: 'Funds for sustainable packaging materials', approvals: 45, totalVotes: 60 },
  { id: 2, title: 'AI-powered Crop Monitoring', amount: 10000, description: 'Developing smart agriculture solutions', approvals: 30, totalVotes: 50 },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('all')
  const [joinedCommunities, setJoinedCommunities] = useState(communities.filter(c => c.joined))
  const [loanType, setLoanType] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [loanDescription, setLoanDescription] = useState('')

  const handleJoin = (communityId: number) => {
    setJoinedCommunities(prev => [...prev, communities.find(c => c.id === communityId)!])
  }

  const handleLoanRequest = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the loan request to your backend
    console.log({ loanType, loanAmount, loanDescription })
    // Reset form
    setLoanType('')
    setLoanAmount('')
    setLoanDescription('')
  }

  const filteredCommunities = activeTab === 'all' ? communities : joinedCommunities

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Communities</h1>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Communities</TabsTrigger>
          <TabsTrigger value="joined">Joined Communities</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} onJoin={handleJoin} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="joined">
          {joinedCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} onJoin={handleJoin} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">You haven&apos;t joined any communities yet.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Request a Loan</h2>
        <Card>
          <CardHeader>
            <CardTitle>New Loan Request</CardTitle>
            <CardDescription>Fill out the form below to request a loan from the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoanRequest} className="space-y-4">
              <div>
                <Label htmlFor="loan-type">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger id="loan-type">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                />
              </div>
              <div>
                <Label htmlFor="loan-description">Loan Description</Label>
                <Textarea
                  id="loan-description"
                  value={loanDescription}
                  onChange={(e) => setLoanDescription(e.target.value)}
                  placeholder="Describe the purpose of your loan"
                />
              </div>
              <Button type="submit">Submit Loan Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function CommunityCard({ community, onJoin }: { community: any, onJoin: (id: number) => void }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{community.name}</CardTitle>
        <CardDescription>{community.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <span>Available Funds:</span>
          <span className="font-semibold">${community.funds.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Members:</span>
          <span className="font-semibold">{community.members.toLocaleString()}</span>
        </div>
        {showDetails && community.joined && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Active Loan Requests</h4>
            {loanRequests.map((loan) => (
              <div key={loan.id} className="mb-4">
                <h5 className="font-medium">{loan.title}</h5>
                <p className="text-sm text-muted-foreground mb-1">{loan.description}</p>
                <div className='flex justify-between'>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Amount: ${loan.amount}</span>
                      <Badge variant="secondary">{loan.approvals}/{loan.totalVotes} Approvals</Badge>
                    </div>
                    <Progress value={(loan.approvals / loan.totalVotes) * 100} className="mt-2" />
                  </div>
                  <Button>
                   Approve
                  </Button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        {!community.joined && (
          <Button onClick={() => onJoin(community.id)}>Join Community</Button>
        )}
      </CardFooter>
    </Card>
  )
}

