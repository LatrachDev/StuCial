import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useLanguage } from '../contexts/LanguageContext';

export function ProfilePage() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Ahmed Benali',
    email: 'ahmed.benali@university.ma',
    university: 'Mohammed V University',
    city: 'Rabat',
    bio: 'Computer Science student passionate about web development and AI. Always eager to learn and collaborate with fellow students.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    joinedDate: 'January 2024'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[#0E2F76] mb-2">{t('profile.title')}</h1>
        </div>

        <Card className="p-8 rounded-2xl border-[#AAC0E1] bg-white">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-[#AAC0E1] text-[#0E2F76] text-2xl">
                  {profile.fullName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl text-[#0E2F76] mb-1">{profile.fullName}</h2>
                <p className="text-[#5A6C7D] mb-1">{profile.email}</p>
                <p className="text-sm text-[#5A6C7D]">{t('profile.joinedDate')}: {profile.joinedDate}</p>
              </div>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t('profile.saveChanges')}
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  {t('profile.editProfile')}
                </>
              )}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-[#0E2F76]">{t('profile.fullName')}</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 border-[#AAC0E1] rounded-xl disabled:opacity-70"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#0E2F76]">{t('profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 border-[#AAC0E1] rounded-xl disabled:opacity-70"
                />
              </div>
              <div>
                <Label htmlFor="university" className="text-[#0E2F76]">{t('profile.university')}</Label>
                <Input
                  id="university"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 border-[#AAC0E1] rounded-xl disabled:opacity-70"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-[#0E2F76]">{t('profile.city')}</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2 border-[#AAC0E1] rounded-xl disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-[#0E2F76]">{t('profile.bio')}</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                className="mt-2 border-[#AAC0E1] rounded-xl min-h-[100px] disabled:opacity-70"
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#AAC0E1]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border-[#AAC0E1] bg-[#F5FEFF] text-center">
                <h3 className="text-2xl text-[#0E2F76] mb-1">12</h3>
                <p className="text-sm text-[#5A6C7D]">{t('profile.myPosts')}</p>
              </Card>
              <Card className="p-6 rounded-2xl border-[#AAC0E1] bg-[#F5FEFF] text-center">
                <h3 className="text-2xl text-[#0E2F76] mb-1">3</h3>
                <p className="text-sm text-[#5A6C7D]">{t('profile.myServices')}</p>
              </Card>
              <Card className="p-6 rounded-2xl border-[#AAC0E1] bg-[#F5FEFF] text-center">
                <h3 className="text-2xl text-[#0E2F76] mb-1">5</h3>
                <p className="text-sm text-[#5A6C7D]">{t('profile.myProducts')}</p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

