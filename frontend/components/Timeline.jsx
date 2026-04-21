export default function Timeline({ updates }) {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-slate-900 mb-5">
        Progress Timeline
      </h3>

      {updates.length === 0 ? (
        <p className="text-slate-500">No updates yet.</p>
      ) : (
        <div className="relative border-l-2 border-blue-200 pl-6 space-y-5">
          {updates
            .slice()
            .reverse()
            .map((update, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow"></div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-slate-800 font-medium">{update.text}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(update.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
