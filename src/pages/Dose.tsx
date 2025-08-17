import { useState } from "react";
import { CircleDot, Clock, Plus, Bell, Calendar, Check, AlertTriangle, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    timeSlots: ["08:00"],
    taken: [true],
    nextDose: "08:00 AM",
    pillsLeft: 28,
    refillDate: "2025-01-15",
    color: "blue"
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    timeSlots: ["08:00", "20:00"],
    taken: [true, false],
    nextDose: "08:00 PM",
    pillsLeft: 45,
    refillDate: "2025-01-20",
    color: "green"
  },
  {
    id: 3,
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    timeSlots: ["09:00"],
    taken: [false],
    nextDose: "09:00 AM",
    pillsLeft: 12,
    refillDate: "2024-12-25",
    color: "yellow"
  }
];

const todaySchedule = [
  { time: "08:00", medication: "Lisinopril 10mg", taken: true },
  { time: "08:00", medication: "Metformin 500mg", taken: true },
  { time: "09:00", medication: "Vitamin D3 1000 IU", taken: false },
  { time: "20:00", medication: "Metformin 500mg", taken: false }
];

export default function Dose() {
  const [notifications, setNotifications] = useState(true);
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    times: [""]
  });

  const getTakenToday = () => {
    return todaySchedule.filter(item => item.taken).length;
  };

  const getCompletionPercentage = () => {
    return Math.round((getTakenToday() / todaySchedule.length) * 100);
  };

  const markAsTaken = (scheduleIndex: number) => {
    // This would update the medication status
    console.log(`Marking medication at index ${scheduleIndex} as taken`);
  };

  const getColorClass = (color: string) => {
    const colorMap = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      purple: "bg-purple-500"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-500";
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto min-h-full bg-gradient-card">
      {/* Header */}
      <div className="text-center space-y-2 animate-slide-down">
        <div className="flex items-center justify-center space-x-2">
          <CircleDot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Dose</h1>
        </div>
        <p className="text-muted-foreground">Track your medications and stay healthy</p>
      </div>

      {/* Today's Progress */}
      <Card className="shadow-medical hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Progress</span>
            <Badge variant="secondary">{getTakenToday()}/{todaySchedule.length} doses</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completion</span>
              <span className="font-bold text-lg text-primary">{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">✓ {getTakenToday()} taken</span>
              <span className="text-warning">⏰ {todaySchedule.length - getTakenToday()} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-medical hover-lift">
          <CardContent className="p-6 text-center">
            <Pill className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-lg">{medications.length}</h3>
            <p className="text-sm text-muted-foreground">Active Medications</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medical hover-lift">
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold text-lg">{todaySchedule.length - getTakenToday()}</h3>
            <p className="text-sm text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medical hover-lift">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <h3 className="font-semibold text-lg">1</h3>
            <p className="text-sm text-muted-foreground">Needs Refill</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Today's Schedule
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="notifications" className="text-sm">Notifications</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  item.taken 
                    ? "bg-success/10 border-success/30" 
                    : "bg-card hover:bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${item.taken ? "bg-success" : "bg-warning"}`} />
                  <div>
                    <p className="font-medium">{item.time}</p>
                    <p className="text-sm text-muted-foreground">{item.medication}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.taken ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      <Check className="h-3 w-3 mr-1" />
                      Taken
                    </Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => markAsTaken(index)}
                      className="hover-glow"
                    >
                      Mark as Taken
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Medications */}
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Medications</CardTitle>
            <Dialog open={isAddingMed} onOpenChange={setIsAddingMed}>
              <DialogTrigger asChild>
                <Button className="hover-glow">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medName">Medication Name</Label>
                    <Input
                      id="medName"
                      placeholder="e.g. Lisinopril"
                      value={newMed.name}
                      onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      placeholder="e.g. 10mg"
                      value={newMed.dosage}
                      onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={newMed.frequency} onValueChange={(value) => setNewMed({...newMed, frequency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once daily</SelectItem>
                        <SelectItem value="twice">Twice daily</SelectItem>
                        <SelectItem value="three">Three times daily</SelectItem>
                        <SelectItem value="four">Four times daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={() => setIsAddingMed(false)}>
                    Add Medication
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medications.map((med) => (
              <Card key={med.id} className="border-l-4 border-l-primary hover-lift">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{med.name}</h4>
                        <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getColorClass(med.color)}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Next dose:</span>
                        <span className="font-medium">{med.nextDose}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pills left:</span>
                        <span className={`font-medium ${med.pillsLeft < 15 ? 'text-destructive' : 'text-foreground'}`}>
                          {med.pillsLeft}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Refill by:</span>
                        <span className="font-medium">{med.refillDate}</span>
                      </div>
                    </div>

                    {med.pillsLeft < 15 && (
                      <Badge variant="destructive" className="w-full justify-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Refill Soon
                      </Badge>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Refill
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Reminder */}
      <Card className="border-primary/20 bg-primary/5 shadow-medical">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div>
              <h3 className="font-semibold text-primary">Medication Reminder</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Take your medications as prescribed by your healthcare provider. 
                Never stop or change your medication without consulting your doctor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}