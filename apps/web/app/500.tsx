export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GlobalError() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">500</p>
        <h1 className="text-3xl font-extrabold">Something went wrong</h1>
        <p className="text-gray-500">Please try again or contact support.</p>
      </div>
    </div>
  );
}
