
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye, Trash2, Search, UserPlus, Filter } from 'lucide-react';

// Sample data for doctors
const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@example.com', phone: '(555) 123-4567', status: 'Active' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology', email: 'michael.chen@example.com', phone: '(555) 234-5678', status: 'Active' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', email: 'emily.rodriguez@example.com', phone: '(555) 345-6789', status: 'Inactive' },
  { id: 4, name: 'Dr. David Kim', specialization: 'Orthopedics', email: 'david.kim@example.com', phone: '(555) 456-7890', status: 'Active' },
  { id: 5, name: 'Dr. Jessica Taylor', specialization: 'Dermatology', email: 'jessica.taylor@example.com', phone: '(555) 567-8901', status: 'Active' },
];

// Sample data for patients
const patients = [
  { id: 1, name: 'John Smith', age: 45, email: 'john.smith@example.com', phone: '(555) 987-6543', status: 'Active' },
  { id: 2, name: 'Maria Garcia', age: 32, email: 'maria.garcia@example.com', phone: '(555) 876-5432', status: 'Active' },
  { id: 3, name: 'Robert Johnson', age: 58, email: 'robert.johnson@example.com', phone: '(555) 765-4321', status: 'Inactive' },
  { id: 4, name: 'Samantha Lee', age: 27, email: 'samantha.lee@example.com', phone: '(555) 654-3210', status: 'Active' },
  { id: 5, name: 'William Davis', age: 63, email: 'william.davis@example.com', phone: '(555) 543-2109', status: 'Active' },
];

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-health-primary hover:bg-health-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Tabs defaultValue="doctors" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="doctors" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Doctors</CardTitle>
              <CardDescription>Manage doctor accounts and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>
                        <span className={doctor.status === 'Active' ? 'status-badge status-badge-active' : 'status-badge status-badge-inactive'}>
                          {doctor.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => viewUserDetails(doctor)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Patients</CardTitle>
              <CardDescription>Manage patient accounts and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>
                        <span className={patient.status === 'Active' ? 'status-badge status-badge-active' : 'status-badge status-badge-inactive'}>
                          {patient.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => viewUserDetails(patient)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected user.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="mt-4 space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-health-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-health-primary">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {'specialization' in selectedUser ? selectedUser.specialization : `Patient, ${selectedUser.age} years old`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    <span className={selectedUser.status === 'Active' ? 'status-badge status-badge-active' : 'status-badge status-badge-inactive'}>
                      {selectedUser.status}
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">#{selectedUser.id}</p>
                </div>
              </div>
              
              {'specialization' in selectedUser ? (
                <div className="space-y-2">
                  <h4 className="font-medium">Assigned Patients</h4>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">No patients assigned yet.</p>
                  </div>
                  <Button variant="outline" className="w-full text-health-primary">
                    Assign Patients
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-medium">Assigned Doctor</h4>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">No doctor assigned yet.</p>
                  </div>
                  <Button variant="outline" className="w-full text-health-primary">
                    Assign Doctor
                  </Button>
                </div>
              )}
              
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" className="text-red-500 hover:text-red-500">
                  Deactivate Account
                </Button>
                <Button className="bg-health-primary hover:bg-health-primary/90">
                  Edit Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserManagement;
