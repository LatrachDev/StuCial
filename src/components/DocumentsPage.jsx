import { useState } from 'react';
import { Search, Filter, Download, FileText, File, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import docspdf from '../assets/docspdf.pdf';

const documents = [
  {
    id: 1,
    title: 'T.D. de Probabilités : SERIE 1',
    type: 'Document',
    subject: 'General',
    semester: 'All',
    format: 'PDF',
    size: 'N/A',
    downloads: 0,
    uploadedBy: 'System',
    date: new Date().toISOString().split('T')[0],
    pdfUrl: docspdf
  }
];

export function DocumentsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedPdf, setSelectedPdf] = useState(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || doc.subject === filterSubject;
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0A2463] mb-2">{t('documents.title')}</h1>
          <p className="text-[#5A6C7D]">{t('documents.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 rounded-2xl border-[#D0E1F9] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6C7D]" />
                <Input
                  placeholder={t('documents.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#D0E1F9] rounded-xl"
                />
              </div>
            </div>

            <div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="border-[#D0E1F9] rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('documents.filterSubject')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('documents.allSubjects')}</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Economics">Economics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-[#D0E1F9] rounded-xl">
                  <FileText className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('documents.filterType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('documents.allTypes')}</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Notes">Notes</SelectItem>
                  <SelectItem value="Exercises">Exercises</SelectItem>
                  <SelectItem value="Exams">Exams</SelectItem>
                  <SelectItem value="Summary">Summary</SelectItem>
                  <SelectItem value="Lab Work">Lab Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-[#5A6C7D]">
            {t('documents.showing')} {filteredDocuments.length} {t('documents.of')} {documents.length} {t('documents.documentsText')}
          </div>
        </Card>

        {/* Documents Grid */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-5 rounded-2xl border-[#D0E1F9] hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A2463] to-[#1976D2] flex items-center justify-center flex-shrink-0">
                  <File className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-[#0A2463]">{doc.title}</h3>
                    <Badge className="bg-[#3E92CC] text-white hover:bg-[#1976D2] flex-shrink-0">
                      {doc.type}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#5A6C7D] mb-3">
                    <span>📚 {doc.subject}</span>
                    <span>📅 {doc.semester}</span>
                    <span>📄 {doc.format} • {doc.size}</span>
                    <span>⬇️ {doc.downloads} {t('documents.downloads')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#5A6C7D]">
                      {t('documents.uploadedBy')} {doc.uploadedBy} • {doc.date}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setSelectedPdf(doc.pdfUrl)}
                        className="bg-[#3E92CC] hover:bg-[#1976D2] text-white rounded-xl"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = doc.pdfUrl;
                          link.download = 'document.pdf';
                          link.click();
                        }}
                        className="bg-[#0A2463] hover:bg-[#1976D2] text-white rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('documents.download')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* PDF Viewer Dialog */}
      <Dialog open={selectedPdf !== null} onOpenChange={(open) => !open && setSelectedPdf(null)}>
        <DialogContent className="max-w-[95vw] w-full rounded-2xl max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl text-[#0A2463]">Document Viewer</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[calc(95vh-120px)] overflow-auto">
            <iframe
              src={selectedPdf || ''}
              className="w-full h-full border-0"
              title="PDF Viewer"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
