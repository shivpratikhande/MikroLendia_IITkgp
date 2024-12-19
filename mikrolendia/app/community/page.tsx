'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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

  const handleJoin = (communityId: number) => {
    setJoinedCommunities(prev => [...prev, communities.find(c => c.id === communityId)!])
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
            <p className="text-center text-muted-foreground">You haven't joined any communities yet.</p>
          )}
        </TabsContent>
      </Tabs>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm">Amount: ${loan.amount}</span>
                  <Badge variant="secondary">{loan.approvals}/{loan.totalVotes} Approvals</Badge>
                </div>
                <Progress value={(loan.approvals / loan.totalVotes) * 100} className="mt-2" />
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

