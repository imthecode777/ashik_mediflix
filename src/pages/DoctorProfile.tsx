import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Star, Calendar, Clock, MapPin, Phone, Mail, Award, 
  Languages, DollarSign, Play, User, GraduationCap, Users, 
  Camera, Video, ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import PhotoViewer from "@/components/PhotoViewer";
import VideoPlayer from "@/components/VideoPlayer";
import ImageGalleryViewer from "@/components/ImageGalleryViewer";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import doctor5 from "@/assets/doctor-5.jpg";
import doctor6 from "@/assets/doctor-6.jpg";
import doctor7 from "@/assets/doctor-7.jpg";
import doctor8 from "@/assets/doctor-8.jpg";
import emergencyCare from "@/assets/emergency-care.jpg";
import mentalHealth from "@/assets/mental-health.jpg";
import smartPharmacy from "@/assets/smart-pharmacy.jpg";
import surgeryInnovation from "@/assets/surgery-innovation.jpg";
import wellnessPrograms from "@/assets/wellness-programs.jpg";
import clinicInterior from "@/assets/clinic-interior-1.jpg";
import geneticCare from "@/assets/genetic-care.jpg";
import teleMedicine from "@/assets/telemedicine.jpg";
import consultationScene from "@/assets/consultation-scene.jpg";
import medicalEquipment from "@/assets/medical-equipment.jpg";
import healthTech from "@/assets/health-tech.jpg";
import medicalTeam from "@/assets/medical-team.jpg";
import surgicalTheater from "@/assets/surgical-theater.jpg";
import researchLab from "@/assets/research-lab.jpg";

const additionalImages = [
  {
    url: clinicInterior,
    title: "Modern Medical Facility",
    description: "State-of-the-art consultation rooms and medical equipment",
  },
  {
    url: consultationScene,
    title: "Patient Consultation",
    description: "Personalized care and detailed treatment planning",
  },
  {
    url: medicalEquipment,
    title: "Advanced Medical Technology",
    description: "Latest diagnostic and treatment equipment",
  },
  {
    url: medicalTeam,
    title: "Medical Team Collaboration",
    description: "Coordinated care with healthcare professionals",
  },
  {
    url: surgicalTheater,
    title: "Surgical Excellence",
    description: "Modern operating rooms with advanced technology",
  },
  {
    url: researchLab,
    title: "Medical Research",
    description: "Continuous advancement in medical science",
  },
  {
    url: healthTech,
    title: "Health Technology",
    description:
      "Innovative solutions transforming patient care and diagnostics",
  },
  {
    url: teleMedicine,
    title: "Telemedicine",
    description:
      "Remote consultations connecting patients with doctors anytime, anywhere",
  },
  {
    url: geneticCare,
    title: "Genetic Care",
    description: "Personalized treatments guided by advanced genetic analysis",
  },
  {
    url: smartPharmacy,
    title: "Smart Pharmacy",
    description:
      "Automated solutions ensuring safe, accurate, and timely medications",
  },
  {
    url: surgeryInnovation,
    title: "Surgical Innovation",
    description:
      "Cutting-edge technology enabling precision and minimally invasive surgery",
  },
  {
    url: wellnessPrograms,
    title: "Wellness Programs",
    description:
      "Holistic initiatives promoting preventive healthcare and lifestyle balance",
  },
  {
    url: emergencyCare,
    title: "Emergency Care",
    description:"Rapid response and advanced support for critical medical situations",
  },
  {
    url: mentalHealth,
    title: "Mental Health",
    description:"Comprehensive care programs supporting emotional and psychological well-being",
  },
];

const doctorsData = {
  1: {
    id: 1,
    name: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    image: doctor1,
    rating: 4.9,
    totalReviews: 127,
    experience: "15+ years",
    patients: "2.5k+",
    education: [
      "MD - Harvard Medical School",
      "Residency - Johns Hopkins Hospital",
      "Fellowship - Mayo Clinic",
    ],
    languages: ["English", "Spanish", "French"],
    about:
      "Dr. Akhil is a board-certified cardiologist with over 15 years of experience treating complex cardiovascular conditions. He specializes in preventive cardiology, heart failure management, and cardiac catheterization procedures. His approach combines cutting-edge medical technology with compassionate patient care.",
    location: "New York Medical Center, NY",
    consultationFee: 150,
    aboutImages: [
      additionalImages[0],
      additionalImages[1],
      additionalImages[2],
      additionalImages[3],
      additionalImages[6],
      additionalImages[7],
    ],
    availability: {
      "2024-12-20": ["09:00", "10:30", "14:00", "15:30"],
      "2024-12-21": ["10:00", "11:30", "16:00"],
      "2024-12-22": ["09:30", "13:00", "14:30", "16:30"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Sarah M.",
        rating: 5,
        comment:
          "Dr. Akhil saved my life. His expertise in cardiology is unmatched, and he explains everything clearly.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        patientName: "Michael R.",
        rating: 5,
        comment:
          "Excellent doctor! Very thorough examination and great bedside manner. Highly recommended.",
        date: "1 month ago",
      },
      {
        id: 3,
        patientName: "Linda K.",
        rating: 4,
        comment:
          "Professional and knowledgeable. The appointment was on time and very informative.",
        date: "2 months ago",
      },
    ],
  },
  2: {
    id: 2,
    name: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    image: doctor2,
    rating: 4.8,
    totalReviews: 89,
    experience: "12+ years",
    patients: "1.8k+",
    education: [
      "MD - Stanford School of Medicine",
      "Residency - Children's Hospital Boston",
      "Fellowship - UCSF Benioff",
    ],
    languages: ["English", "Mandarin", "Korean"],
    about:
      "Dr. Impotent is a dedicated pediatrician who provides comprehensive care for children from birth to adolescence. She has special interests in developmental pediatrics, childhood nutrition, and preventive care. Her gentle approach and ability to connect with children makes every visit comfortable.",
    location: "Children's Medical Center, CA",
    consultationFee: 120,
    aboutImages: [additionalImages[4], additionalImages[5], additionalImages[8], additionalImages[9], additionalImages[10]],
    availability: {
      "2024-12-20": ["08:00", "09:30", "11:00", "15:00"],
      "2024-12-21": ["09:00", "10:30", "14:00", "16:00"],
      "2024-12-22": ["08:30", "12:00", "13:30", "17:00"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Jennifer L.",
        rating: 5,
        comment:
          "Dr. Impotent is amazing with kids. My daughter loves her visits and feels comfortable.",
        date: "1 week ago",
      },
      {
        id: 2,
        patientName: "Robert T.",
        rating: 5,
        comment:
          "Very knowledgeable and patient. She answered all our questions and provided great advice.",
        date: "3 weeks ago",
      },
    ],
  },
  3: {
    id: 3,
    name: "Dr. Elvis Vannam",
    specialty: "Orthopedic Surgeon",
    image: doctor3,
    rating: 4.7,
    totalReviews: 156,
    experience: "18+ years",
    patients: "3.2k+",
    education: [
      "MD - Columbia University",
      "Residency - Hospital for Special Surgery",
      "Fellowship - Cleveland Clinic",
    ],
    languages: ["English", "German"],
    about:
      "Dr. Vannam is an orthopedic surgeon specializing in sports medicine and joint replacement surgery. He has performed over 2,000 successful surgeries and is known for his minimally invasive techniques. Athletes and active individuals trust him to get them back to peak performance.",
    location: "Orthopedic Institute, FL",
    consultationFee: 200,
    aboutImages: [additionalImages[11], additionalImages[12], additionalImages[13]],
    availability: {
      "2024-12-20": ["10:00", "13:00", "15:00"],
      "2024-12-21": ["09:00", "11:00", "14:30", "16:30"],
      "2024-12-22": ["08:00", "12:30", "15:30"],
    },
    reviews: [
      {
        id: 1,
        patientName: "David P.",
        rating: 5,
        comment:
          "Outstanding surgeon! My knee replacement was perfect and recovery was faster than expected.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        patientName: "Maria S.",
        rating: 4,
        comment:
          "Professional and skilled. Explained the procedure clearly and post-op care was excellent.",
        date: "1 month ago",
      },
    ],
  },
  4: {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    image: doctor4,
    rating: 4.7,
    totalReviews: 92,
    experience: "10+ years",
    patients: "1.5k+",
    education: [
      "MD - University of California",
      "Residency - UCLA Medical Center",
      "Fellowship - Dermatology Institute",
    ],
    languages: ["English", "Spanish"],
    about:
      "Dr. Rodriguez is a board-certified dermatologist with expertise in medical and cosmetic dermatology. She specializes in skin cancer detection, acne treatment, and anti-aging procedures. Her patients appreciate her thorough approach and natural-looking results.",
    location: "Skin Care Institute, CA",
    consultationFee: 130,
    aboutImages: [additionalImages[0], additionalImages[2]],
    availability: {
      "2024-12-20": ["09:00", "11:30", "14:00", "16:30"],
      "2024-12-21": ["10:00", "12:30", "15:00"],
      "2024-12-22": ["08:30", "13:00", "15:30", "17:00"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Amanda S.",
        rating: 5,
        comment:
          "Dr. Rodriguez helped clear my acne completely. Professional and caring doctor.",
        date: "1 week ago",
      },
      {
        id: 2,
        patientName: "Mark J.",
        rating: 4,
        comment:
          "Great dermatologist! Thorough skin examination and helpful skincare advice.",
        date: "1 month ago",
      },
    ],
  },
  5: {
    id: 5,
    name: "Dr. David Kim",
    specialty: "Neurologist",
    image: doctor5,
    rating: 4.8,
    totalReviews: 134,
    experience: "14+ years",
    patients: "2.1k+",
    education: [
      "MD - Johns Hopkins University",
      "Residency - Mayo Clinic",
      "Fellowship - Cleveland Clinic",
    ],
    languages: ["English", "Korean", "Japanese"],
    about:
      "Dr. Kim is a renowned neurologist specializing in movement disorders, epilepsy, and neurodegenerative diseases. He uses the latest diagnostic techniques and treatment protocols to provide comprehensive neurological care. His research contributions have advanced the field significantly.",
    location: "Brain & Spine Center, NY",
    consultationFee: 180,
    aboutImages: [additionalImages[1], additionalImages[4]],
    availability: {
      "2024-12-20": ["09:30", "11:00", "15:00", "16:30"],
      "2024-12-21": ["10:30", "13:00", "14:30"],
      "2024-12-22": ["08:00", "12:00", "16:00", "17:30"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Helen W.",
        rating: 5,
        comment:
          "Dr. Kim diagnosed my condition accurately and treatment has been very effective.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        patientName: "James C.",
        rating: 5,
        comment:
          "Excellent neurologist with great expertise. Highly recommend for any neurological issues.",
        date: "1 month ago",
      },
    ],
  },
  6: {
    id: 6,
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatrist",
    image: doctor6,
    rating: 4.9,
    totalReviews: 201,
    experience: "16+ years",
    patients: "1.9k+",
    education: [
      "MD - Harvard Medical School",
      "Residency - McLean Hospital",
      "Fellowship - Massachusetts General Hospital",
    ],
    languages: ["English", "French", "Portuguese"],
    about:
      "Dr. Thompson is a compassionate psychiatrist specializing in anxiety disorders, depression, and PTSD. She combines medication management with evidence-based psychotherapy to provide holistic mental health care. Her patients value her empathetic approach and expertise.",
    location: "Mental Health Clinic, MA",
    consultationFee: 160,
    aboutImages: [additionalImages[3], additionalImages[5]],
    availability: {
      "2024-12-20": ["10:00", "12:00", "14:00", "16:00"],
      "2024-12-21": ["09:00", "11:00", "15:00", "17:00"],
      "2024-12-22": ["10:30", "13:30", "15:30"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Rachel M.",
        rating: 5,
        comment:
          "Dr. Thompson changed my life. Her therapy approach is incredibly effective and caring.",
        date: "1 week ago",
      },
      {
        id: 2,
        patientName: "Tom L.",
        rating: 5,
        comment:
          "Outstanding psychiatrist! Professional, understanding, and truly helps with mental health.",
        date: "3 weeks ago",
      },
    ],
  },
  7: {
    id: 7,
    name: "Dr. Robert Anderson",
    specialty: "Urologist",
    image: doctor7,
    rating: 4.8,
    totalReviews: 98,
    experience: "13+ years",
    patients: "1.7k+",
    education: [
      "MD - University of Pennsylvania",
      "Residency - Cleveland Clinic",
      "Fellowship - Memorial Sloan Kettering",
    ],
    languages: ["English", "German", "Italian"],
    about:
      "Dr. Anderson is a skilled urologist specializing in minimally invasive procedures and robotic surgery. He has extensive experience in treating kidney stones, prostate conditions, and urological cancers. His patient-centered approach focuses on providing comprehensive care with the latest technological advances.",
    location: "Advanced Urology Center, OH",
    consultationFee: 170,
    aboutImages: [additionalImages[4], additionalImages[0]],
    availability: {
      "2024-12-20": ["09:00", "11:00", "14:30", "16:00"],
      "2024-12-21": ["10:30", "13:00", "15:30", "17:00"],
      "2024-12-22": ["08:00", "12:00", "14:00", "16:30"],
    },
    reviews: [
      {
        id: 1,
        patientName: "George T.",
        rating: 5,
        comment:
          "Dr. Anderson performed my surgery perfectly. Recovery was faster than expected.",
        date: "1 week ago",
      },
      {
        id: 2,
        patientName: "Patricia L.",
        rating: 5,
        comment:
          "Excellent urologist with great expertise. Very professional and caring approach.",
        date: "2 weeks ago",
      },
      {
        id: 3,
        patientName: "Kevin M.",
        rating: 4,
        comment:
          "Thorough examination and clear explanation of treatment options. Highly recommend.",
        date: "1 month ago",
      },
    ],
  },
  8: {
    id: 8,
    name: "Dr. Anna Martinez",
    specialty: "Gynecologist",
    image: doctor8,
    rating: 4.9,
    totalReviews: 156,
    experience: "11+ years",
    patients: "2.3k+",
    education: [
      "MD - University of California San Francisco",
      "Residency - Cedars-Sinai Medical Center",
      "Fellowship - Women's Health Institute",
    ],
    languages: ["English", "Spanish", "Portuguese"],
    about:
      "Dr. Martinez is a compassionate gynecologist dedicated to women's health across all life stages. She specializes in preventive care, reproductive health, and minimally invasive gynecological procedures. Her warm approach and expertise make her patients feel comfortable and well-cared for.",
    location: "Women's Health Center, CA",
    consultationFee: 140,
    aboutImages: [additionalImages[1], additionalImages[3]],
    availability: {
      "2024-12-20": ["08:30", "10:00", "13:30", "15:00"],
      "2024-12-21": ["09:30", "11:00", "14:00", "16:30"],
      "2024-12-22": ["10:00", "12:30", "15:30", "17:00"],
    },
    reviews: [
      {
        id: 1,
        patientName: "Maria S.",
        rating: 5,
        comment:
          "Dr. Martinez is wonderful! She makes you feel comfortable and explains everything clearly.",
        date: "3 days ago",
      },
      {
        id: 2,
        patientName: "Jennifer H.",
        rating: 5,
        comment:
          "Outstanding care throughout my pregnancy. Professional and very knowledgeable.",
        date: "1 week ago",
      },
      {
        id: 3,
        patientName: "Lisa R.",
        rating: 5,
        comment:
          "Excellent gynecologist. Compassionate care and thorough examinations.",
        date: "2 weeks ago",
      },
    ],
  },
};

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const doctorId = parseInt(id || "0");
  const doctor = doctorsData[doctorId as keyof typeof doctorsData];

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Doctor not found</h2>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const getAvailableTimesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return doctor.availability[dateStr] || [];
  };

  const handleScheduleAppointment = () => {
    if (selectedDate && selectedTime) {
      // Show success toast or navigate to confirmation page
      console.log("Appointment scheduled for", selectedDate, "at", selectedTime);
    }
  };

  const handleImageClick = (index: number) => {
    setGalleryStartIndex(index);
    setIsGalleryOpen(true);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Doctor Profile</h1>
        </div>

        {/* Main Profile Card */}
        <Card className="shadow-medical-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Photo & Quick Info */}
              <div className="space-y-6">
                <div className="text-center">
                  <div 
                    className="relative inline-block cursor-pointer group"
                    onClick={() => setIsPhotoViewerOpen(true)}
                  >
                    <Avatar className="h-48 w-48 mx-auto">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback className="text-2xl">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mt-4">{doctor.name}</h2>
                  <p className="text-xl text-primary font-medium">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center p-4">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{doctor.patients}</p>
                    <p className="text-sm text-muted-foreground">Patients</p>
                  </Card>
                  <Card className="text-center p-4">
                    <GraduationCap className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{doctor.experience}</p>
                    <p className="text-sm text-muted-foreground">Experience</p>
                  </Card>
                </div>

                {/* Video Section */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    Introduction Video
                  </h4>
                  <VideoPlayer doctorName={doctor.name} />
                </div>
              </div>

              {/* Center Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">About Dr. {doctor.name.split(' ')[1]}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{doctor.about}</p>
                  
                  {/* Additional Images */}
                  {doctor.aboutImages && doctor.aboutImages.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold flex items-center">
                        <Camera className="h-4 w-4 mr-2 text-primary" />
                        Facility & Practice
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {doctor.aboutImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-medical hover:shadow-medical-lg transition-all duration-300"
                            onClick={() => handleImageClick(index)}
                          >
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-2">
                                <Camera className="h-6 w-6 mx-auto mb-1" />
                                <p className="text-xs font-medium">{image.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {doctor.education.map((edu, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <Languages className="h-5 w-5 mr-2 text-primary" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">{lang}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">{doctor.location}</p>
                    </CardContent>
                  </Card>

                  {/* Consultation Fee */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <DollarSign className="h-5 w-5 mr-2 text-primary" />
                        Consultation Fee
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-2xl font-bold text-primary">${doctor.consultationFee}</p>
                      <p className="text-sm text-muted-foreground">Per consultation</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1 h-12">
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Schedule Appointment with {doctor.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Select Date</label>
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                          />
                        </div>
                        
                        {selectedDate && (
                          <div>
                            <label className="text-sm font-medium">Available Times</label>
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableTimesForDate(selectedDate).map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Consultation Fee:</span>
                            <span className="text-lg font-bold text-primary">${doctor.consultationFee}</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleScheduleAppointment}
                          disabled={!selectedDate || !selectedTime}
                          className="w-full h-12"
                        >
                          Confirm Appointment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" className="flex-1 h-12">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Reviews */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
              Patient Reviews ({doctor.reviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctor.reviews.map((review) => (
                <div key={review.id} className="border-l-4 border-primary/20 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.patientName}</span>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Photo Viewer */}
        <PhotoViewer
          isOpen={isPhotoViewerOpen}
          onClose={() => setIsPhotoViewerOpen(false)}
          imageUrl={doctor.image}
          doctorName={doctor.name}
        />
        
        {/* Image Gallery Viewer */}
        {doctor.aboutImages && (
          <ImageGalleryViewer
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            images={doctor.aboutImages}
            initialIndex={galleryStartIndex}
          />
        )}
      </div>
    </div>
  );
}