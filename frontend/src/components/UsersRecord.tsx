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
      <TableCaption>A list of recorded user interactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">User ID</TableHead>
          <TableHead className="">User</TableHead>
          <TableHead>Scrolled</TableHead>
          <TableHead className="">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell className="">{user.userId}</TableCell>
              <TableCell className="flex flex-row items-center gap-4">
                <UserAvatar
                  src={user.avatar}
                  alt="User Avatar"
                  username={user.userName}
                />
                {user.userName}
              </TableCell>
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
          <TableCell>Total</TableCell>
          <TableCell>{users.length}</TableCell>
          <TableCell>Scrolled To Image</TableCell>
          <TableCell colSpan={3}>
            {users.filter((user) => user.scrolledToImage === true).length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
