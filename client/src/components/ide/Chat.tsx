import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Hash
} from 'lucide-react';

interface ChatMessage {
  id: string;
  author: string;
  initials: string;
  content: string;
  timestamp: string;
  type: 'message' | 'system';
  color: string;
}

const messages: ChatMessage[] = [
  {
    id: '1',
    author: 'System',
    initials: 'SY',
    content: 'Sarah Chen joined the session',
    timestamp: '14:30',
    type: 'system',
    color: 'muted-foreground'
  },
  {
    id: '2',
    author: 'Sarah',
    initials: 'SC',
    content: 'Hey everyone! Ready to review the TodoList component?',
    timestamp: '14:31',
    type: 'message',
    color: 'presence-2'
  },
  {
    id: '3',
    author: 'Mike',
    initials: 'MJ',
    content: 'Yes! I noticed we have a key prop warning in the console',
    timestamp: '14:32',
    type: 'message',
    color: 'presence-3'
  },
  {
    id: '4',
    author: 'You',
    initials: 'YU',
    content: 'Good catch! Let me fix that in the map function',
    timestamp: '14:32',
    type: 'message',
    color: 'presence-1'
  },
  {
    id: '5',
    author: 'Alex',
    initials: 'AR',
    content: 'Should we also add some error handling for the API calls?',
    timestamp: '14:33',
    type: 'message',
    color: 'presence-4'
  },
  {
    id: '6',
    author: 'Sarah',
    initials: 'SC',
    content: 'Great idea! We can use a try-catch block in the useTodos hook',
    timestamp: '14:34',
    type: 'message',
    color: 'presence-2'
  }
];

export function Chat() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      // Handle send logic here
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Team Chat</span>
            <Badge variant="secondary" className="text-xs">
              <Hash className="h-3 w-3 mr-1" />
              general
            </Badge>
          </div>
          
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            {msg.type === 'system' ? (
              <div className="text-center">
                <Badge variant="secondary" className="text-xs text-muted-foreground">
                  {msg.content}
                </Badge>
              </div>
            ) : (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className={`bg-${msg.color} text-white text-xs font-medium`}>
                    {msg.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {msg.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                •••
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground italic">
                Mike is typing...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-20 resize-none"
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            size="sm"
            className="h-9 w-9 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>⌘K for shortcuts</span>
        </div>
      </div>
    </div>
  );
}