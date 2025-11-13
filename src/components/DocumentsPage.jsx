import { useState } from 'react';
import { Search, Filter, Download, FileText, File } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

const documents = [
  {
    id: 1,
    title: 'Algorithms and Data Structures - Complete Course',
    type: 'Course',
    subject: 'Computer Science',
    semester: 'S3',
    format: 'PDF',
    size: '5.2 MB',
    downloads: 342,
    uploadedBy: 'Ahmed Benali',
    date: '2024-11-05'
  },
  {
    id: 2,
    title: 'Linear Algebra - Chapter 1 Exercises',
    type: 'Exercises',
    subject: 'Mathematics',
    semester: 'S1',
    format: 'PDF',
    size: '1.8 MB',
    downloads: 267,
    uploadedBy: 'Yasmine El Mansouri',
    date: '2024-11-08'
  },
  {
    id: 3,
    title: 'Database Systems - Lecture Notes',
    type: 'Notes',
    subject: 'Computer Science',
    semester: 'S4',
    format: 'PDF',
    size: '3.4 MB',
    downloads: 198,
    uploadedBy: 'Fatima Zahra',
    date: '2024-11-10'
  },
  {
    id: 4,
    title: 'Thermodynamics - Summary Sheet',
    type: 'Summary',
    subject: 'Physics',
    semester: 'S2',
    format: 'PDF',
    size: '890 KB',
    downloads: 156,
    uploadedBy: 'Omar Idrissi',
    date: '2024-11-02'
  },
  {
    id: 5,
    title: 'Object-Oriented Programming - Past Exams',
    type: 'Exams',
    subject: 'Computer Science',
    semester: 'S3',
    format: 'PDF',
    size: '2.1 MB',
    downloads: 421,
    uploadedBy: 'Karim Alami',
    date: '2024-11-01'
  },
  {
    id: 6,
    title: 'Probability and Statistics - Full Notes',
    type: 'Notes',
    subject: 'Mathematics',
    semester: 'S4',
    format: 'PDF',
    size: '4.7 MB',
    downloads: 234,
    uploadedBy: 'Salma Bennani',
    date: '2024-11-09'
  },
  {
    id: 7,
    title: 'Network Security - Lab Work Solutions',
    type: 'Lab Work',
    subject: 'Computer Science',
    semester: 'S5',
    format: 'PDF',
    size: '1.5 MB',
    downloads: 89,
    uploadedBy: 'Youssef Tahiri',
    date: '2024-11-11'
  },
  {
    id: 8,
    title: 'Microeconomics - Chapter Summaries',
    type: 'Summary',
    subject: 'Economics',
    semester: 'S2',
    format: 'PDF',
    size: '2.3 MB',
    downloads: 145,
    uploadedBy: 'Nadia Fassi',
    date: '2024-11-07'
  }
];

export function DocumentsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');

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
                    <Button className="bg-[#0A2463] hover:bg-[#1976D2] text-white rounded-xl">
                      <Download className="w-4 h-4 mr-2" />
                      {t('documents.download')}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

