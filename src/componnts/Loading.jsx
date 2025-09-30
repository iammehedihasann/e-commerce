import React from 'react';

function Loading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
