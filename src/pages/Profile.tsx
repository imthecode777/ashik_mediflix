import { Edit, Calendar, FileText, Settings, Upload, User, Phone, Mail, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import userProfile from "@/assets/user-profile.jpg";

const personalInfo = {
  name: "Althaf Ikka",
  email: "njan.althafanee@gmail.com",
  phone: "+91 85898 21631",
  dateOfBirth: "January 15, 2006",
  gender: "Male",
  bloodType: "O+",
  address: "123 Main Street, Thettaparambu, Varkala, Kerala",
  emergencyContact: "Althaf Ikka - +91 85898 21631",
};

const medicalHistory = [
  {
    condition: "Hypertension",
    diagnosedDate: "2020-03-15",
    status: "Controlled",
    notes: "Regular monitoring required"
  },
  {
    condition: "Type 2 Diabetes",
    diagnosedDate: "2019-08-22",
    status: "Managed",
    notes: "Diet controlled, regular checkups"
  }
];

const recentAppointments = [
  {
    doctor: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    date: "2024-12-15",
    type: "Follow-up",
    status: "Completed",
  },
  {
    doctor: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    date: "2024-12-10",
    type: "Consultation",
    status: "Completed",
  },
  {
    doctor: "Dr. Elvis Vannam",
    specialty: "Orthopedic",
    date: "2024-11-28",
    type: "Treatment",
    status: "Completed",
  },
];

const uploadedReports = [
  {
    name: "Blood Test Results",
    type: "Lab Report",
    date: "2024-12-15",
    size: "2.4 MB"
  },
  {
    name: "X-Ray Chest",
    type: "Imaging",
    date: "2024-12-10",
    size: "5.1 MB"
  },
  {
    name: "ECG Report",
    type: "Diagnostic",
    date: "2024-11-28",
    size: "1.8 MB"
  }
];

export default function Profile() {
  return (
    <div className="px-4 py-6 space-y-8 max-w-7xl mx-auto min-h-full overflow-x-hidden">
      {/* Header */}
      <div className="text-center space-y-6 animate-slide-down">
        <div className="relative inline-block">
          <img
            src={userProfile}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 mx-auto shadow-medical hover-lift"
          />
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-0 right-0 rounded-full h-8 w-8 border-2 border-background"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
          <p className="text-muted-foreground">{personalInfo.email}</p>
        </div>
      </div>

      {/* Personal Information */}
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{personalInfo.dateOfBirth}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p className="mt-1">{personalInfo.gender}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Blood Type</label>
                <Badge variant="outline" className="mt-1">
                  {personalInfo.bloodType}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="flex items-start space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">{personalInfo.address}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                <p className="mt-1 text-sm">{personalInfo.emergencyContact}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Medical History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalHistory.map((condition, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 border-l-4 border-l-primary">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{condition.condition}</h4>
                    <p className="text-sm text-muted-foreground">
                      Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm mt-2">{condition.notes}</p>
                  </div>
                  <Badge 
                    variant={condition.status === "Controlled" ? "secondary" : "outline"}
                    className="ml-4"
                  >
                    {condition.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Appointments */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Recent Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-medium">{appointment.doctor}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString()} • {appointment.type}
                  </p>
                </div>
                <Badge variant="secondary">{appointment.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Reports */}
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <span>Medical Reports</span>
            </CardTitle>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            <Separator />
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}