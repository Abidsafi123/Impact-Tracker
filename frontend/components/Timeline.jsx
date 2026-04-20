export default function Timeline({ updates }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        Progress Timeline
      </h3>

      {updates.length === 0 ? (
        <p className="text-slate-500">No updates yet.</p>
      ) : (
        <div className="space-y-3">
          {updates
            .slice()
            .reverse()
            .map((update, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-100 rounded-xl p-4"
              >
                <p className="text-slate-800 font-medium">{update.text}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(update.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}