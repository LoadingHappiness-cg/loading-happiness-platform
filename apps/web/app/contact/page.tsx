export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-6">
              Let’s build stability.
            </h1>
            <p className="text-xl text-gray-600">
              Tell us what’s breaking your flow. We’ll respond with a clear, calm plan.
            </p>
          </div>
          <div className="bg-gray-50 p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
            <form className="space-y-6">
              <input
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium"
                placeholder="Full Name"
              />
              <input
                required
                type="email"
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium"
                placeholder="Work Email"
              />
              <textarea
                required
                rows={5}
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-100 font-medium"
                placeholder="Describe your challenge..."
              />
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
