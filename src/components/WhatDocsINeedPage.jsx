import { useState } from 'react';
import { FileText, Clock, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';

const documentGuides = [
  {
    id: 1,
    title: 'University Enrollment',
    processingTime: '3-5 business days',
    documents: [
      'National ID Card (CIN) or Passport',
      'High School Diploma (Baccalaureate)',
      'Birth Certificate',
      '4 Recent Photos',
      'Proof of Residence'
    ],
    category: 'Enrollment'
  },
  {
    id: 2,
    title: 'Scholarship Application',
    processingTime: '2-4 weeks',
    documents: [
      'Academic Transcripts',
      'Family Income Certificate',
      'Student ID Card',
      'Bank Account Details (RIB)',
      'Motivation Letter'
    ],
    category: 'Financial Aid'
  },
  {
    id: 3,
    title: 'Internship Convention',
    processingTime: '2-3 weeks',
    documents: [
      'Internship offer letter from company',
      'Student insurance certificate',
      'Photocopy of National ID Card',
      'Current year student certificate',
      'Completed internship convention form (3 copies)',
      'Company registration documents'
    ],
    category: 'Internship'
  },
  {
    id: 4,
    title: 'Residence Permit (for international students)',
    processingTime: '6-8 weeks',
    documents: [
      'Valid passport with visa',
      'Acceptance letter from university',
      'Student certificate',
      'Proof of accommodation in Morocco',
      'Proof of financial means',
      '4 recent passport photos',
      'Medical certificate',
      'Birth certificate (translated and certified)'
    ],
    category: 'Residence'
  },
  {
    id: 5,
    title: 'Library Card',
    processingTime: '1-2 working days',
    documents: [
      'Student certificate',
      'Photocopy of National ID Card',
      'Recent passport photo',
      'Completed library registration form',
      'Proof of payment (if applicable)'
    ],
    category: 'Library'
  },
  {
    id: 6,
    title: 'Exam Re-sit Request',
    processingTime: '1 week before exam date',
    documents: [
      'Re-sit request form',
      'Medical certificate (if absence due to illness)',
      'Student certificate',
      'Photocopy of exam results',
      'Supporting documents for justified absence'
    ],
    category: 'Exams'
  },
  {
    id: 7,
    title: 'Transfer Request',
    processingTime: '4-6 weeks',
    documents: [
      'Transfer request letter',
      'Complete academic transcript',
      'Student certificate',
      'Acceptance letter from new institution (if applicable)',
      'Photocopy of National ID Card',
      'Proof of successful completion of current level'
    ],
    category: 'Transfer'
  },
  {
    id: 8,
    title: 'Certificate of Good Conduct',
    processingTime: '2-3 weeks',
    documents: [
      'Application form',
      'Photocopy of National ID Card',
      'Recent passport photo',
      'Proof of address',
      'Payment receipt (20 DH at post office)'
    ],
    category: 'Certificates'
  }
];

export function WhatDocsINeedPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = documentGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.documents.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0E2F76] mb-2">{t('whatDocs.title')}</h1>
          <p className="text-[#5A6C7D]">{t('whatDocs.subtitle')}</p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 rounded-2xl border-[#AAC0E1] mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6C7D]" />
            <Input
              placeholder={t('whatDocs.searchDocs')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 border-[#AAC0E1] rounded-xl"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="p-6 rounded-2xl border-[#AAC0E1] hover:shadow-lg transition-all bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5FEFF] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#0E2F76]" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#0E2F76]">{guide.title}</h3>
                    <Badge className="mt-1 bg-[#AAC0E1] text-white hover:bg-[#AAC0E1]">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-[#5A6C7D]">
                <Clock className="w-4 h-4" />
                <span>{t('whatDocs.processingTime')} {guide.processingTime}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm text-[#0E2F76]">{t('whatDocs.requiredDocs')}</h4>
                <ul className="space-y-2">
                  {guide.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#5A6C7D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AAC0E1] mt-1.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#5A6C7D]">No documents found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

