import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Package, Users, MoreVertical, IndianRupee } from "lucide-react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF1919",
];

// Format date (e.g., "17 May 2025")
function formatDateArrowStyle(isoString) {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "N/A";
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Month-Year string (e.g., "May 2025")
const getMonthYear = date =>
  date.toLocaleString("default", { month: "short", year: "numeric" });

// ISO week number helper
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// Get Monday-Sunday range for a given year and week number
function getWeekStartEndDates(year, weekNum) {
  const simple = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const dayOfWeek = simple.getDay();
  const monday = new Date(simple);
  monday.setDate(simple.getDate() - ((dayOfWeek + 6) % 7));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const options = { day: "numeric", month: "short" };
  const mondayStr = monday.toLocaleDateString("en-US", options);
  const sundayStr = sunday.toLocaleDateString("en-US", options);

  return `${mondayStr} - ${sundayStr}`;
}

// Helper to check if a date is today
const isToday = date => {
  const today = new Date();
  const inputDate = new Date(date);
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
};

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{label}</p>
        {payload.map(entry => (
          <p key={entry.name}>
            {entry.name === "Sales (Rs.)"
              ? `Rs. ${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/*
// TypeScript Types (uncomment if using TypeScript)
interface Patient {
  _id: string;
  fullname?: string;
  profileImage?: string;
  lastLogin?: string;
  createdAt?: string;
}
 
interface Order {
  _id: string;
  createdAt: string;
  totalAmount?: number;
  status?: string;
  products?: Array<{
    item?: { name?: string };
    quantity?: number;
  }>;
  hairTest?: boolean;
}
*/

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allorders, setAllorders] = useState([]);
  const token = localStorage.getItem("token");

  // Aggregate monthly orders & sales
  const aggregateMonthlyOrders = orders => {
    const monthlyData = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      if (isNaN(date.getTime())) return;
      const monthYear = getMonthYear(date);
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { orders: 0, sales: 0 };
      }
      monthlyData[monthYear].orders += 1;
      monthlyData[monthYear].sales += Number(order.totalAmount || 0);
    });
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        orders: data.orders,
        sales: data.sales,
      }))
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split(" ");
        const [monthB, yearB] = b.month.split(" ");
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
      })
      .slice(-5); // Get last 5 months
  };

  // Aggregate weekly orders & sales
  const aggregateWeeklyOrders = orders => {
    const weeklyData = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      if (isNaN(date.getTime())) return;
      const year = date.getFullYear();
      const week = getWeekNumber(date);
      const key = `${year}-W${week}`;
      if (!weeklyData[key]) {
        weeklyData[key] = { orders: 0, sales: 0, year, week };
      }
      weeklyData[key].orders += 1;
      weeklyData[key].sales += Number(order.totalAmount || 0);
    });
    return Object.values(weeklyData)
      .map(({ year, week, orders, sales }) => ({
        week: getWeekStartEndDates(year, week),
        orders,
        sales,
      }))
      .sort((a, b) => {
        const [startA] = a.week.split(" - ");
        const [startB] = b.week.split(" - ");
        return new Date(startA) - new Date(startB);
      });
  };

  // Aggregate top 5 sold products
  const aggregateTopProducts = orders => {
    const productMap = {};
    orders.forEach(order => {
      if (order.products && Array.isArray(order.products)) {
        order.products.forEach(p => {
          const name = p?.item?.name ?? "Unknown";
          const qty = Number(p?.quantity ?? 0);
          if (!productMap[name]) productMap[name] = 0;
          productMap[name] += qty;
        });
      }
    });
    return Object.entries(productMap)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  // Memoized data
  const monthlyOrders = useMemo(
    () => aggregateMonthlyOrders(allorders),
    [allorders]
  );
  const weeklyOrders = useMemo(
    () => aggregateWeeklyOrders(allorders),
    [allorders]
  );
  const topProducts = useMemo(
    () => aggregateTopProducts(allorders),
    [allorders]
  );

  // Compute stats for StatCard
  const todayOrders = allorders.filter(order => isToday(order.createdAt));
  const todayHairTestOrders = todayOrders.filter(order => order.hairTest);
  const todayEcommerceOrders = todayOrders.filter(order => !order.hairTest);
  const totalSales = todayOrders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );
  const todayHairTests = patients.filter(patient =>
    isToday(patient.lastHairTest || patient.createdAt)
  ).length;

  // Fetch data
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!token) {
        if (isMounted) {
          setError("Authentication token missing. Please log in.");
          setLoading(false);
        }
        return;
      }

      if (isMounted) {
        setLoading(true);
        setError("");
      }
      try {
        const [patientsRes, ordersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/allpatient`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/getOrders`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!patientsRes.ok)
          throw new Error(`Patients API error! status: ${patientsRes.status}`);
        if (!ordersRes.ok)
          throw new Error(`Orders API error! status: ${ordersRes.status}`);

        const [patientsData, ordersData] = await Promise.all([
          patientsRes.json(),
          ordersRes.json(),
        ]);

        if (isMounted) {
          const patients = patientsData?.data ?? [];
          const orders = ordersData?.data ?? [];
          setPatients(patients);
          setAllorders(orders);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load data");
          setPatients([]);
          setAllorders([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Order status counts
  const orderStatusCounts = allorders.reduce((acc, order) => {
    const status = (order.status || "Pending").trim().toLowerCase();
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          className="bg-white"
          title="Today's Hair Tests"
          value={todayHairTests.toLocaleString()}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatCard
          className="bg-white"
          title="Today's Orders with Hair Test"
          value={todayHairTestOrders.length.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          className="bg-white"
          title="Today's Orders Without Hair Test (Ecommerce)"
          value={todayEcommerceOrders.length.toLocaleString()}
          icon={<Package className="h-6 w-6" />}
        />
        <StatCard
          className="bg-white"
          title="Total Sales"
          value={`₹ ${totalSales.toLocaleString()}`}
          icon={<IndianRupee className="h-6 w-6" />}
        />
      </div>

      {/* Monthly and Weekly Orders & Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Monthly Orders & Sales</CardTitle>
            <CardDescription>Last 5 months of activity</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {monthlyOrders.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No monthly order data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyOrders}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tick={{ fontSize: 12 }}
                    tickFormatter={value => value.toLocaleString()}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickFormatter={value => `Rs. ${value.toLocaleString()}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border">
                            <p className="font-semibold text-gray-800">
                              {label}
                            </p>
                            <p className="text-sm text-gray-600">
                              Orders: {payload[0].value.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Sales: Rs. {payload[1].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="orders"
                    fill="#1E40AF"
                    name="Orders"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="sales"
                    fill="#3B82F6"
                    name="Sales (Rs.)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* <Card className="bg-white">
          <CardHeader>
            <CardTitle>Weekly Orders & Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {weeklyOrders.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No weekly order data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyOrders}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="orders" fill="#1E40AF" name="Orders" />
                  <Bar dataKey="sales" fill="#3B82F6" name="Sales (Rs.)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card> */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Top 5 Sold Products</CardTitle>
            <CardDescription>By quantity sold</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {topProducts.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No product sales data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <PieChart margin={{ top: 20, right: 80, left: 20, bottom: 20 }}>
                  <Pie
                    data={topProducts}
                    cx="40%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="quantity"
                    label={({ name, percent }) => {
                      const formattedName =
                        name.length > 15 ? `${name.substring(0, 15)}...` : name;
                      return `${formattedName} (${(percent * 100).toFixed(0)}%)`;
                    }}
                  >
                    {topProducts.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border">
                            <p className="font-semibold text-gray-800">
                              {payload[0].name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {payload[0].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={value => {
                      return value.length > 15
                        ? `${value.substring(0, 15)}...`
                        : value;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader className="border-b border-border">
            <CardTitle>Order Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <div className="p-4 space-y-3">
              {["Pending", "Processed", "Shipped", "Delivered"].map(status => (
                <div key={status} className="flex justify-between items-center">
                  <span className="font-bold text-md">{status} Orders</span>
                  <span className="font-bold text-md">
                    {orderStatusCounts[status] ?? 0}
                  </span>
                </div>
              ))}
             
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card className="bg-white">
          <CardHeader className="border-b border-border">
            <CardTitle>Users Login</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="p-4 text-center text-gray-500">
                Loading patients...
              </div>
            )}
            {error && (
              <div className="p-4 text-center text-red-600">{error}</div>
            )}
            {!loading && !error && patients.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No patients found.
              </div>
            )}
            {!loading && !error && patients.length > 0 && (
              <div className="divide-y divide-border h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {patients
                  .slice()
                  .sort((a, b) => {
                    const dateA = new Date(a.lastLogin || a.createdAt || 0);
                    const dateB = new Date(b.lastLogin || b.createdAt || 0);
                    return dateB - dateA;
                  })
                  .map(user => (
                    <div
                      key={user._id}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      role="listitem"
                    >
                      <img
                        src={
                          user.profileImage ||
                          "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
                        }
                        alt={`Profile picture of ${
                          user.fullname || "Unknown User"
                        }`}
                        className="h-10 w-10 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-black leading-tight">
                          {user.fullname || "Unknown User"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last login: {formatDateArrowStyle(user.lastLogin)}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`More options for ${
                          user.fullname || "Unknown User"
                        }`}
                        className="ml-auto text-muted-foreground hover:text-black"
                        onClick={() =>
                          console.log(`More options for ${user._id}`)
                        }
                      >
                       
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
