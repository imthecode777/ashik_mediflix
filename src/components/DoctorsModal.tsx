import { useState } from "react";
import { Search, X, Star, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import doctor5 from "@/assets/doctor-5.jpg";
import doctor6 from "@/assets/doctor-6.jpg";

const allDoctors = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    rating: 4.9,
    image: doctor1,
    experience: "15+ years",
    patients: "2.5k+",
    fees: "$150",
    location: "Heart Care Center"
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrician",
    rating: 4.8,
    image: doctor2,
    experience: "12+ years",
    patients: "1.8k+",
    fees: "$120",
    location: "Children's Medical Center"
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    image: doctor3,
    experience: "18+ years",
    patients: "3.2k+",
    fees: "$200",
    location: "Orthopedic Specialty Hospital"
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.7,
    image: doctor4,
    experience: "10+ years",
    patients: "1.5k+",
    fees: "$130",
    location: "Skin Care Institute"
  },
  {
    id: 5,
    name: "Dr. David Kim",
    specialty: "Neurologist",
    rating: 4.8,
    image: doctor5,
    experience: "14+ years",
    patients: "2.1k+",
    fees: "$180",
    location: "Brain & Spine Center"
  },
  {
    id: 6,
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatrist",
    rating: 4.9,
    image: doctor6,
    experience: "16+ years",
    patients: "1.9k+",
    fees: "$160",
    location: "Mental Health Clinic"
  },
];

interface DoctorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorsModal({ isOpen, onClose }: DoctorsModalProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDoctors = allDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorClick = (doctorId: number) => {
    onClose();
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">All Doctors</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className="hover:shadow-medical-lg transition-all cursor-pointer group"
                onClick={() => handleDoctorClick(doctor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {doctor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-1">{doctor.location}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">{doctor.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {doctor.experience}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {doctor.fees}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {doctor.patients} patients
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your search.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}