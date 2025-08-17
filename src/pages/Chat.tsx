import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import userProfile from "@/assets/user-profile.jpg";

const doctors = [
  {
    id: 1,
    name: "Dr. Akhil Kunjunni",
    specialty: "Cardiologist",
    image: doctor1,
    online: true,
    lastMessage: "Your test results look good. Let's schedule a follow-up.",
    timestamp: "2 min ago",
    unread: 2
  },
  {
    id: 2,
    name: "Dr. Ashish Impotent",
    specialty: "Pediatrician",
    image: doctor2,
    online: false,
    lastMessage: "The medication should help with the symptoms.",
    timestamp: "1 hour ago",
    unread: 0
  },
  {
    id: 3,
    name: "Dr. Elvis Vannam",
    specialty: "Orthopedic Surgeon",
    image: doctor3,
    online: true,
    lastMessage: "Physical therapy exercises are attached.",
    timestamp: "3 hours ago",
    unread: 1
  }
];

const sampleMessages = [
  {
    id: 1,
    sender: "doctor",
    message: "Hello John! How are you feeling today?",
    timestamp: "10:30 AM",
    type: "text"
  },
  {
    id: 2,
    sender: "user",
    message: "Hi Dr. Wilson! I'm feeling much better. The medication is working well.",
    timestamp: "10:32 AM",
    type: "text"
  },
  {
    id: 3,
    sender: "doctor",
    message: "That's great to hear! Your recent test results came back and they look very promising.",
    timestamp: "10:35 AM",
    type: "text"
  },
  {
    id: 4,
    sender: "doctor",
    message: "I'd like to schedule a follow-up appointment in 2 weeks to monitor your progress.",
    timestamp: "10:36 AM",
    type: "text"
  },
  {
    id: 5,
    sender: "user",
    message: "That sounds perfect. What day works best for you?",
    timestamp: "10:38 AM",
    type: "text"
  },
  {
    id: 6,
    sender: "doctor",
    message: "How about next Friday at 2:00 PM? I have an opening then.",
    timestamp: "10:40 AM",
    type: "text"
  }
];

const predefinedQuestions = [
  "How are you feeling today?",
  "I need help with my medication",
  "Can I schedule an appointment?",
  "What are my test results?",
  "I have a medical emergency"
];

const autoResponses: { [key: string]: string } = {
  "hai": "Hello! How can I help you today? I'm here to assist with your medical needs.",
  "hi": "Hi there! Welcome to our medical chat service. How may I assist you?",
  "hello": "Hello! I'm your medical assistant. What can I help you with today?",
  "help": "I'm here to help! You can ask me about appointments, medications, test results, or any medical concerns.",
  "appointment": "I'd be happy to help you schedule an appointment. Please let me know your preferred date and time.",
  "medication": "For medication inquiries, please provide details about your current prescription or concerns.",
  "emergency": "If this is a medical emergency, please call 911 or go to your nearest emergency room immediately.",
  "test results": "I can help you understand your test results. Please specify which test you're asking about.",
  "pain": "I understand you're experiencing pain. Can you describe the location and type of pain you're feeling?",
  "fever": "For fever management, ensure you stay hydrated and rest. If your fever is above 102°F (39°C), please seek immediate medical attention.",
  "medical plan": "Our comprehensive medical plans include preventive care, specialist consultations, diagnostic services, and personalized treatment options. We offer flexible packages tailored to your healthcare needs with 24/7 telemedicine support, priority appointments, and wellness programs. Would you like me to provide more details about our specific plans?",
  "health plan": "Our health plans are designed to provide complete medical coverage including routine checkups, emergency care, specialist visits, and prescription medications. We focus on preventive care to keep you healthy and offer competitive pricing with excellent coverage options.",
  "insurance": "We accept most major insurance plans and also offer direct payment options. Our billing team can help verify your coverage and explain any out-of-pocket costs before your appointment.",
  "coverage": "Our coverage includes primary care, specialty consultations, diagnostic tests, preventive screenings, mental health services, and emergency care. We'll work with your insurance to maximize your benefits."
};

// Enhanced pattern matching for Aleefa Sudheer queries
const aleefaPatterns = [
  /who\s+is\s+aleefa(\s+sudheer)?/i,
  /aleefa(\s+sudheer)?\s+who/i,
  /about\s+aleefa(\s+sudheer)?/i,
  /tell\s+me\s+about\s+aleefa(\s+sudheer)?/i,
  /aleefa(\s+sudheer)?\s+information/i
];

const aleefaResponse = `On 21st October 2005, the world was blessed with someone truly special. That day marked the beginning of a story filled with courage, kindness, and endless inspiration. She grew up in a loving family of four—her father, mother, and sister—who shaped her into the wonderful person she is today.

What makes her shine is not just her intelligence but also her pure heart. She is a passionate Virat Kohli fan, and her love for cricket and movies shows her lively spirit. She is brilliant in studies and a sharp mind in chess, always balancing focus with creativity. More than anything, she has a burning desire to make her parents proud, and she works tirelessly toward that dream.

Her presence is like sunshine—she is friendly to everyone, easy to approach, and always ready to help. In class, she never thinks twice about guiding her classmates with studies. Beyond her intelligence, she carries a lighthearted nature—funny, playful, and full of charm. She loves traveling, always curious to explore new places, cultures, and experiences, which makes her spirit even more vibrant.

She has her own little world of joy—her love for chocolates, candies, and collecting cute stationery items shows her childlike innocence, while her pretty eyes, graceful hair, and elegant dressing sense reflect her natural beauty. To me, she feels like a soft teddy, someone who brings comfort, warmth, and peace just by being herself.

But what truly makes her unforgettable is her strength and sensitivity. Life has tested her with many challenges, yet her willpower helped her survive them all. At the same time, she is deeply sensitive, someone who feels emotions strongly, values people genuinely, and never lets go of her compassion. This rare blend of courage and tenderness is what makes her stand apart from the rest.

For me, she is not just my favorite person—she is my everything. And though many moments in life are precious, none can match the day I first met her on July 10, 2024, at UKF Engineering. That was the moment my world changed. Since then, every day has felt brighter, every journey has felt more meaningful—because she is in it.`;

const maintenanceResponses = [
  "This feature is currently under maintenance. Please try again later.",
  "Our system is being updated. We'll be back shortly to assist you.",
  "Cannot process this request at this time. Please contact our support team.",
  "The server is busy right now. Please try again in a few minutes.",
  "We're experiencing high traffic. Thank you for your patience."
];

export default function Chat() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentDoctor = doctors.find(d => d.id === selectedDoctor);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages]);

  // Create sound effect for message sending
  const playMessageSound = () => {
    // Create a subtle notification sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Play sound effect
      try {
        playMessageSound();
      } catch (error) {
        console.log("Audio not supported");
      }

      const userMessage = {
        id: messages.length + 1,
        sender: "user" as const,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text" as const
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      // Generate auto-reply
      const messageLower = message.trim().toLowerCase();
      let autoReply = "";
      
      // Check for Aleefa Sudheer patterns first
      for (const pattern of aleefaPatterns) {
        if (pattern.test(messageLower)) {
          autoReply = aleefaResponse;
          break;
        }
      }
      
      // If not Aleefa query, check for other predefined responses
      if (!autoReply) {
        for (const [key, response] of Object.entries(autoResponses)) {
          if (messageLower.includes(key)) {
            autoReply = response;
            break;
          }
        }
      }
      
      // If no predefined response found, use maintenance response for complex questions
      if (!autoReply) {
        if (messageLower.length > 50 || (messageLower.includes("?") && messageLower.split(" ").length > 8)) {
          const randomIndex = Math.floor(Math.random() * maintenanceResponses.length);
          autoReply = maintenanceResponses[randomIndex];
        } else {
          autoReply = "Thank you for your message. I'm here to help with your medical concerns. Could you please provide more specific details?";
        }
      }
      
      // Add auto-reply after a short delay
      setTimeout(() => {
        const doctorReply = {
          id: updatedMessages.length + 1,
          sender: "doctor" as const,
          message: autoReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text" as const
        };
        setMessages(prev => [...prev, doctorReply]);
      }, 1000);
      
      setMessage("");
    }
  };

  const insertPredefinedQuestion = (question: string) => {
    setMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] max-w-7xl mx-auto overflow-hidden">
      <div className="flex h-full">
        {/* Doctor List - Hidden on mobile when chat is open */}
        <div className={`${selectedDoctor ? 'hidden lg:block' : 'block'} w-full lg:w-80 border-r border-border bg-card`}>
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p className="text-sm text-muted-foreground">Chat with your doctors</p>
          </div>
          
          <div className="overflow-y-auto scrollbar-hide">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedDoctor === doctor.id ? 'bg-primary/10 border-r-4 border-r-primary' : ''
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {doctor.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{doctor.name}</h3>
                      <div className="flex items-center space-x-2">
                        {doctor.unread > 0 && (
                          <Badge variant="default" className="h-5 w-5 text-xs rounded-full p-0 flex items-center justify-center">
                            {doctor.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{doctor.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground truncate mt-1">{doctor.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedDoctor && currentDoctor ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSelectedDoctor(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentDoctor.image} alt={currentDoctor.name} />
                    <AvatarFallback>{currentDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {currentDoctor.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                  )}
                </div>
                
                 <div className="min-w-0 flex-1">
                   <h3 className="font-medium text-sm sm:text-base truncate">{currentDoctor.name}</h3>
                   <p className="text-xs sm:text-sm text-muted-foreground truncate">
                     {currentDoctor.online ? 'Online' : 'Offline'} • {currentDoctor.specialty}
                   </p>
                 </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                >
                  <div className={`flex max-w-[80%] space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage 
                        src={msg.sender === 'user' ? userProfile : currentDoctor.image} 
                        alt={msg.sender === 'user' ? 'You' : currentDoctor.name} 
                      />
                      <AvatarFallback>
                        {msg.sender === 'user' ? 'You' : currentDoctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground shadow-bounce'
                            : 'bg-card border shadow-sm hover:shadow-medical transition-shadow'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card space-y-3">
              {/* Predefined Questions */}
              <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => insertPredefinedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message or use quick questions above..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // No doctor selected state
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a doctor to start chatting</h3>
              <p className="text-muted-foreground">Choose a doctor from the list to begin your conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}