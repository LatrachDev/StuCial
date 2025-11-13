import { useState, useRef } from 'react';
import { MessageCircle, Send, Filter, Plus, Star, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

const initialServices = [
  {
    id: 1,
    title: 'PowerPoint Presentations Design',
    description: 'Professional and creative PowerPoint presentations for your projects and assignments. Clean layouts, modern design, and quick delivery.',
    author: 'Yasmine El Mansouri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine',
    category: 'Design',
    price: '50-100 DH',
    rating: 4.8,
    reviews: [],
    university: 'Hassan II University',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1712903911017-7c10a3c4b3e5?w=400'
  },
  {
    id: 2,
    title: 'Web Development & Programming Help',
    description: 'Full-stack web development services. HTML, CSS, JavaScript, React, Node.js. Help with debugging, project completion, and learning.',
    author: 'Ahmed Benali',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    category: 'Development',
    price: '100-200 DH',
    rating: 5.0,
    reviews: [],
    university: 'Mohammed V University',
    city: 'Rabat',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400'
  },
  {
    id: 3,
    title: 'Academic Writing & Proofreading',
    description: 'Professional proofreading and editing services for essays, research papers, and reports. French, English, and Arabic supported.',
    author: 'Fatima Zahra',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    category: 'Writing',
    price: '30-80 DH',
    rating: 4.9,
    reviews: [],
    university: 'Cadi Ayyad University',
    city: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'
  },
  {
    id: 4,
    title: 'Graphic Design & Logo Creation',
    description: 'Custom logos, posters, flyers, and social media graphics. Perfect for student clubs, events, and personal branding.',
    author: 'Omar Idrissi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    category: 'Design',
    price: '80-150 DH',
    rating: 4.7,
    reviews: [],
    university: 'Hassan II University',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1707061229292-ad11decf3eea?w=400'
  },
  {
    id: 5,
    title: 'Math & Physics Tutoring',
    description: 'One-on-one or group tutoring sessions for mathematics and physics. Exam preparation and homework help available.',
    author: 'Karim Alami',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
    category: 'Tutoring',
    price: '60-120 DH/hour',
    rating: 5.0,
    reviews: [],
    university: 'Mohammed V University',
    city: 'Rabat',
    image: 'https://images.unsplash.com/photo-1758685733985-695e588224d5?w=400'
  },
  {
    id: 6,
    title: 'Video Editing & Motion Graphics',
    description: 'Professional video editing for presentations, vlogs, and events. Add effects, transitions, subtitles, and more.',
    author: 'Salma Bennani',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Salma',
    category: 'Multimedia',
    price: '100-250 DH',
    rating: 4.8,
    reviews: [],
    university: 'Al Akhawayn University',
    city: 'Ifrane',
    image: 'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=400'
  }
];

export function ServicesPage() {
  const { t } = useLanguage();
  const [services, setServices] = useState(initialServices);
  const [filterUniversity, setFilterUniversity] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [chatDialog, setChatDialog] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [reviewDialog, setReviewDialog] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [viewReviewsDialog, setViewReviewsDialog] = useState(null);
  const [addServiceDialog, setAddServiceDialog] = useState(false);
  const imageInputRef = useRef(null);

  // Add service form states
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    portfolio: '',
    skills: '',
    experience: '',
    projects: '',
    image: null,
    imagePreview: null
  });

  const universities = ['all', ...Array.from(new Set(services.map(s => s.university)))];
  const cities = ['all', ...Array.from(new Set(services.map(s => s.city)))];

  const filteredServices = services.filter(service => {
    const matchesUniversity = filterUniversity === 'all' || service.university === filterUniversity;
    const matchesCity = filterCity === 'all' || service.city === filterCity;
    return matchesUniversity && matchesCity;
  });

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
      setChatDialog(null);
    }
  };

  const handleSubmitReview = () => {
    if (reviewDialog && rating > 0 && reviewText.trim()) {
      const newReview = {
        id: Date.now(),
        author: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        rating,
        text: reviewText,
        date: 'Just now'
      };

      setServices(services.map(service => {
        if (service.id === reviewDialog.id) {
          const updatedReviews = [...service.reviews, newReview];
          const avgRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...service,
            reviews: updatedReviews,
            rating: Math.round(avgRating * 10) / 10
          };
        }
        return service;
      }));

      setRating(0);
      setReviewText('');
      setReviewDialog(null);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewService({ ...newService, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService(prev => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishService = () => {
    // Validate required fields
    if (!newService.title || !newService.description || !newService.price || !newService.category || !newService.portfolio) {
      alert('Please fill all required fields');
      return;
    }

    const service = {
      id: Date.now(),
      title: newService.title,
      description: newService.description,
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      category: newService.category,
      price: newService.price,
      rating: 0,
      reviews: [],
      university: 'Your University',
      city: 'Your City',
      image: newService.imagePreview || 'https://images.unsplash.com/photo-1712903911017-7c10a3c4b3e5?w=400',
      portfolio: newService.portfolio,
      skills: newService.skills,
      experience: newService.experience ? parseInt(newService.experience) : undefined,
      projects: newService.projects ? parseInt(newService.projects) : undefined
    };

    setServices([service, ...services]);
    setNewService({
      title: '',
      description: '',
      price: '',
      category: '',
      portfolio: '',
      skills: '',
      experience: '',
      projects: '',
      image: null,
      imagePreview: null
    });
    setAddServiceDialog(false);
  };

  const selectedService = services.find(s => s.id === chatDialog);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0E2F76] mb-2">{t('services.title')}</h1>
          <p className="text-[#5A6C7D]">{t('services.subtitle')}</p>
        </div>

        {/* Filters */}
        <Card className="p-6 rounded-2xl border-[#AAC0E1] mb-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#0E2F76]" />
            <h3 className="text-[#0E2F76]">{t('services.filterServices')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#5A6C7D] mb-2 block">{t('services.university')}</label>
              <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                <SelectTrigger className="border-[#AAC0E1] rounded-xl">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map(uni => (
                    <SelectItem key={uni} value={uni}>
                      {uni === 'all' ? t('services.allUniversities') : uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-[#5A6C7D] mb-2 block">{t('services.city')}</label>
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="border-[#AAC0E1] rounded-xl">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city === 'all' ? t('services.allCities') : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 text-sm text-[#5A6C7D]">
            {t('services.showing')} {filteredServices.length} {t('services.of')} {services.length} {t('services.servicesText')}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="rounded-2xl border-[#AAC0E1] hover:shadow-lg transition-all overflow-hidden bg-white">
              {/* Service Image */}
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-[#AAC0E1] text-white hover:bg-[#AAC0E1]">
                    {service.category}
                  </Badge>
                  <span className="text-[#0E2F76]">{service.price}</span>
                </div>

                <h3 className="text-lg text-[#0E2F76] mb-3">{service.title}</h3>
                <p className="text-sm text-[#5A6C7D] mb-4 line-clamp-3">{service.description}</p>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#AAC0E1]">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={service.avatar} />
                    <AvatarFallback>{service.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm text-[#0E2F76]">{service.author}</div>
                    <div className="flex items-center gap-1 text-xs text-[#5A6C7D]">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                      <span>({service.reviews.length} {t('services.reviews')})</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#5A6C7D] mb-4">
                  <div>🎓 {service.university}</div>
                  <div>📍 {service.city}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setReviewDialog(service)}
                      variant="outline"
                      className="flex-1 border-[#0E2F76] text-[#0E2F76] hover:bg-[#0E2F76] hover:text-white rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('services.comment')}
                    </Button>
                    <Button 
                      onClick={() => setChatDialog(service.id)}
                      className="flex-1 bg-[#AAC0E1] hover:bg-[#0E2F76] text-white rounded-xl"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('services.chat')}
                    </Button>
                  </div>
                  {service.reviews.length > 0 && (
                    <Button
                      onClick={() => setViewReviewsDialog(service)}
                      variant="ghost"
                      className="w-full text-[#0E2F76] hover:bg-[#F5FEFF] rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t('services.viewReviews')}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating Add Service Button */}
        <button
          onClick={() => setAddServiceDialog(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#0E2F76] to-[#AAC0E1] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center z-50"
          aria-label="Add Service"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Chat Dialog */}
        <Dialog open={chatDialog !== null} onOpenChange={(open) => !open && setChatDialog(null)}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedService?.avatar} />
                  <AvatarFallback>{selectedService?.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-[#0E2F76]">{t('services.chatWith')} {selectedService?.author}</div>
                  <div className="text-sm text-[#5A6C7D]">{selectedService?.title}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder={t('services.typeMessage')}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="border-[#AAC0E1] rounded-xl min-h-[120px]"
              />
              <Button
                onClick={handleSendMessage}
                className="w-full bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('services.sendMessage')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Review Dialog */}
        <Dialog open={reviewDialog !== null} onOpenChange={(open) => !open && setReviewDialog(null)}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#0E2F76]">{t('services.rateService')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-[#0E2F76] mb-2 block">{t('services.rating')}</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="review" className="text-[#0E2F76]">{t('services.writeReview')}</Label>
                <Textarea
                  id="review"
                  placeholder={t('services.writeReview')}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="mt-2 border-[#AAC0E1] rounded-xl min-h-[100px]"
                />
              </div>
              <Button
                onClick={handleSubmitReview}
                disabled={rating === 0 || !reviewText.trim()}
                className="w-full bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
              >
                {t('services.submitReview')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Reviews Dialog */}
        <Dialog open={viewReviewsDialog !== null} onOpenChange={(open) => !open && setViewReviewsDialog(null)}>
          <DialogContent className="rounded-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#0E2F76]">{t('services.viewReviews')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {viewReviewsDialog?.reviews.map((review) => (
                <Card key={review.id} className="p-4 border-[#AAC0E1] rounded-xl">
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#0E2F76]">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-[#5A6C7D]">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#2D2D2D]">{review.text}</p>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Service Dialog */}
        <Dialog open={addServiceDialog} onOpenChange={setAddServiceDialog}>
          <DialogContent className="rounded-2xl max-h-[90vh] overflow-y-auto max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#0E2F76]">{t('services.addService')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceTitle" className="text-[#0E2F76]">
                  {t('services.title')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="serviceTitle"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="mt-2 border-[#AAC0E1] rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="serviceDescription" className="text-[#0E2F76]">
                  {t('services.description')} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="serviceDescription"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="mt-2 border-[#AAC0E1] rounded-xl min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servicePrice" className="text-[#0E2F76]">
                    {t('services.price')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="servicePrice"
                    placeholder="100-200 DH"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    className="mt-2 border-[#AAC0E1] rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="serviceCategory" className="text-[#0E2F76]">
                    {t('services.category')} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newService.category}
                    onValueChange={(value) => setNewService({ ...newService, category: value })}
                  >
                    <SelectTrigger className="mt-2 border-[#AAC0E1] rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                      <SelectItem value="Tutoring">Tutoring</SelectItem>
                      <SelectItem value="Multimedia">Multimedia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="servicePortfolio" className="text-[#0E2F76]">
                  {t('services.portfolio')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="servicePortfolio"
                  type="url"
                  placeholder="https://..."
                  value={newService.portfolio}
                  onChange={(e) => setNewService({ ...newService, portfolio: e.target.value })}
                  className="mt-2 border-[#AAC0E1] rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="serviceImage" className="text-[#0E2F76]">{t('services.images')}</Label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full mt-2 border-[#AAC0E1] text-[#0E2F76] hover:bg-[#F5FEFF] rounded-xl"
                >
                  Upload Image
                </Button>
                {newService.imagePreview && (
                  <div className="mt-3">
                    <img src={newService.imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="serviceSkills" className="text-[#0E2F76]">{t('services.skills')}</Label>
                <Input
                  id="serviceSkills"
                  placeholder="Photoshop, Illustrator, Figma"
                  value={newService.skills}
                  onChange={(e) => setNewService({ ...newService, skills: e.target.value })}
                  className="mt-2 border-[#AAC0E1] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serviceExperience" className="text-[#0E2F76]">{t('services.experience')}</Label>
                  <Input
                    id="serviceExperience"
                    type="number"
                    placeholder="3"
                    value={newService.experience}
                    onChange={(e) => setNewService({ ...newService, experience: e.target.value })}
                    className="mt-2 border-[#AAC0E1] rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceProjects" className="text-[#0E2F76]">{t('services.projects')}</Label>
                  <Input
                    id="serviceProjects"
                    type="number"
                    placeholder="15"
                    value={newService.projects}
                    onChange={(e) => setNewService({ ...newService, projects: e.target.value })}
                    className="mt-2 border-[#AAC0E1] rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#AAC0E1] text-sm text-[#5A6C7D]">
                <span className="text-red-500">*</span> Required fields
              </div>

              <Button
                onClick={handlePublishService}
                className="w-full bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl py-6"
              >
                {t('services.publishService')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

