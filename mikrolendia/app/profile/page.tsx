'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Profile() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profession, setProfession] = useState('')
  const [metamaskAddress, setMetamaskAddress] = useState('')

  useEffect(() => {
    // Simulating fetching user data
    // In a real application, you would fetch this data from your backend
    setName('John Doe')
    setAge('30')
    setCity('New York')
    setPhoneNumber('+1234567890')
    setProfession('Software Developer')
    setMetamaskAddress('0x1234...5678')
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the updated profile data to your backend
    console.log({ name, age, city, phoneNumber, profession, metamaskAddress })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
          <CardDescription>Manage your account information and view your lending activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal-info">
            <TabsList className="mb-4">
              <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
              <TabsTrigger value="lending-activity">Lending Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="personal-info">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Select value={profession} onValueChange={setProfession}>
                      <SelectTrigger id="profession">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metamask-address">Metamask Address</Label>
                    <Input
                      id="metamask-address"
                      value={metamaskAddress}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Update Profile</Button>
              </form>
            </TabsContent>
            <TabsContent value="lending-activity">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Loans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You currently have 2 active loans.</p>
                    {/* Add more detailed loan information here */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lending History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You have participated in 5 loans to date.</p>
                    {/* Add a table or list of past loans here */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Community Participation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You are a member of 3 lending communities.</p>
                    {/* Add a list of communities and participation stats here */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

