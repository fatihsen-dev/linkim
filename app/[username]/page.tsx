export default function page({ params: { username } }: { params: { username: string } }) {
   return <div>{username}</div>;
}
