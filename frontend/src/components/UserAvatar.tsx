import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function UserAvatar({
  src,
  alt,
  className = '',
  username = 'Mr Robot'
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  username?: string;
}) {
  const fallbackInitials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <Avatar className={cn('border-2', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackInitials}</AvatarFallback>
    </Avatar>
  );
}
