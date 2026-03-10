import {LayoutDashboard,Megaphone,HeartHandshake,Users,Bell,FileCheck,BarChart3,User,CreditCard,UserPlus, ArrowLeftRight} from "lucide-react";

export const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },

  { label: "Manage Campaigns", icon: Megaphone, path: "/admin/campaigns" },

  { label: "Campaign Requests", icon: FileCheck, path: "/admin/campaign/requests" },

  { label: "Donations", icon: HeartHandshake, path: "/admin/donations" },

 { label: "Users", icon: Users, path: "/admin/users" },

  { label: "Create Users", icon: UserPlus, path: "/admin/create/users" },

  { label: "RazorPay Settings", icon: CreditCard, path: "/admin/razorpay" },

  { label: "Transactions", icon: ArrowLeftRight, path: "/admin/transactions" },


  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },

  { label: "Notifications", icon: Bell, path: "/admin/notifications" },

  { label: "Profile", icon: User, path: "/admin/profile" },
  
];