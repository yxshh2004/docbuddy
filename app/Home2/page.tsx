'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  Clock,
  Video,
  MessageCircle,
  FileText,
  Heart,
  User,
  Settings,
  Bell,
  Download,
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2024-01-15',
    time: '2:30 PM',
    type: 'Video Call',
    avatar: 'https://images.pexels.com/photos/559628/pexels-photo-559628.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'confirmed'
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    date: '2024-01-18',
    time: '10:00 AM',
    type: 'Chat',
    avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'pending'
  }
];

const pastAppointments = [
  {
    id: 3,
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    date: '2024-01-10',
    time: '3:00 PM',
    type: 'Video Call',
    avatar: 'https://images.pexels.com/photos/4270371/pexels-photo-4270371.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'completed',
    rating: 5,
    prescription: true
  },
  {
    id: 4,
    doctor: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    date: '2024-01-05',
    time: '11:30 AM',
    type: 'Video Call',
    avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'completed',
    rating: 4,
    prescription: false
  }
];

const healthRecords = [
  {
    id: 1,
    title: 'Blood Test Results',
    date: '2024-01-10',
    doctor: 'Dr. Emily Rodriguez',
    type: 'Lab Report'
  },
  {
    id: 2,
    title: 'Chest X-Ray',
    date: '2024-01-05',
    doctor: 'Dr. James Wilson',
    type: 'Imaging'
  },
  {
    id: 3,
    title: 'Prescription - Antibiotics',
    date: '2024-01-10',
    doctor: 'Dr. Emily Rodriguez',
    type: 'Prescription'
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, John!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none bg-white p-1">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Today</div>
                  <p className="text-xs text-muted-foreground">2:30 PM with Dr. Sarah Johnson</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Good health indicators</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {appointment.type === 'Video Call' ? <Video className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Records */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Health Records</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {healthRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{record.title}</h4>
                          <p className="text-sm text-gray-600">{record.doctor} • {record.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                            <p className="text-gray-600">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <Badge>{appointment.type}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">Reschedule</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Join Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                            <p className="text-gray-600">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(appointment.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">View Notes</Button>
                          {appointment.prescription && (
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Prescription
                            </Button>
                          )}
                          <Button variant="outline">Book Again</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Health Records</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="grid gap-4">
              {healthRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{record.title}</h3>
                          <p className="text-gray-600">{record.doctor}</p>
                          <p className="text-sm text-gray-500 mt-1">{record.date} • {record.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-gray-600">john.doe@email.com</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Personal Information</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="p-2 border rounded">John Doe</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="p-2 border rounded">john.doe@email.com</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <div className="p-2 border rounded">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Medical Information</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <div className="p-2 border rounded">January 15, 1990</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Type</label>
                      <div className="p-2 border rounded">O+</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Allergies</label>
                      <div className="p-2 border rounded">Penicillin, Shellfish</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}