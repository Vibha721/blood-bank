import React, { useState, useEffect } from "react";
import { Donor, BloodInventory, BloodRequest, DonationDrive } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Users, 
  Package, 
  FileText, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Droplet,
  Activity,
  Plus,
  Clock
} from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import BloodTypeChart from "../components/dashboard/BloodTypeChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import UrgentRequests from "../components/dashboard/UrgentRequests";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    totalUnits: 0,
    pendingRequests: 0,
    upcomingDrives: 0,
    criticalRequests: 0
  });
  const [bloodTypes, setBloodTypes] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [donors, inventory, requests, drives] = await Promise.all([
        Donor.list(),
        BloodInventory.list(),
        BloodRequest.list("-created_date"),
        DonationDrive.list("date")
      ]);

      // Calculate stats
      const activeDonors = donors.filter(d => d.status === 'active').length;
      const totalUnits = inventory.reduce((sum, item) => sum + item.units_available, 0);
      const pendingRequests = requests.filter(r => r.status === 'pending').length;
      const criticalRequests = requests.filter(r => r.urgency_level === 'critical').length;
      const upcomingDrives = drives.filter(d => 
        d.status === 'scheduled' && new Date(d.date) >= new Date()
      ).length;

      setStats({
        totalDonors: donors.length,
        activeDonors,
        totalUnits,
        pendingRequests,
        upcomingDrives,
        criticalRequests
      });

      // Blood type distribution
      const bloodTypeStats = {};
      inventory.forEach(item => {
        if (!bloodTypeStats[item.blood_type]) {
          bloodTypeStats[item.blood_type] = 0;
        }
        bloodTypeStats[item.blood_type] += item.units_available;
      });
      
      setBloodTypes(Object.entries(bloodTypeStats).map(([type, units]) => ({
        type,
        units,
        percentage: totalUnits > 0 ? (units / totalUnits * 100).toFixed(1) : 0
      })));

      // Recent requests (last 10)
      setRecentRequests(requests.slice(0, 10));

      // Upcoming drives (next 5)
      const upcoming = drives.filter(d => 
        d.status === 'scheduled' && new Date(d.date) >= new Date()
      ).slice(0, 5);
      setUpcomingDrives(upcoming);

      // Low stock alerts (less than 5 units)
      const lowStock = Object.entries(bloodTypeStats)
        .filter(([type, units]) => units < 5)
        .map(([type, units]) => ({ type, units }));
      setLowStockAlerts(lowStock);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Bank Dashboard</h1>
            <p className="text-gray-600">Monitor inventory, manage donations, and track requests</p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("Donors")}>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Donor
              </Button>
            </Link>
          </div>
        </div>

        {/* Critical Alerts */}
        {(lowStockAlerts.length > 0 || stats.criticalRequests > 0) && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockAlerts.map(alert => (
                  <div key={alert.type} className="flex items-center justify-between text-red-700">
                    <span>Low stock alert: {alert.type}</span>
                    <Badge variant="destructive">{alert.units} units left</Badge>
                  </div>
                ))}
                {stats.criticalRequests > 0 && (
                  <div className="flex items-center justify-between text-red-700">
                    <span>Critical blood requests pending</span>
                    <Badge variant="destructive">{stats.criticalRequests} critical</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Donors"
            value={stats.totalDonors}
            change={`${stats.activeDonors} active`}
            icon={Users}
            color="blue"
            isLoading={isLoading}
          />
          <StatsCard
            title="Blood Units"
            value={stats.totalUnits}
            change="Available in inventory"
            icon={Package}
            color="green"
            isLoading={isLoading}
          />
          <StatsCard
            title="Pending Requests"
            value={stats.pendingRequests}
            change={`${stats.criticalRequests} critical`}
            icon={FileText}
            color="orange"
            isLoading={isLoading}
          />
          <StatsCard
            title="Upcoming Drives"
            value={stats.upcomingDrives}
            change="This month"
            icon={Calendar}
            color="purple"
            isLoading={isLoading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BloodTypeChart bloodTypes={bloodTypes} isLoading={isLoading} />
            <RecentActivity requests={recentRequests} isLoading={isLoading} />
          </div>
          
          <div className="space-y-6">
            <UrgentRequests requests={recentRequests.filter(r => 
              r.urgency_level === 'critical' || r.urgency_level === 'high'
            )} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Upcoming Drives
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingDrives.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingDrives.map(drive => (
                      <div key={drive.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{drive.drive_name}</p>
                          <p className="text-sm text-gray-500">{drive.location}</p>
                        </div>
                        <Badge variant="outline">
                          {new Date(drive.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming drives scheduled</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}