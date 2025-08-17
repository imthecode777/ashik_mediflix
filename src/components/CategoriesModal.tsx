import { useState } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = [
  { name: "Cardiology", icon: "❤️", color: "bg-red-100 text-red-700", description: "Heart and cardiovascular care" },
  { name: "Dentistry", icon: "🦷", color: "bg-blue-100 text-blue-700", description: "Oral health and dental care" },
  { name: "Orthopedics", icon: "🦴", color: "bg-green-100 text-green-700", description: "Bone and joint treatment" },
  { name: "Pediatrics", icon: "👶", color: "bg-purple-100 text-purple-700", description: "Children's healthcare" },
  { name: "Neurology", icon: "🧠", color: "bg-pink-100 text-pink-700", description: "Brain and nervous system" },
  { name: "Dermatology", icon: "✨", color: "bg-yellow-100 text-yellow-700", description: "Skin and beauty care" },
  { name: "Psychiatry", icon: "🧘", color: "bg-indigo-100 text-indigo-700", description: "Mental health support" },
  { name: "Ophthalmology", icon: "👁️", color: "bg-teal-100 text-teal-700", description: "Eye care and vision" },
  { name: "ENT", icon: "👂", color: "bg-orange-100 text-orange-700", description: "Ear, nose, and throat" },
  { name: "Gynecology", icon: "🌸", color: "bg-rose-100 text-rose-700", description: "Women's health" },
  { name: "Urology", icon: "🔬", color: "bg-cyan-100 text-cyan-700", description: "Urinary system care" },
  { name: "Gastroenterology", icon: "🫁", color: "bg-lime-100 text-lime-700", description: "Digestive system health" },
  { name: "Endocrinology", icon: "⚡", color: "bg-amber-100 text-amber-700", description: "Hormone and metabolism" },
  { name: "Radiology", icon: "📷", color: "bg-violet-100 text-violet-700", description: "Medical imaging" },
  { name: "General Medicine", icon: "🩺", color: "bg-emerald-100 text-emerald-700", description: "General health checkups" },
  { name: "Emergency", icon: "🚨", color: "bg-red-200 text-red-800", description: "Emergency medical care" },
];

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesModal({ isOpen, onClose }: CategoriesModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 animate-slide-down-smooth">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">Medical Specialties</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                Browse and select from our comprehensive list of medical specialties
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted/50 flex-shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search medical specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full custom-scrollbar">
            <div className="p-6 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCategories.map((category, index) => (
                  <Card 
                    key={category.name} 
                    className="hover:shadow-medical-lg transition-all cursor-pointer group hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => {
                      // Handle category selection with smooth feedback
                      console.log(`Selected category: ${category.name}`);
                      // Add a brief delay for visual feedback before closing
                      setTimeout(() => onClose(), 150);
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {category.name}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-2">No specialties found</p>
                  <p className="text-muted-foreground text-sm">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}