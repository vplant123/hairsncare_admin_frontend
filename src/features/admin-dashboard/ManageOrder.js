// import React, { useState } from 'react';
// import AdminNavbar from './AdminNavbar';

// const dummyData = [
//   { id: 1, customerName: "John Doe", amount: 50, status: "Pending" },
//   { id: 2, customerName: "Jane Smith", amount: 100, status: "Pending" },
//   { id: 3, customerName: "Michael Johnson", amount: 75, status: "Pending" }
// ];

// function ManageOrder() {
//   const [orders, setOrders] = useState(dummyData);

//   const handleStatusChange = (orderId, status) => {
//     const updatedOrders = orders.map(order => {
//       if (order.id === orderId) {
//         return { ...order, status };
//       }
//       return order;
//     });
//     setOrders(updatedOrders);
//   };

//   return (
//   <AdminNavbar>
//       <div className="manage-order-container">
//       <h2>Manage Orders</h2>
//       {orders.map(order => (
//         <div className="order-item" key={order.id}>
//           <div className="order-details">
//             <h3>Order ID: {order.id}</h3>
//             <p>Customer Name: {order.customerName}</p>
//             <p>Amount: ${order.amount}</p>
//             <p>Status: {order.status}</p>
//           </div>
//           <div className="status-buttons">
//             <button onClick={() => handleStatusChange(order.id, 'Accepted')}>Accept</button>
//             <button onClick={() => handleStatusChange(order.id, 'Shipped')}>Ship</button>
//             <button onClick={() => handleStatusChange(order.id, 'Delivered')}>Deliver</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </AdminNavbar>
//   );
// }

// export default ManageOrder;
// import React, { useState, useMemo } from 'react';
// import AdminNavbar from './AdminNavbar';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';
// import { MenuItem, Select } from '@mui/material';

// // Sample data including status
// const data = [
//   {
//     order_id: '123456',
//     customer: {
//       customer_id: '98765',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '+1-234-567-8901',
//       shipping_address: {
//         address_line1: '123 Main St',
//         address_line2: 'Apt 4B',
//         city: 'Anytown',
//         state: 'CA',
//         postal_code: '12345',
//         country: 'USA',
//       },
//     },
//     items: [
//       {
//         item_id: '1001',
//         name: 'Widget A',
//         quantity: 2,
//         price: 25.0,
//         total: 50.0,
//       },
//       {
//         item_id: '1002',
//         name: 'Widget B',
//         quantity: 1,
//         price: 15.0,
//         total: 15.0,
//       },
//     ],
//     payment: {
//       method: 'credit_card',
//       transaction_id: 'abc123',
//       amount: 65.0,
//       currency: 'USD',
//       status: 'paid',
//     },
//     total: {
//       subtotal: 65.0,
//       shipping: 5.0,
//       tax: 0.0,
//       discount: 0.0,
//       grand_total: 70.0,
//     },
//     status: 'Pending',
//     created_at: '2024-06-25T10:00:00Z',
//     updated_at: '2024-06-25T15:00:00Z',
//   },
//   {
//     order_id: '123457',
//     customer: {
//       customer_id: '98766',
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       phone: '+1-234-567-8902',
//       shipping_address: {
//         address_line1: '456 Another St',
//         address_line2: 'Suite 12',
//         city: 'Othertown',
//         state: 'NY',
//         postal_code: '67890',
//         country: 'USA',
//       },
//     },
//     items: [
//       {
//         item_id: '1003',
//         name: 'Gadget X',
//         quantity: 1,
//         price: 99.99,
//         total: 99.99,
//       },
//     ],
//     payment: {
//       method: 'paypal',
//       transaction_id: 'xyz789',
//       amount: 104.99,
//       currency: 'USD',
//       status: 'paid',
//     },
//     total: {
//       subtotal: 99.99,
//       shipping: 5.0,
//       tax: 0.0,
//       discount: 0.0,
//       grand_total: 104.99,
//     },
//     status: 'Pending',
//     created_at: '2024-06-24T09:30:00Z',
//     updated_at: '2024-06-24T11:00:00Z',
//   },
// ];

// const ManageOrder = () => {
//   // Define the order statuses
//   const statuses = ['processing', 'shipped', 'delivered', 'canceled', 'pending'];

//   // Set up state for the table data
//   const [tableData, setTableData] = useState(data);

//   // Handle status change
//   const handleStatusChange = (orderId, newStatus) => {
//     setTableData(prevData =>
//       prevData.map(order =>
//         order.order_id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   // Define columns with a custom cell for the status column
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'order_id',
//         header: 'Order Id',
//         size: 150,
//       },
//       {
//         accessorKey: 'customer.name',
//         header: 'First Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'customer.shipping_address.address_line1',
//         header: 'Address',
//         size: 200,
//       },
//       {
//         accessorKey: 'total.grand_total',
//         header: 'Total Amount',
//         size: 150,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 150,
//         Cell: ({ cell }) => {
//           const status = cell.row.original.status.toLowerCase();
//           let backgroundColor;
// let color;
//           switch (status) {
//             case 'delivered':
//               backgroundColor = 'green';
//               break;
//             case 'canceled':
//               backgroundColor = 'red';
//               break;
//             case 'processing':
//               backgroundColor = 'blue';
//               color='white'
//               break;
//             case 'pending':
//               backgroundColor = 'yellow';
//               break;
//             case 'shipped':
//               backgroundColor = 'orange';
//               break;
//             default:
//               backgroundColor = 'white';
//           }

//           return (
//             <div style={{ backgroundColor,color,display:'inline', padding: '10px', borderRadius: '4px' }}>
//               {cell.row.original.status}
//             </div>
//           );
//         },
//       },
//       {
//         header: 'Action',
//         size: 150,
//         Cell: ({ cell }) => (
//           <Select
//             value={cell.row.original.status}
//             onChange={(e) =>
//               handleStatusChange(cell.row.original.order_id, e.target.value)
//             }
//             displayEmpty
//             fullWidth
//           >
//             {statuses.map((status) => (
//               <MenuItem key={status} value={status}>
//                 {status}
//               </MenuItem>
//             ))}
//           </Select>
//         ),
//       },
//     ],
//     [statuses]
//   );

//   // Set up the table with useMaterialReactTable
//   const table = useMaterialReactTable({
//     columns,
//     data: tableData,
//   });

//   return <AdminNavbar><MaterialReactTable table={table} /></AdminNavbar>;
// };

// export default ManageOrder;
import React, { useState, useMemo, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../Config';
import { toast } from 'react-toastify';
import moment from 'moment';
import { renderWelcomeEmail } from '../user-profile/renderEmail';
import { Button } from 'reactstrap';

// Sample data including status
const data = [
  {
    order_id: '123456',
    customer: {
      customer_id: '98765',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-234-567-8901',
      shipping_address: {
        address_line1: '123 Main St',
        address_line2: 'Apt 4B',
        city: 'Anytown',
        state: 'CA',
        postal_code: '12345',
        country: 'USA',
      },
    },
    items: [
      {
        item_id: '1001',
        name: 'Widget A',
        quantity: 2,
        price: 25.0,
        total: 50.0,
      },
      {
        item_id: '1002',
        name: 'Widget B',
        quantity: 1,
        price: 15.0,
        total: 15.0,
      },
    ],
    payment: {
      method: 'credit_card',
      transaction_id: 'abc123',
      amount: 65.0,
      currency: 'USD',
      status: 'shipped',
    },
    total: {
      subtotal: 65.0,
      shipping: 5.0,
      tax: 0.0,
      discount: 0.0,
      grand_total: 70.0,
    },
    status: 'shipped',
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T15:00:00Z',
  },
  {
    order_id: '123456',
    customer: {
      customer_id: '98765',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-234-567-8901',
      shipping_address: {
        address_line1: '123 Main St',
        address_line2: 'Apt 4B',
        city: 'Anytown',
        state: 'CA',
        postal_code: '12345',
        country: 'USA',
      },
    },
    items: [
      {
        item_id: '1001',
        name: 'Widget A',
        quantity: 2,
        price: 25.0,
        total: 50.0,
      },
      {
        item_id: '1002',
        name: 'Widget B',
        quantity: 1,
        price: 15.0,
        total: 15.0,
      },
    ],
    payment: {
      method: 'credit_card',
      transaction_id: 'abc123',
      amount: 65.0,
      currency: 'USD',
      status: 'shipped',
    },
    total: {
      subtotal: 65.0,
      shipping: 5.0,
      tax: 0.0,
      discount: 0.0,
      grand_total: 70.0,
    },
    status: 'delivered',
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T15:00:00Z',
  },
  {
    order_id: '123457',
    customer: {
      customer_id: '98766',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-234-567-8902',
      shipping_address: {
        address_line1: '456 Another St',
        address_line2: 'Suite 12',
        city: 'Othertown',
        state: 'NY',
        postal_code: '67890',
        country: 'USA',
      },
    },
    items: [
      {
        item_id: '1003',
        name: 'Gadget X',
        quantity: 1,
        price: 99.99,
        total: 99.99,
      },
    ],
    payment: {
      method: 'paypal',
      transaction_id: 'xyz789',
      amount: 104.99,
      currency: 'USD',
      status: 'paid',
    },
    total: {
      subtotal: 99.99,
      shipping: 5.0,
      tax: 0.0,
      discount: 0.0,
      grand_total: 104.99,
    },
    status: 'Pending',
    created_at: '2024-06-24T09:30:00Z',
    updated_at: '2024-06-24T11:00:00Z',
  },
];

const ManageOrder = () => {
  // Define the order statuses
  const statuses = ['processing', 'shipped', 'delivered', 'canceled', 'pending'];
  const paymentStatus = ['pending', 'paid', 'failed'];


  // Set up state for the table data
  const [tableData, setTableData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addressDetail, setAddressesDetail] = useState(null);

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [orders, setOrders] = useState([]);

  // Handle status change
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  const handleStatusChange = async (orderId,newStatus,order,paymentStatus) => {
    let emailHtml=null;
    if(newStatus || paymentStatus){
      emailHtml = renderWelcomeEmail(order,2,newStatus || paymentStatus);
      console.log("nmkmneor",emailHtml)
    }
    let data = {
      orderId,
      status : newStatus,
      emailHtml,
      payment : paymentStatus
    };
    try {
      const response = await fetch(`${BASE_URL}/payment/change-order-status`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      setLoader(!loader)
      if (response.ok) {
        const result = await response.json();
        toast.success("order status changed");
      } else {
        toast.error("Please logout and login again with valid credentials.");
        console.error('Failed to create review:', response.statusText);
      }
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
      console.error('Error:', error);
    }
  };

  const handleSubmitAdd = (id) => {
    if(!id) return;
    const apiUrl = `${BASE_URL}/users/editAddress`;
    let addressData = {id : id}

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData?.logedInUser?.accessToken
      },
      body: JSON.stringify({ ...addressData, userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("nwenifew",data?.data)
        setAddressesDetail(data?.data);
      })
      .catch(error => {
        console.error('Error adding/editing address:', error)
        toast.error("Please logout and login again with valid credentials.");
      });
  };


  useEffect(() => {
    fetch(`${BASE_URL}/admin/getOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("nkniknsf", data?.data);
        setTableData(data?.data);
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, [loader]);

  // Handle row click to show product details
  const handleRowClick = (order) => {
    console.log("koekjor",order)
    setSelectedOrder(order);
    handleSubmitAdd(order?.addressId?._id)
    setOpen(true);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  // Define columns with a custom cell for the status column
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'Order Id',
        // size: 150,
        // maxSize : 50 
      },
      {
        accessorKey: 'userId.fullname',
        header: 'Customer',
        
      },
      // {
      //   accessorKey: 'addressId.fullAdress',
      //   header: 'Address',
      //   
      // },
      {
        // accessorKey: 'amount',
        header: 'Total Amount',
        Cell: ({ cell }) => (
          // <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
          //   {cell.row.original.amount===50000?"Rs 500":"Rs 100"}
          // </span>
          <div>{cell.row.original?.amount?.toFixed(2)}
              </div>
        ),
      },
      {
        accessorKey: 'mode',
        header: 'Mode',    
      },
      {
        // accessorKey: 'payme',
        header: 'payment status',   
        Cell: ({ cell }) => (
          <Select
            value={cell.row.original.status}
            onClick={(e) => e.stopPropagation()} // Stop event propagation
            onChange={(e) => {
              handleStatusChange(cell.row.original._id, null,cell.row.original,e.target.value);
              e.stopPropagation(); // Stop event propagation
            }}
            displayEmpty
            renderValue={(value) => (value ? value : 'Change Status')}
            fullWidth
          >
           
            {paymentStatus.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        ), 
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        
        id: 'Date', // Added id
        Cell: ({ cell }) => (
          // <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
          //   {cell.row.original.amount===50000?"Rs 500":"Rs 100"}
          // </span>
          <div>{cell.row.original?.createdAt ? moment(cell.row.original?.createdAt).format("DD-MM-YYYY") : "-"}
              </div>
        ),
      },
      {
        accessorKey: 'deliveryStatus',
        header: 'Status',
        
        Cell: ({ cell }) => {
          const status = cell.row.original.deliveryStatus.toLowerCase();
          let backgroundColor;
          console.log("kmejij",status)
          switch (status) {
            case 'delivered':
              backgroundColor = 'green';
              break;
            case 'canceled':
              backgroundColor = 'red';
              break;
            case 'processing':
              backgroundColor = '#95489a';
              break;
            case 'pending':
              backgroundColor = 'yellow';
              break;
            case 'shipped':
              backgroundColor = 'orange';
              break;
            default:
              backgroundColor = 'white';
          }

          return (
            <div style={{ backgroundColor, padding: '5px', borderRadius: '4px',color : "#FFFFFF",fontWeight : "700" }}>
              {cell.row.original.deliveryStatus}
            </div>
          );
        },
      },
      {
        header: 'Action',
        
        Cell: ({ cell }) => (
          <Select
            value={cell.row.original.deliveryStatus}
            onClick={(e) => e.stopPropagation()} // Stop event propagation
            onChange={(e) => {
              handleStatusChange(cell.row.original._id, e.target.value,cell.row.original);
              e.stopPropagation(); // Stop event propagation
            }}
            displayEmpty
            renderValue={(value) => (value ? value : 'Change Status')}
            fullWidth
          >
           
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        ),
      },
      {
        header: 'Details',
        // 
        id: 'viewDetails', // Added id
        Cell: ({ cell }) => (
          <Button onClick={() => handleRowClick(cell.row.original)}>Details</Button>
        ),
      },
    ],
    [statuses]
  );

  // Set up the table with useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    // muiTableBodyRowProps: ({ row }) => ({
    //   onClick: () => handleRowClick(row.original),
    //   sx: { cursor: 'pointer' },
    // }),
  });

  return (
    <AdminNavbar>
      <div className='manager-order-tabel'>
      <MaterialReactTable table={table}        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Product Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {addressDetail && (
            <List>
              <ListItem key={addressDetail?._id}>
                <ListItemText
                  primary={`Name: ${addressDetail?.name} - Full Adress: ${addressDetail?.fullAdress} - Phone: $${addressDetail?.phone} - Pincode: ${addressDetail?.pin}- Email: ${addressDetail?.email}`}
                />
              </ListItem>
            </List>
          )}
          {selectedOrder && (
            <List>
              {selectedOrder?.products?.map((item) => (
                <ListItem key={item?.item?._id}>
                  <ListItemText
                    primary={`${item?.item?.name} - Quantity: ${
                      item?.quantity
                    } - Price: ${item?.item?.price} - Total: ${
                     ( parseFloat(item?.item?.price) -
                      parseFloat(item?.item?.discount || 0)) *
                        parseFloat(item?.quantity)
                    } `}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </AdminNavbar>
  );
};

export default ManageOrder;
