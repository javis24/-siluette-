import Link from 'next/link';

interface Props {
  title: string;
  icon: string;
  href: string;
}

export default function DashboardCard({ title, icon, href }: Props) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
    </Link>
  );
}
