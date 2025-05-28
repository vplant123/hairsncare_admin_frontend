
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  MessageSquare, 
  Calendar, 
  FileText, 
  AlertCircle, 
  ShieldCheck, 
  ShoppingCart 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Prescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [patientFilter, setPatientFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [prescriptionDetailOpen, setPrescriptionDetailOpen] = useState(false);
  const [confirmActionOpen, setConfirmActionOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Mock data for prescriptions
  const prescriptions = [
    { 
      id: 'PRE-2025-001', 
      patient: 'John Smith', 
      doctor: 'Dr. Sarah Johnson', 
      date: '2025-04-15', 
      status: 'pending',
      items: [
        { name: 'Amoxicillin 500mg', dosage: '1 pill 3 times a day', quantity: 21 },
        { name: 'Paracetamol 500mg', dosage: 'As needed for pain', quantity: 20 }
      ],
      notes: 'Patient has a bacterial infection and mild fever.',
      diagnosis: 'Bacterial Infection'
    },
    { 
      id: 'PRE-2025-002', 
      patient: 'Emily Davis', 
      doctor: 'Dr. James Wilson', 
      date: '2025-04-16', 
      status: 'pending',
      items: [
        { name: 'Loratadine 10mg', dosage: '1 pill once daily', quantity: 30 }
      ],
      notes: 'Patient has seasonal allergies.',
      diagnosis: 'Seasonal Allergies'
    },
    { 
      id: 'PRE-2025-003', 
      patient: 'Robert Johnson', 
      doctor: 'Dr. Maria Garcia', 
      date: '2025-04-14', 
      status: 'approved',
      items: [
        { name: 'Lisinopril 10mg', dosage: '1 pill once daily', quantity: 30 },
        { name: 'Amlodipine 5mg', dosage: '1 pill once daily', quantity: 30 }
      ],
      notes: 'Continue current hypertension medication regimen.',
      diagnosis: 'Hypertension'
    },
    { 
      id: 'PRE-2025-004', 
      patient: 'Michael Brown', 
      doctor: 'Dr. David Kim', 
      date: '2025-04-13', 
      status: 'rejected',
      items: [
        { name: 'Fluoxetine 20mg', dosage: '1 pill once daily', quantity: 30 }
      ],
      notes: 'Patient should be evaluated in person before starting this medication.',
      diagnosis: 'Depression and Anxiety',
      rejectionReason: 'Requires in-person evaluation before prescription'
    },
    { 
      id: 'PRE-2025-005', 
      patient: 'Lisa Wilson', 
      doctor: 'Dr. Sarah Johnson', 
      date: '2025-04-12', 
      status: 'changes_requested',
      items: [
        { name: 'Levothyroxine 50mcg', dosage: '1 pill once daily', quantity: 30 }
      ],
      notes: 'Patient has hypothyroidism.',
      diagnosis: 'Hypothyroidism',
      changeRequest: 'Please specify if this is a new prescription or refill and provide recent lab results.'
    },
  ];

  // Handle view prescription details
  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setPrescriptionDetailOpen(true);
  };

  // Handle prescription actions (approve, reject, request changes)
  const handleAction = (prescription, action) => {
    setSelectedPrescription(prescription);
    setActionType(action);
    setConfirmActionOpen(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'changes_requested':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Changes Requested</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Extract unique doctor and patient names for filters
  const uniqueDoctors = [...new Set(prescriptions.map(p => p.doctor))];
  const uniquePatients = [...new Set(prescriptions.map(p => p.patient))];

  // Filter prescriptions based on search query and filters
  const filteredPrescriptions = prescriptions.filter(prescription => {
    return (
      (searchQuery === '' || 
        prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (doctorFilter === 'all' || prescription.doctor === doctorFilter) &&
      (patientFilter === 'all' || prescription.patient === patientFilter) &&
      (statusFilter === 'all' || prescription.status === statusFilter)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Prescription Approval</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Approve Selected
            </Button>
          </div>
        </div>

        {/* Prescriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Prescription Requests</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by ID, patient or doctor..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {uniqueDoctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor}>{doctor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={patientFilter} onValueChange={setPatientFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    {uniquePatients.map((patient, index) => (
                      <SelectItem key={index} value={patient}>{patient}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="changes_requested">Changes Requested</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prescription ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.length > 0 ? (
                  filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>{prescription.patient}</TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewPrescription(prescription)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {prescription.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600"
                                onClick={() => handleAction(prescription, 'approve')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600"
                                onClick={() => handleAction(prescription, 'reject')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-amber-600"
                                onClick={() => handleAction(prescription, 'request_changes')}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No prescriptions found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Prescription Detail Dialog */}
        <Dialog open={prescriptionDetailOpen} onOpenChange={setPrescriptionDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Prescription {selectedPrescription?.id}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{selectedPrescription?.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{selectedPrescription?.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" /> 
                    <p className="font-medium">{selectedPrescription?.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">
                    {selectedPrescription && getStatusBadge(selectedPrescription.status)}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Diagnosis</p>
                <p className="bg-muted/50 p-3 rounded-md">{selectedPrescription?.diagnosis}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Prescribed Medications</p>
                <div className="bg-muted/50 p-3 rounded-md space-y-3">
                  {selectedPrescription?.items.map((item, index) => (
                    <div key={index} className="pb-2 border-b last:border-0 last:pb-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm">Dosage: {item.dosage}</div>
                      <div className="text-sm">Quantity: {item.quantity} units</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Doctor's Notes</p>
                <p className="bg-muted/50 p-3 rounded-md">{selectedPrescription?.notes}</p>
              </div>
              
              {selectedPrescription?.status === 'rejected' && (
                <div>
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-1" /> Rejection Reason
                  </p>
                  <p className="bg-red-50 text-red-800 p-3 rounded-md">
                    {selectedPrescription.rejectionReason}
                  </p>
                </div>
              )}
              
              {selectedPrescription?.status === 'changes_requested' && (
                <div>
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 text-amber-500 mr-1" /> Change Request
                  </p>
                  <p className="bg-amber-50 text-amber-800 p-3 rounded-md">
                    {selectedPrescription.changeRequest}
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedPrescription?.status === 'pending' ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPrescriptionDetailOpen(false);
                      handleAction(selectedPrescription, 'reject');
                    }}
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setPrescriptionDetailOpen(false);
                      handleAction(selectedPrescription, 'request_changes');
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Request Changes
                  </Button>
                  <Button 
                    onClick={() => {
                      setPrescriptionDetailOpen(false);
                      handleAction(selectedPrescription, 'approve');
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </>
              ) : (
                <Button onClick={() => setPrescriptionDetailOpen(false)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Action Dialog */}
        <Dialog open={confirmActionOpen} onOpenChange={setConfirmActionOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {actionType === 'approve' && 'Approve Prescription'}
                {actionType === 'reject' && 'Reject Prescription'}
                {actionType === 'request_changes' && 'Request Changes'}
              </DialogTitle>
            </DialogHeader>
            
            <div>
              {actionType === 'approve' && (
                <>
                  <div className="flex items-center text-green-600 mb-4">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    <p>You are about to approve this prescription</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md mb-4">
                    <p>Items will be added to the patient's cart:</p>
                    <ul className="list-disc pl-5 mt-2">
                      {selectedPrescription?.items.map((item, index) => (
                        <li key={index}>{item.name} ({item.quantity} units)</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              {actionType === 'reject' && (
                <>
                  <div className="flex items-center text-red-600 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p>You are about to reject this prescription</p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">Please provide a reason for rejection:</p>
                    <Input placeholder="Reason for rejection" />
                  </div>
                </>
              )}
              
              {actionType === 'request_changes' && (
                <>
                  <div className="flex items-center text-amber-600 mb-4">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <p>You are requesting changes to this prescription</p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2">Please describe the changes needed:</p>
                    <Input placeholder="Requested changes" />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmActionOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant={actionType === 'reject' ? 'destructive' : 'default'}
                onClick={() => {
                  // Implement action logic here
                  console.log(`${actionType} prescription ${selectedPrescription?.id}`);
                  setConfirmActionOpen(false);
                  
                  // Show cart notification if approving
                  if (actionType === 'approve') {
                    // Show success notification
                  }
                }}
              >
                {actionType === 'approve' && (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart & Approve
                  </>
                )}
                {actionType === 'reject' && 'Confirm Rejection'}
                {actionType === 'request_changes' && 'Send Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
