import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { UserAvatar } from './UserAvatar';

type User = {
  userId: string;
  userName: string;
  scrolledToImage: boolean;
  accessedAt: string;
  avatar: string;
};

export function UsersRecord({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>A list of recorder user interactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">User ID</TableHead>
          <TableHead className="">Avatar</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Scrolled</TableHead>
          <TableHead className="">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="">{user.userId}</TableCell>
              <TableCell className="">
                <UserAvatar
                  src={user.avatar}
                  alt="User Avatar"
                  username={user.userName}
                />
              </TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell
                className={`${
                  user.scrolledToImage ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {user.scrolledToImage.toString()}
              </TableCell>
              <TableCell>
                {new Date(user.accessedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold">
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
