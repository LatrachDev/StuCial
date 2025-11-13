import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Send, Plus, Trash2, X } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const initialPosts = [
  {
    id: 1,
    author: 'Yasmine El Mansouri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine',
    time: '2 hours ago',
    content: '📚 Just finished my final project presentation! Thanks to everyone who helped me prepare. The collaboration in this community is amazing! 🎉',
    likes: 24,
    comments: [],
    type: 'post'
  },
  {
    id: 2,
    author: 'University News',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=News',
    time: '4 hours ago',
    content: '🎓 Important Announcement: The scholarship application deadline has been extended to December 15th. Make sure to submit all required documents on time!',
    likes: 156,
    comments: [],
    type: 'news',
    tag: 'Official'
  },
  {
    id: 3,
    author: 'Ahmed Benali',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    time: '6 hours ago',
    content: '🤝 Looking for team members for the upcoming hackathon! We need 1 backend developer and 1 designer. DM me if interested!',
    likes: 45,
    comments: [],
    type: 'post'
  },
];

const contacts = [
  { id: 1, name: 'Yasmine El Mansouri', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine' },
  { id: 2, name: 'Ahmed Benali', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed' },
  { id: 3, name: 'Fatima Zahra', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima' },
  { id: 4, name: 'Omar Idrissi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },
];

export function Feed() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState(initialPosts);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostImagePreview, setNewPostImagePreview] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [shareDialogOpen, setShareDialogOpen] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const fileInputRef = useRef(null);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPostImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !newPostImage) return;

    const newPost = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      time: t('dashboard.justNow'),
      content: newPostContent,
      image: newPostImagePreview || undefined,
      likes: 0,
      comments: [],
      type: 'post',
      isOwn: true
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
    setNewPostImagePreview(null);
    setCreatePostOpen(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handlePublishComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      text: commentText,
      likes: 0,
      liked: false
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    }));

    setNewComment({ ...newComment, [postId]: '' });
  };

  const handleShareToFriend = () => {
    if (selectedFriend && shareDialogOpen) {
      // This would integrate with the messaging system
      console.log(`Sharing post ${shareDialogOpen.id} to friend ${selectedFriend}`);
      setShareDialogOpen(null);
      setSelectedFriend(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Floating Create Post Button */}
      <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#0E2F76] to-[#AAC0E1] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center z-50"
            aria-label="Create Post"
          >
            <Plus className="w-8 h-8" />
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0E2F76]">{t('dashboard.createPost')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder={t('dashboard.writePost')}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="border-[#AAC0E1] rounded-xl resize-none min-h-[120px]"
            />
            
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-[#AAC0E1] text-[#0E2F76] hover:bg-[#F5FEFF] rounded-xl"
              >
                {t('dashboard.uploadImage')}
              </Button>
              
              {newPostImagePreview && (
                <div className="mt-3 relative">
                  <img src={newPostImagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                  <button
                    onClick={() => {
                      setNewPostImage(null);
                      setNewPostImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setCreatePostOpen(false);
                  setNewPostContent('');
                  setNewPostImage(null);
                  setNewPostImagePreview(null);
                }}
                variant="outline"
                className="flex-1 border-[#AAC0E1] text-[#0E2F76] rounded-xl"
              >
                {t('dashboard.cancel')}
              </Button>
              <Button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim() && !newPostImage}
                className="flex-1 bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('dashboard.publish')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} className="p-5 rounded-2xl border-[#AAC0E1] hover:shadow-md transition-shadow bg-white">
          <div className="flex items-start gap-3 mb-4">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#0E2F76]">{post.author}</span>
                  {post.tag && (
                    <span className="px-2 py-0.5 bg-[#AAC0E1] text-white text-xs rounded-full">
                      {post.tag}
                    </span>
                  )}
                </div>
                {post.isOwn && (
                  <Button
                    onClick={() => handleDeletePost(post.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <span className="text-sm text-[#5A6C7D]">{post.time}</span>
            </div>
          </div>

          <p className="text-[#2D2D2D] mb-4 leading-relaxed">{post.content}</p>

          {post.image && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <ImageWithFallback src={post.image} alt="Post content" className="w-full h-auto" />
            </div>
          )}

          <div className="flex items-center gap-6 pt-3 border-t border-[#AAC0E1]">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-2 transition-colors ${
                post.liked ? 'text-pink-600' : 'text-[#5A6C7D] hover:text-pink-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.liked ? 'fill-pink-600' : ''}`} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(showComments === post.id ? null : post.id)}
              className="flex items-center gap-2 text-[#5A6C7D] hover:text-[#0E2F76] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.comments.length}</span>
            </button>
            <button
              onClick={() => setShareDialogOpen(post)}
              className="flex items-center gap-2 text-[#5A6C7D] hover:text-[#0E2F76] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm">{t('dashboard.share')}</span>
            </button>
          </div>

          {showComments === post.id && (
            <div className="mt-4 pt-4 border-t border-[#AAC0E1] space-y-3">
              {/* Display Comments */}
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-[#F5FEFF] rounded-xl p-3">
                      <span className="text-sm text-[#0E2F76]">{comment.author}</span>
                      <p className="text-sm text-[#2D2D2D] mt-1">{comment.text}</p>
                    </div>
                    <button
                      onClick={() => handleCommentLike(post.id, comment.id)}
                      className={`flex items-center gap-1 mt-1 ml-2 text-xs ${
                        comment.liked ? 'text-pink-600' : 'text-[#5A6C7D] hover:text-pink-600'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${comment.liked ? 'fill-pink-600' : ''}`} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add Comment */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder={t('dashboard.writeComment')}
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handlePublishComment(post.id)}
                    className="border-[#AAC0E1] rounded-xl"
                  />
                  <Button
                    onClick={() => handlePublishComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    className="bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
                  >
                    {t('dashboard.publishComment')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen !== null} onOpenChange={(open) => !open && setShareDialogOpen(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0E2F76]">{t('dashboard.sharePost')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-[#5A6C7D] text-sm">{t('dashboard.selectFriend')}</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedFriend(contact.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedFriend === contact.id
                      ? 'bg-[#AAC0E1] text-white'
                      : 'bg-[#F5FEFF] hover:bg-[#AAC0E1]/20'
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className={selectedFriend === contact.id ? 'text-white' : 'text-[#0E2F76]'}>
                    {contact.name}
                  </span>
                </button>
              ))}
            </div>
            <Button
              onClick={handleShareToFriend}
              disabled={!selectedFriend}
              className="w-full bg-[#0E2F76] hover:bg-[#1a4a9e] text-white rounded-xl"
            >
              <Send className="w-4 h-4 mr-2" />
              {t('dashboard.shareWithFriends')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

