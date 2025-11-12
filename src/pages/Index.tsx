import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Server {
  id: number;
  name: string;
  ip: string;
  status: 'online' | 'offline';
  players: number;
  maxPlayers: number;
  version: string;
  mode: string;
}

const Index = () => {
  const [servers] = useState<Server[]>([
    {
      id: 1,
      name: 'MAIN SERVER',
      ip: 'play.server.net',
      status: 'online',
      players: 847,
      maxPlayers: 1000,
      version: '1.20.4',
      mode: 'Survival'
    },
    {
      id: 2,
      name: 'PVP ARENA',
      ip: 'pvp.server.net',
      status: 'online',
      players: 342,
      maxPlayers: 500,
      version: '1.20.4',
      mode: 'PvP'
    },
    {
      id: 3,
      name: 'CREATIVE',
      ip: 'creative.server.net',
      status: 'online',
      players: 156,
      maxPlayers: 300,
      version: '1.20.4',
      mode: 'Creative'
    },
    {
      id: 4,
      name: 'MINI GAMES',
      ip: 'games.server.net',
      status: 'offline',
      players: 0,
      maxPlayers: 500,
      version: '1.20.4',
      mode: 'MiniGames'
    }
  ]);

  const totalPlayers = servers.reduce((sum, server) => sum + server.players, 0);
  const onlineServers = servers.filter(s => s.status === 'online').length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-glow">
              GAME SERVER
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Присоединяйся к лучшему игровому сообществу
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-card/50 backdrop-blur-sm px-8 py-4 rounded-lg neon-border">
                <div className="text-4xl font-bold text-primary">{totalPlayers}</div>
                <div className="text-sm text-muted-foreground mt-1">Игроков онлайн</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm px-8 py-4 rounded-lg neon-border">
                <div className="text-4xl font-bold text-secondary">{onlineServers}</div>
                <div className="text-sm text-muted-foreground mt-1">Активных серверов</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm px-8 py-4 rounded-lg neon-border">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Поддержка</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-8 neon-glow">
              НАШИ СЕРВЕРЫ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {servers.map((server, index) => (
                <Card 
                  key={server.id} 
                  className={`bg-card/70 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:neon-box p-6 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">{server.name}</h3>
                      <Badge 
                        variant={server.status === 'online' ? 'default' : 'destructive'}
                        className={server.status === 'online' ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {server.status === 'online' ? 'ONLINE' : 'OFFLINE'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Режим</div>
                      <div className="text-lg font-semibold text-secondary">{server.mode}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Игроки:</span>
                      <span className="text-lg font-semibold">
                        <span className="text-primary">{server.players}</span>
                        <span className="text-muted-foreground"> / {server.maxPlayers}</span>
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(server.players / server.maxPlayers) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Версия:</span>
                      <span className="text-sm font-mono text-accent">{server.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 mb-4">
                    <Icon name="Server" size={16} className="text-primary" />
                    <code className="flex-1 text-sm font-mono text-foreground">{server.ip}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(server.ip)}
                      className="hover:bg-primary/20 hover:text-primary"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold neon-border"
                    disabled={server.status === 'offline'}
                  >
                    <Icon name="Play" size={18} className="mr-2" />
                    {server.status === 'online' ? 'ПОДКЛЮЧИТЬСЯ' : 'НЕДОСТУПЕН'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-secondary/30 p-8 max-w-2xl mx-auto">
              <Icon name="Zap" size={48} className="mx-auto mb-4 text-accent" />
              <h3 className="text-3xl font-bold mb-4 text-secondary">Готов начать?</h3>
              <p className="text-muted-foreground mb-6">
                Скопируй IP любого сервера и подключайся прямо сейчас!
              </p>
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold neon-border"
              >
                <Icon name="Users" size={20} className="mr-2" />
                ПРИСОЕДИНИТЬСЯ К СООБЩЕСТВУ
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
