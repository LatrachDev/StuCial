import { useState } from 'react';
import { Eye, Filter, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../contexts/LanguageContext';

const initialProducts = [
  {
    id: 1,
    title: 'Complete Algorithms Course Notes',
    description: 'Comprehensive notes covering all algorithms topics from semester 1. Includes diagrams, examples, and practice problems with detailed solutions.',
    fullDescription: 'These notes cover all major algorithms including sorting, searching, dynamic programming, graph algorithms, and more. Each topic includes visual diagrams, code examples in multiple languages, and practice problems with step-by-step solutions. Perfect for exam preparation!',
    price: '80 DH',
    seller: 'Ahmed Benali',
    condition: 'Digital',
    views: 245,
    university: 'Mohammed V University',
    city: 'Rabat',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    category: 'Notes'
  },
  {
    id: 2,
    title: 'Data Structures Cheat Sheets',
    description: 'Visual cheat sheets for all major data structures. Perfect for quick revision before exams.',
    fullDescription: 'Beautifully designed cheat sheets covering arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Each data structure includes time complexity analysis, common operations, and implementation tips. High-quality PDFs ready to print.',
    price: '40 DH',
    seller: 'Yasmine El Mansouri',
    condition: 'Digital',
    views: 189,
    university: 'Hassan II University',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    category: 'Notes'
  },
  {
    id: 3,
    title: 'Linear Algebra Textbook (French)',
    description: 'Used textbook in good condition. Highlights and notes included. Great for S1 students.',
    fullDescription: 'Standard linear algebra textbook used in most Moroccan universities. Contains all chapters from vectors to eigenvalues. Includes margin notes and highlighted important sections. Some practice problems have worked solutions written in.',
    price: '120 DH',
    seller: 'Fatima Zahra',
    condition: 'Used - Good',
    views: 156,
    university: 'Cadi Ayyad University',
    city: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    category: 'Textbooks'
  },
  {
    id: 4,
    title: 'Programming Lab Solutions (Java)',
    description: 'Complete solutions to all Java programming lab exercises. Well-commented and explained.',
    fullDescription: 'All 12 lab assignments fully solved with detailed comments explaining each line of code. Includes best practices, common pitfalls to avoid, and alternative solutions. Great learning resource for understanding Java fundamentals.',
    price: '60 DH',
    seller: 'Omar Idrissi',
    condition: 'Digital',
    views: 312,
    university: 'Hassan II University',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    category: 'Solutions'
  },
  {
    id: 5,
    title: 'Physics Lab Report Templates',
    description: 'Professional LaTeX templates for physics lab reports. Saves hours of formatting time.',
    fullDescription: 'Five professionally designed LaTeX templates for different types of physics experiments. Includes sections for objectives, methodology, results, analysis, and conclusions. Easy to customize with your own data and observations.',
    price: '30 DH',
    seller: 'Karim Alami',
    condition: 'Digital',
    views: 98,
    university: 'Mohammed V University',
    city: 'Rabat',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    category: 'Templates'
  },
  {
    id: 6,
    title: 'Database Design Project Examples',
    description: '5 complete database design projects with documentation, ER diagrams, and SQL scripts.',
    fullDescription: 'Five real-world database design projects including e-commerce, library management, hospital system, school management, and inventory control. Each includes complete documentation, ER diagrams, normalized schemas, and tested SQL scripts.',
    price: '100 DH',
    seller: 'Salma Bennani',
    condition: 'Digital',
    views: 203,
    university: 'Al Akhawayn University',
    city: 'Ifrane',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
    category: 'Projects'
  },
  {
    id: 7,
    title: 'Scientific Calculator (Casio)',
    description: 'Casio fx-991EX calculator in excellent condition. Used for one semester only.',
    fullDescription: 'Casio fx-991EX ClassWiz with natural textbook display. All functions working perfectly. Includes original box and manual. Only used for one semester, like new condition. Perfect for mathematics and engineering courses.',
    price: '200 DH',
    seller: 'Youssef Tahiri',
    condition: 'Like New',
    views: 134,
    university: 'Hassan II University',
    city: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400',
    category: 'Equipment'
  },
  {
    id: 8,
    title: 'English Literature Study Guide',
    description: 'Detailed study guide for English literature course. Includes summaries, analysis, and essay tips.',
    fullDescription: 'Comprehensive study guide covering all required readings for English literature course. Includes plot summaries, character analysis, themes, literary devices, and sample essay questions with model answers. Prepared by an A+ student.',
    price: '50 DH',
    seller: 'Nadia Fassi',
    condition: 'Digital',
    views: 87,
    university: 'Cadi Ayyad University',
    city: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400',
    category: 'Study Guides'
  }
];

export function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(initialProducts);
  const [filterUniversity, setFilterUniversity] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const universities = ['all', ...Array.from(new Set(products.map(p => p.university)))];
  const cities = ['all', ...Array.from(new Set(products.map(p => p.city)))];

  const filteredProducts = products.filter(product => {
    const matchesUniversity = filterUniversity === 'all' || product.university === filterUniversity;
    const matchesCity = filterCity === 'all' || product.city === filterCity;
    return matchesUniversity && matchesCity;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      fullDescription: newDescription,
      price: newPrice,
      seller: 'You',
      condition: newCondition,
      views: 0,
      university: 'Your University',
      city: 'Your City',
      image: newImageUrl || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
      category: newCategory
    };

    setProducts([newProduct, ...products]);
    
    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewCategory('');
    setNewCondition('');
    setNewImageUrl('');
    setShowAddDialog(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0A2463] mb-2">{t('products.title')}</h1>
          <p className="text-[#5A6C7D]">{t('products.subtitle')}</p>
        </div>

        {/* Filters */}
        <Card className="p-6 rounded-2xl border-[#D0E1F9] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#0A2463]" />
            <h3 className="text-[#0A2463]">{t('products.filterProducts')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#5A6C7D] mb-2 block">{t('services.university')}</label>
              <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                <SelectTrigger className="border-[#D0E1F9] rounded-xl">
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
                <SelectTrigger className="border-[#D0E1F9] rounded-xl">
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
            {t('products.showing')} {filteredProducts.length} {t('products.of')} {products.length} {t('products.productsText')}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-5 rounded-2xl border-[#D0E1F9] hover:shadow-lg transition-all">
              <div className="mb-4 h-40 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <Badge className="mb-3 bg-white text-[#0A2463] border border-[#D0E1F9]">
                {product.condition}
              </Badge>

              <h3 className="text-[#0A2463] mb-2 line-clamp-2 min-h-[3rem]">{product.title}</h3>
              <p className="text-sm text-[#5A6C7D] mb-4 line-clamp-2">{product.description}</p>

              <div className="text-xs text-[#5A6C7D] mb-3 space-y-1">
                <div>👤 {product.seller}</div>
                <div>🎓 {product.university}</div>
                <div>📍 {product.city}</div>
              </div>

              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#D0E1F9]">
                <div className="flex items-center gap-1 text-xs text-[#5A6C7D]">
                  <Eye className="w-3 h-3" />
                  {product.views}
                </div>
                <span className="text-lg text-[#3E92CC]">{product.price}</span>
              </div>

              <Button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-[#0A2463] hover:bg-[#1976D2] text-white rounded-xl"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('products.viewDetails')}
              </Button>
            </Card>
          ))}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowAddDialog(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#0A2463] to-[#3E92CC] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center z-50"
          aria-label="Add Product"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Product Detail Modal */}
        <Dialog open={selectedProduct !== null} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#0A2463]">{selectedProduct?.title}</DialogTitle>
            </DialogHeader>
            
            {selectedProduct && (
              <div className="space-y-6">
                <div className="w-full h-64 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-white text-[#0A2463] border border-[#D0E1F9]">
                    {selectedProduct.condition}
                  </Badge>
                  <span className="text-2xl text-[#3E92CC]">{selectedProduct.price}</span>
                </div>

                <div>
                  <h3 className="text-[#0A2463] mb-2">{t('products.description')}</h3>
                  <p className="text-[#5A6C7D] leading-relaxed">{selectedProduct.fullDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8FBFF] rounded-xl">
                  <div>
                    <div className="text-sm text-[#5A6C7D] mb-1">{t('products.seller')}</div>
                    <div className="text-[#0A2463]">{selectedProduct.seller}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5A6C7D] mb-1">{t('products.views')}</div>
                    <div className="text-[#0A2463]">{selectedProduct.views}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5A6C7D] mb-1">{t('services.university')}</div>
                    <div className="text-[#0A2463] text-sm">{selectedProduct.university}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5A6C7D] mb-1">{t('services.city')}</div>
                    <div className="text-[#0A2463]">{selectedProduct.city}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#3E92CC] hover:bg-[#1976D2] text-white rounded-xl py-6">
                    {t('products.contactSeller')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedProduct(null);
                      setShowAddDialog(true);
                    }}
                    className="flex-1 border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white rounded-xl py-6"
                  >
                    {t('products.addYourProduct')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#0A2463]">{t('products.addProduct')}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-[#0A2463]">{t('products.productTitle')}</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-2 border-[#D0E1F9] rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-[#0A2463]">{t('products.productDescription')}</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="mt-2 border-[#D0E1F9] rounded-xl min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-[#0A2463]">{t('products.price')}</Label>
                  <Input
                    id="price"
                    placeholder="100 DH"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="mt-2 border-[#D0E1F9] rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-[#0A2463]">{t('products.category')}</Label>
                  <Select value={newCategory} onValueChange={setNewCategory} required>
                    <SelectTrigger className="mt-2 border-[#D0E1F9] rounded-xl">
                      <SelectValue placeholder={t('products.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Notes">Notes</SelectItem>
                      <SelectItem value="Textbooks">Textbooks</SelectItem>
                      <SelectItem value="Solutions">Solutions</SelectItem>
                      <SelectItem value="Templates">Templates</SelectItem>
                      <SelectItem value="Projects">Projects</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Study Guides">Study Guides</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="condition" className="text-[#0A2463]">{t('products.condition')}</Label>
                <Select value={newCondition} onValueChange={setNewCondition} required>
                  <SelectTrigger className="mt-2 border-[#D0E1F9] rounded-xl">
                    <SelectValue placeholder={t('products.selectCondition')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Like New">{t('products.likeNew')}</SelectItem>
                    <SelectItem value="Used - Good">{t('products.used')}</SelectItem>
                    <SelectItem value="Digital">{t('products.digital')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imageUrl" className="text-[#0A2463]">{t('products.imageUrl')}</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="mt-2 border-[#D0E1F9] rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0A2463] to-[#1976D2] hover:from-[#1976D2] hover:to-[#0A2463] text-white rounded-xl py-6"
              >
                {t('products.publish')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

