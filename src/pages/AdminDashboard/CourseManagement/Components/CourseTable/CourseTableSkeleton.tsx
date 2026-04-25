const CourseTableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-border animate-pulse">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 py-3 border-b border-border"
          >
            {Array.from({ length: 6 }).map((__, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTableSkeleton;
