import { CreditCard, Users, Activity, BarChart3 } from "lucide-react";

export const defaultStats = [
  { title: "Total Revenue", value: "$0.00", description: "This month", icon: CreditCard, change: "+0%" },
  { title: "Active Users", value: "1", description: "This month", icon: Users, change: "+0%" },
  { title: "API Calls", value: "0", description: "This month", icon: Activity, change: "+0%" },
  { title: "Projects", value: "1", description: "Active", icon: BarChart3, change: "+0%" },
];
