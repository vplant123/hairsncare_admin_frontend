
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for logs
  const logs = [
    { 
      id: 1, 
      timestamp: '2025-04-17 08:45:23', 
      admin: 'Dr. Sarah Johnson', 
      action: 'Approved prescription for Patient John Smith', 
      ip: '192.168.1.102' 
    },
    { 
      id: 2, 
      timestamp: '2025-04-17 09:12:07', 
      admin: 'Dr. James Wilson', 
      action: 'Updated patient profile for Emily Davis', 
      ip: '192.168.1.105' 
    },
    { 
      id: 3, 
      timestamp: '2025-04-16 14:30:45', 
      admin: 'Admin User', 
      action: 'Added new product to inventory: Paracetamol 500mg', 
      ip: '192.168.1.100' 
    },
    { 
      id: 4, 
      timestamp: '2025-04-16 11:22:18', 
      admin: 'Admin User', 
      action: 'Updated order status to delivered: ORD-2025-001', 
      ip: '192.168.1.100' 
    },
    { 
      id: 5, 
      timestamp: '2025-04-15 16:05:39', 
      admin: 'Dr. Maria Garcia', 
      action: 'Scheduled appointment for Patient Robert Johnson', 
      ip: '192.168.1.112' 
    },
    { 
      id: 6, 
      timestamp: '2025-04-15 10:47:23', 
      admin: 'Admin User', 
      action: 'Created new coupon: WELCOME25', 
      ip: '192.168.1.100' 
    },
    { 
      id: 7, 
      timestamp: '2025-04-14 13:15:02', 
      admin: 'Dr. David Kim', 
      action: 'Rejected prescription for Patient Michael Brown', 
      ip: '192.168.1.118' 
    },
    { 
      id: 8, 
      timestamp: '2025-04-14 09:30:45', 
      admin: 'Admin User', 
      action: 'Generated monthly sales report', 
      ip: '192.168.1.100' 
    },
    { 
      id: 9, 
      timestamp: '2025-04-13 15:20:33', 
      admin: 'Dr. Sarah Johnson', 
      action: 'Updated prescription for Patient Lisa Wilson', 
      ip: '192.168.1.102' 
    },
    { 
      id: 10, 
      timestamp: '2025-04-13 11:05:17', 
      admin: 'Admin User', 
      action: 'Deactivated coupon: SPRING30', 
      ip: '192.168.1.100' 
    },
    { 
      id: 11, 
      timestamp: '2025-04-12 16:42:08', 
      admin: 'Dr. James Wilson', 
      action: 'Cancelled appointment for Patient John Smith', 
      ip: '192.168.1.105' 
    },
    { 
      id: 12, 
      timestamp: '2025-04-12 10:15:30', 
      admin: 'Admin User', 
      action: 'Updated system settings', 
      ip: '192.168.1.100' 
    },
  ];

  // Format date and time
  const formatDateTime = (datetime) => {
    const [date, time] = datetime.split(' ');
    return (
      <div>
        <div className="font-medium">{date}</div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
    );
  };

  // Extract unique admin names and action types for filters
  const uniqueAdmins = [...new Set(logs.map(log => log.admin))];
  const actionTypes = [
    'Approved prescription',
    'Updated patient profile',
    'Added new product',
    'Updated order status',
    'Scheduled appointment',
    'Created new coupon',
    'Rejected prescription',
    'Generated report',
    'Updated prescription',
    'Deactivated coupon',
    'Cancelled appointment',
    'Updated system settings'
  ];

  // Filter logs based on search query and filters
  const filteredLogs = logs.filter(log => {
    return (
      (searchQuery === '' || 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.admin.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (adminFilter === '' || log.admin === adminFilter) &&
      (actionFilter === '' || log.action.includes(actionFilter)) &&
      (dateFilter === '' || log.timestamp.includes(dateFilter))
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">System Logs</h1>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={adminFilter} onValueChange={setAdminFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Admins</SelectItem>
                    {uniqueAdmins.map((admin, index) => (
                      <SelectItem key={index} value={admin}>{admin}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {actionTypes.map((action, index) => (
                      <SelectItem key={index} value={action}>{action}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="2025-04-17">Today (Apr 17)</SelectItem>
                    <SelectItem value="2025-04-16">Yesterday (Apr 16)</SelectItem>
                    <SelectItem value="2025-04-15">Apr 15, 2025</SelectItem>
                    <SelectItem value="2025-04-14">Apr 14, 2025</SelectItem>
                    <SelectItem value="2025-04-13">Apr 13, 2025</SelectItem>
                    <SelectItem value="2025-04-12">Apr 12, 2025</SelectItem>
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
                  <TableHead className="w-[180px]">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Timestamp
                    </div>
                  </TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Admin
                    </div>
                  </TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="w-[120px]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                      <TableCell className="font-medium">{log.admin}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-muted-foreground">{log.ip}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No logs found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {filteredLogs.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Page Button - Fixing the disabled prop issue */}
                    <PaginationItem>
                      {currentPage === 1 ? (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          disabled 
                          className="h-9 w-9"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      ) : (
                        <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                      )}
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {/* Next Page Button - Fixing the disabled prop issue */}
                    <PaginationItem>
                      {currentPage === totalPages ? (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          disabled 
                          className="h-9 w-9"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
