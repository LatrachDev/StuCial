import { useState } from 'react';
import { AlertCircle, Send, Upload } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from '../contexts/LanguageContext';

export function ReclamationPage() {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `
Reclamation from: ${userEmail}
Category: ${category}
Subject: ${subject}

Description:
${description}

${file ? `Attachment: ${file.name}` : 'No attachment'}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:seo.stucial@gmail.com?subject=${encodeURIComponent(`Reclamation: ${subject}`)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setUserEmail('');
      setSubject('');
      setCategory('');
      setDescription('');
      setFile(null);
      setSubmitted(false);
    }, 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0A2463] mb-2">{t('reclamation.title')}</h1>
          <p className="text-[#5A6C7D]">{t('reclamation.subtitle')}</p>
        </div>

        {submitted && (
          <Alert className="mb-6 border-green-200 bg-green-50 rounded-2xl">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t('reclamation.success')}
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-8 rounded-2xl border-[#D0E1F9]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="userEmail" className="text-[#0A2463]">{t('reclamation.yourEmail')}</Label>
              <Input
                id="userEmail"
                type="email"
                placeholder={t('reclamation.emailPlaceholder')}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="mt-2 border-[#D0E1F9] rounded-xl"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-[#0A2463]">{t('reclamation.category')}</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="mt-2 border-[#D0E1F9] rounded-xl">
                  <SelectValue placeholder={t('reclamation.selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic Issue</SelectItem>
                  <SelectItem value="administrative">Administrative Issue</SelectItem>
                  <SelectItem value="technical">Technical Problem</SelectItem>
                  <SelectItem value="scholarship">Scholarship Related</SelectItem>
                  <SelectItem value="exam">Exam Related</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subject" className="text-[#0A2463]">{t('reclamation.subject')}</Label>
              <Input
                id="subject"
                placeholder={t('reclamation.subjectPlaceholder')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 border-[#D0E1F9] rounded-xl"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-[#0A2463]">{t('reclamation.description')}</Label>
              <Textarea
                id="description"
                placeholder={t('reclamation.descriptionPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 border-[#D0E1F9] rounded-xl min-h-[150px]"
                required
              />
              <p className="mt-2 text-sm text-[#5A6C7D]">
                {t('reclamation.descriptionHelp')}
              </p>
            </div>

            <div>
              <Label htmlFor="file" className="text-[#0A2463]">{t('reclamation.attachment')}</Label>
              <div className="mt-2">
                <label
                  htmlFor="file"
                  className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-[#D0E1F9] rounded-xl cursor-pointer hover:border-[#3E92CC] hover:bg-[#F8FBFF] transition-all"
                >
                  <Upload className="w-5 h-5 text-[#5A6C7D]" />
                  <span className="text-[#5A6C7D]">
                    {file ? file.name : t('reclamation.uploadFile')}
                  </span>
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
            </div>

            <Alert className="border-[#3E92CC]/20 bg-[#F0F7FF] rounded-2xl">
              <AlertCircle className="h-4 w-4 text-[#3E92CC]" />
              <AlertDescription className="text-[#5A6C7D]">
                {t('reclamation.responseTime')}
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0A2463] to-[#1976D2] hover:from-[#1976D2] hover:to-[#0A2463] text-white rounded-xl py-6"
            >
              <Send className="w-5 h-5 mr-2" />
              {t('reclamation.submit')}
            </Button>
          </form>
        </Card>

        <div className="mt-8">
          <Card className="p-6 rounded-2xl border-[#D0E1F9]">
            <h3 className="text-[#0A2463] mb-2">📧 {t('reclamation.emailSupport')}</h3>
            <p className="text-sm text-[#5A6C7D] mb-2">seo.stucial@gmail.com</p>
            <p className="text-xs text-[#5A6C7D]">{t('reclamation.forGeneralInquiries')}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

