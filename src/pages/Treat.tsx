import { useState } from "react";
import { Calendar, Upload, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DocumentUpload from "@/components/DocumentUpload";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Consultation",
    image: doctor1,
  },
  {
    id: 2,
    doctor: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    date: "Dec 28",
    time: "2:30 PM",
    type: "Follow-up",
    image: doctor2,
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: "15+ years",
    patients: "2.5k+",
    image: doctor1,
    bio: "Dr. Kunjunni is a renowned cardiologist with over 15 years of experience in cardiovascular medicine. He specializes in preventive cardiology and interventional procedures.",
  },
  {
    id: 2,
    name: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    rating: 4.8,
    experience: "12+ years",
    patients: "1.8k+",
    image: doctor2,
    bio: "Dr. Impotent is a dedicated pediatrician who provides comprehensive healthcare for children from birth through adolescence. She specializes in developmental pediatrics.",
  },
  {
    id: 3,
    name: "Dr. Elvis Vannam",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    experience: "18+ years",
    patients: "3.2k+",
    image: doctor3,
    bio: "Dr. Vannam is an expert orthopedic surgeon specializing in sports medicine and joint replacement surgeries. He has extensive experience in minimally invasive procedures.",
  },
];

const medicalReports = [
  { name: "Blood Test Results", date: "Dec 15, 2024", type: "Lab Report" },
  { name: "X-Ray Chest", date: "Dec 10, 2024", type: "Imaging" },
  { name: "ECG Report", date: "Nov 28, 2024", type: "Diagnostic" },
];

export default function Treat() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="px-4 py-6 space-y-8 max-w-7xl mx-auto min-h-full overflow-x-hidden">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-foreground">Treatment Center</h1>
        <p className="text-muted-foreground text-lg">Manage your appointments and medical records</p>
      </div>

      {/* Upload Records Section */}
      <Card className="shadow-medical-lg border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover-lift animate-bounce-subtle">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-xl mb-3">Upload Medical Records</h3>
          <p className="text-muted-foreground mb-6 text-base">
            Keep your medical history organized and accessible
          </p>
          <Button 
            className="shadow-bounce hover-glow px-8 py-3"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Records
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-medical hover:shadow-medical-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={appointment.image}
                      alt={appointment.doctor}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-1 text-primary" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-1 text-primary" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">{appointment.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      Join Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-medical">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No Upcoming Appointments</h3>
              <p className="text-muted-foreground">Schedule an appointment with your preferred doctor</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Medical Reports */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Medical Reports</h2>
        <div className="grid gap-3">
          {medicalReports.map((report, index) => (
            <Card key={index} className="shadow-medical hover:shadow-medical-lg transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Doctors */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-medical-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h4 className="font-semibold text-lg">{doctor.name}</h4>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mt-3 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doctor.experience}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {doctor.bio}
                  </p>
                  
                  <Button className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DocumentUpload 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}