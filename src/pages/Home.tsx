import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Star, Calendar, MapPin, ChevronRight, GraduationCap, Users, DollarSign, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import CategoriesModal from "@/components/CategoriesModal";
import medicalBannerNew from "@/assets/medical-hero.jpg";
import userProfile from "@/assets/user-profile.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

const categories = [
  { name: "Cardiology", icon: "❤️", color: "bg-red-100 text-red-700" },
  { name: "Dentistry", icon: "🦷", color: "bg-blue-100 text-blue-700" },
  { name: "Orthopedics", icon: "🦴", color: "bg-green-100 text-green-700" },
  { name: "Pediatrics", icon: "👶", color: "bg-purple-100 text-purple-700" },
  { name: "Neurology", icon: "🧠", color: "bg-pink-100 text-pink-700" },
  { name: "Dermatology", icon: "✨", color: "bg-yellow-100 text-yellow-700" },
  { name: "Psychiatry", icon: "🧘", color: "bg-indigo-100 text-indigo-700" },
  { name: "Ophthalmology", icon: "👁️", color: "bg-teal-100 text-teal-700" },
  { name: "ENT", icon: "👂", color: "bg-orange-100 text-orange-700" },
  { name: "Gynecology", icon: "🌸", color: "bg-rose-100 text-rose-700" },
  { name: "Urology", icon: "🔬", color: "bg-cyan-100 text-cyan-700" },
  { name: "Gastroenterology", icon: "🫁", color: "bg-lime-100 text-lime-700" },
  { name: "Endocrinology", icon: "⚡", color: "bg-amber-100 text-amber-700" },
  { name: "Radiology", icon: "📷", color: "bg-violet-100 text-violet-700" },
  { name: "General Medicine", icon: "🩺", color: "bg-emerald-100 text-emerald-700" },
  { name: "Emergency", icon: "🚨", color: "bg-red-200 text-red-800" },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    rating: 4.9,
    image: doctor1,
    experience: "15+ years",
    patients: "2.5k+",
    education: "MD from Harvard Medical School",
    about: "Dr. Wilson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed over 3,000 cardiac procedures.",
    location: "Heart Care Center, Downtown",
    languages: ["English", "Spanish"],
    fees: "$150"
  },
  {
    id: 2,
    name: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    rating: 4.8,
    image: doctor2,
    experience: "12+ years",
    patients: "1.8k+",
    education: "MD from Johns Hopkins University",
    about: "Dr. Chen is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. She has a special interest in developmental pediatrics.",
    location: "Children's Medical Center",
    languages: ["English", "Mandarin"],
    fees: "$120"
  },
  {
    id: 3,
    name: "Dr. Elvis Vannam",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    image: doctor3,
    experience: "18+ years",
    patients: "3.2k+",
    education: "MD from Mayo Clinic",
    about: "Dr. Brown is a renowned orthopedic surgeon specializing in joint replacement and sports medicine. He has helped numerous athletes return to their peak performance.",
    location: "Orthopedic Specialty Hospital",
    languages: ["English", "French"],
    fees: "$200"
  },
];

const timeSlots = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
  afternoon: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  evening: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"]
};

export default function Home() {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const notifications = [
    { title: "Appointment Reminder", message: "Your appointment with Dr. Wilson is tomorrow at 10:00 AM", time: "2 hours ago" },
    { title: "Test Results", message: "Your blood test results are now available", time: "5 hours ago" },
    { title: "Health Tip", message: "Remember to take your daily vitamins", time: "1 day ago" },
  ];

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

    return (
      <div className="px-4 py-6 space-y-8 max-w-7xl mx-auto min-h-full overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-down">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userProfile}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover border-3 border-primary/20 shadow-medical hover-lift"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background animate-pulse-slow"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Hi, Plucky! 👋</h1>
              <p className="text-sm text-muted-foreground">How are you feeling today?</p>
            </div>
          </div>
        
        {/* Mobile Notification - Only visible on small screens */}
        <div className="md:hidden">
          <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="animate-slide-down-smooth">
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
                <DialogDescription>
                  View your recent medical notifications and updates
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 space-y-1 animate-fade-in-up hover:bg-muted/70 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        </div>

        {/* Search Bar */}
        <div className="relative animate-slide-up">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search doctors, treatments, or services..."
            className="pl-12 h-14 shadow-medical rounded-2xl border-0 bg-muted/50 focus:bg-background transition-all"
          />
        </div>

      {/* Banner */}
      <Card className="bg-gradient-card shadow-medical-lg overflow-hidden relative">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row min-h-[200px] lg:min-h-[240px]">
            {/* Content */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                Your Health, Our Priority
              </h2>
              <p className="text-muted-foreground mb-6 text-base lg:text-lg">
                Connect with certified healthcare professionals anytime, anywhere
              </p>
              <Button variant="default" className="shadow-bounce w-fit">
                Book Consultation
              </Button>
            </div>
            
            {/* Image */}
            <div className="flex-1 relative min-h-[200px] lg:min-h-auto">
              <img
                src={medicalBannerNew}
                alt="Medical care"
                className="absolute inset-0 w-full h-full object-cover lg:rounded-r-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-background/40 to-transparent lg:rounded-r-lg"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Find Your Doctor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Find Your Doctor</h3>
          <Button 
            variant="ghost" 
            className="text-primary hover:bg-primary/10 focus-ring animate-button-press"
            onClick={() => setIsCategoriesModalOpen(true)}
          >
            View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
            <Card key={category.name} className="hover:shadow-bounce transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h4 className="font-medium">{category.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Doctors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Popular Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-medical-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/doctor/${doctor.id}`)}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {doctor.experience}
                      </Badge>
                    </div>
                    <Button size="sm" className="mt-3 w-full" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/doctor/${doctor.id}`);
                    }}>
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CategoriesModal 
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
      />

    </div>
  );
}