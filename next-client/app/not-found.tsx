import Link from "next/dist/client/link";

export default function NotFoundPage() {
    return <div className="text-center">
      <div className="text-lg">404 - Page Not Found</div>
      <Link href="/" className="btn btn-primary">To Start Page</Link>
    </div>;
}