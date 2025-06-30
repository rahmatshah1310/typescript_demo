export default function PostTab() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4 text-center">Getting Started</h3>
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          {/* Share Photos content */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            {/* Camera icon */}
          </div>
          <h4 className="font-medium mb-2">Share Photos</h4>
          <p className="text-gray-400 text-sm mb-4">
            When you share photos, they will appear on your profile.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
            Share your first photo
          </button>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            {/* Profile icon */}
          </div>
          <h4 className="font-medium mb-2">Add Profile Photo</h4>
          <p className="text-gray-400 text-sm mb-4">
            Add a profile photo so your friends know it's you.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
            Add profile photo
          </button>
        </div>
      </div>
    </div>
  );
}
