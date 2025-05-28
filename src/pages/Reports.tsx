
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, FileCheck, FileText, FileWarning, UploadCloud, Search, Filter, Download } from 'lucide-react';

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock data for reports
  const reports = [
    { id: 1, name: 'Blood Test Report', type: 'Laboratory', date: '2025-04-10', uploadedBy: 'Dr. Sarah Johnson', patient: 'John Smith', status: 'reviewed' },
    { id: 2, name: 'X-Ray Report', type: 'Radiology', date: '2025-04-12', uploadedBy: 'Dr. James Wilson', patient: 'Emily Davis', status: 'uploaded' },
    { id: 3, name: 'MRI Scan', type: 'Radiology', date: '2025-04-14', uploadedBy: 'Dr. Maria Garcia', patient: 'Robert Johnson', status: 'flagged' },
    { id: 4, name: 'Allergy Test', type: 'Laboratory', date: '2025-04-15', uploadedBy: 'Dr. Sarah Johnson', patient: 'Michael Brown', status: 'reviewed' },
    { id: 5, name: 'ECG Report', type: 'Cardiology', date: '2025-04-16', uploadedBy: 'Dr. David Kim', patient: 'Lisa Wilson', status: 'uploaded' },
  ];

  // Handle file upload
  const handleFileUpload = (e) => {
    console.log('Files uploaded:', e.target.files);
    // Implement file upload logic here
  };

  // Open report preview
  const openPreview = (report) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  // Get status icon based on report status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'reviewed':
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case 'flagged':
        return <FileWarning className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    return (
      (searchQuery === '' || 
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.patient.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (reportTypeFilter === '' || report.type === reportTypeFilter) &&
      (dateFilter === '' || report.date.includes(dateFilter))
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medical Reports</h1>
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload New Report
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Medical Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
              <p className="text-sm text-gray-500 mb-4">Or click to browse files (PDF, DOC, JPEG, PNG)</p>
              <Input 
                type="file" 
                className="hidden" 
                id="report-upload" 
                multiple 
                onChange={handleFileUpload} 
              />
              <Button asChild>
                <label htmlFor="report-upload">Select Files</label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by report name or patient..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="2025-04">April 2025</SelectItem>
                    <SelectItem value="2025-03">March 2025</SelectItem>
                    <SelectItem value="2025-02">February 2025</SelectItem>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{getStatusIcon(report.status)}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.uploadedBy}</TableCell>
                      <TableCell>{report.patient}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openPreview(report)}>
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No reports found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Report Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedReport?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="bg-gray-100 rounded-md p-4 aspect-video flex items-center justify-center">
              <FileText className="h-16 w-16 text-gray-400" />
              <p className="ml-4 text-gray-500">Preview would appear here</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Uploaded By</p>
                <p className="font-medium">{selectedReport?.uploadedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium">{selectedReport?.patient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedReport?.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedReport?.date}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Download</Button>
              <Button>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
