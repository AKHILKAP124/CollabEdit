import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Settings,
  Maximize2,
  Users,
  MoreVertical
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSpeaking: boolean;
  color: string;
}

const participants: Participant[] = [
  {
    id: '1',
    name: 'You',
    initials: 'YU',
    isVideoOn: true,
    isAudioOn: true,
    isSpeaking: false,
    color: 'presence-1'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    initials: 'SC',
    isVideoOn: true,
    isAudioOn: true,
    isSpeaking: true,
    color: 'presence-2'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    initials: 'MJ',
    isVideoOn: false,
    isAudioOn: true,
    isSpeaking: false,
    color: 'presence-3'
  },
  {
    id: '4',
    name: 'Alex Rivera',
    initials: 'AR',
    isVideoOn: true,
    isAudioOn: false,
    isSpeaking: false,
    color: 'presence-4'
  }
];

export function VideoCall() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Video Call</span>
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {participants.length}
            </Badge>
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 h-full">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`
                relative bg-muted/20 rounded-lg overflow-hidden group
                ${participant.isSpeaking ? `ring-2 ring-${participant.color}` : ''}
              `}
            >
              {participant.isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className={`bg-${participant.color} text-white text-lg font-medium`}>
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className={`bg-${participant.color} text-white text-lg font-medium`}>
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Participant Info */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-black/50 text-white border-0"
                >
                  {participant.name}
                </Badge>
                
                <div className="flex gap-1">
                  {!participant.isVideoOn && (
                    <div className="bg-black/50 rounded-full p-1">
                      <VideoOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {!participant.isAudioOn && (
                    <div className="bg-black/50 rounded-full p-1">
                      <MicOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Speaking Indicator */}
              {participant.isSpeaking && (
                <div className="absolute top-2 right-2">
                  <div className={`w-3 h-3 rounded-full bg-${participant.color} animate-pulse`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 border-t border-border">
        <div className="flex justify-center gap-2">
          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="sm"
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="w-10 h-10 rounded-full p-0"
          >
            {isAudioOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="sm"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="w-10 h-10 rounded-full p-0"
          >
            {isVideoOn ? (
              <Video className="h-4 w-4" />
            ) : (
              <VideoOff className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsCallActive(!isCallActive)}
            className="w-10 h-10 rounded-full p-0"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 rounded-full p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}