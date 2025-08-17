import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

const allDoctors = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image: doctor1,
    rating: 4.9,
    reviews: 127,
    experience: "15+ years",
    location: "New York Medical Center",
    consultationFee: 150,
    category: "Heart & Vascular"
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrician",
    image: doctor2,
    rating: 4.8,
    reviews: 89,
    experience: "12+ years",
    location: "Children's Medical Center",
    consultationFee: 120,
    category: "Pediatrics"
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Orthopedic Surgeon",
    image: doctor3,
    rating: 4.7,
    reviews: 156,
    experience: "18+ years",
    location: "Orthopedic Institute",
    consultationFee: 200,
    category: "Orthopedics"
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    specialty: "Dermatologist",
    image: doctor1,
    rating: 4.9,
    reviews: 98,
    experience: "10+ years",
    location: "Skin Care Clinic",
    consultationFee: 130,
    category: "Dermatology"
  },
  {
    id: 5,
    name: "Dr. Robert Martinez",
    specialty: "Neurologist",
    image: doctor2,
    rating: 4.6,
    reviews: 112,
    experience: "20+ years",
    location: "Neurology Center",
    consultationFee: 180,
    category: "Neurology"
  },
  {
    id: 6,
    name: "Dr. Lisa Anderson",
    specialty: "Psychiatrist",
    image: doctor3,
    rating: 4.8,
    reviews: 76,
    experience: "14+ years",
    location: "Mental Health Clinic",
    consultationFee: 160,
    category: "Mental Health"
  }
];

const categories = [
  "All Specialties",
  "Heart & Vascular",
  "Pediatrics", 
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Mental Health",
  "General Medicine",
  "Women's Health"
];

export default function AllDoctors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Specialties");
  const [sortBy, setSortBy] = useState("rating");

  const filteredDoctors = allDoctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Specialties" || doctor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "fee-low":
          return a.consultationFee - b.consultationFee;
        case "fee-high":
          return b.consultationFee - a.consultationFee;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">All Doctors</h1>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-medical">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fee-low">Price: Low to High</SelectItem>
                  <SelectItem value="fee-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <p className="text-muted-foreground">
          Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card 
              key={doctor.id} 
              className="shadow-medical hover:shadow-medical-lg transition-all cursor-pointer hover-lift"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground text-sm">({doctor.reviews})</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{doctor.experience}</Badge>
                      <span className="font-semibold text-primary">${doctor.consultationFee}</span>
                    </div>
                  </div>

                  <Button className="w-full">Book Appointment</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No doctors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}