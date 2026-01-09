export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">404</p>
        <h1 className="text-3xl font-extrabold">Page not found</h1>
        <p className="text-gray-500">Please check the URL or go back to the homepage.</p>
      </div>
    </div>
  );
}
