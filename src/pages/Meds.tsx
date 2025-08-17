import { Pill, Clock, User, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

const appointedDoctors = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image: doctor1,
    prescriptions: [
      {
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with food in the morning"
      },
      {
        medication: "Metoprolol",
        dosage: "25mg",
        frequency: "Twice daily",
        duration: "60 days",
        instructions: "Take with or without food"
      }
    ],
    lastVisit: "Dec 15, 2024"
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrician",
    image: doctor2,
    prescriptions: [
      {
        medication: "Amoxicillin",
        dosage: "250mg",
        frequency: "Three times daily",
        duration: "7 days",
        instructions: "Complete full course even if feeling better"
      }
    ],
    lastVisit: "Dec 10, 2024"
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Orthopedic Surgeon",
    image: doctor3,
    prescriptions: [
      {
        medication: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        duration: "14 days",
        instructions: "Take with food to avoid stomach upset"
      },
      {
        medication: "Physical Therapy",
        dosage: "N/A",
        frequency: "3 times/week",
        duration: "6 weeks",
        instructions: "Follow prescribed exercises"
      }
    ],
    lastVisit: "Nov 28, 2024"
  }
];

export default function Meds() {
  const [expandedDoctors, setExpandedDoctors] = useState<number[]>([]);

  const toggleDoctor = (doctorId: number) => {
    setExpandedDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const isExpanded = (doctorId: number) => expandedDoctors.includes(doctorId);

  return (
    <div className="px-4 py-6 space-y-8 max-w-7xl mx-auto min-h-full overflow-x-hidden">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-foreground">💊 Medications</h1>
        <p className="text-muted-foreground text-lg">Manage your prescriptions and medications</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-medical">
          <CardContent className="p-6 text-center">
            <Pill className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-lg">5</h3>
            <p className="text-sm text-muted-foreground">Active Prescriptions</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medical">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold text-lg">2</h3>
            <p className="text-sm text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medical">
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-success mx-auto mb-2" />
            <h3 className="font-semibold text-lg">3</h3>
            <p className="text-sm text-muted-foreground">Prescribing Doctors</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointed Doctors */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Doctors & Prescriptions</h2>
        
        <div className="space-y-4">
          {appointedDoctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-medical hover:shadow-medical-lg transition-all">
              <Collapsible open={isExpanded(doctor.id)} onOpenChange={() => toggleDoctor(doctor.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <p className="text-muted-foreground">{doctor.specialty}</p>
                          <p className="text-sm text-muted-foreground">Last visit: {doctor.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">
                          {doctor.prescriptions.length} prescription{doctor.prescriptions.length !== 1 ? 's' : ''}
                        </Badge>
                        {isExpanded(doctor.id) ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <h4 className="font-medium text-primary">Current Prescriptions:</h4>
                      
                      {doctor.prescriptions.map((prescription, index) => (
                        <Card key={index} className="bg-muted/30 border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-semibold text-lg text-foreground">
                                  {prescription.medication}
                                </h5>
                                <div className="space-y-1 mt-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Dosage:</span>
                                    <span className="text-sm font-medium">{prescription.dosage}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Frequency:</span>
                                    <span className="text-sm font-medium">{prescription.frequency}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Duration:</span>
                                    <span className="text-sm font-medium">{prescription.duration}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h6 className="font-medium mb-2">Instructions:</h6>
                                <p className="text-sm text-muted-foreground bg-background p-3 rounded-lg">
                                  {prescription.instructions}
                                </p>
                                <div className="flex space-x-2 mt-3">
                                  <Button size="sm" variant="outline" className="flex-1">
                                    Set Reminder
                                  </Button>
                                  <Button size="sm" className="flex-1">
                                    Refill
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm">
                          Contact Doctor
                        </Button>
                        <Button variant="outline" size="sm">
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Notice */}
      <Card className="border-warning bg-warning/5 shadow-medical">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
            <div>
              <h3 className="font-semibold text-warning">Important Medication Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Always consult with your healthcare provider before stopping or changing any medication. 
                In case of severe side effects or allergic reactions, seek immediate medical attention.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}