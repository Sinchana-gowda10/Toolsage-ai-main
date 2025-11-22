import React, { useState } from 'react'
import { Sparkles, Scissors } from 'lucide-react'

const RemoveObject = () => {
  const [file, setFile] = useState(null)
  const [objectDesc, setObjectDesc] = useState('')
  const [processedUrl, setProcessedUrl] = useState('')

  const onFileChange = (e) => {
    setFile(e.target.files[0] || null)
    setProcessedUrl('')
  }

  const onRemoveObject = async (e) => {
    e.preventDefault()
    if (!file || !objectDesc) return
    // TODO: call your object-removal API with `file` and `objectDesc`
    setProcessedUrl(
      'https://via.placeholder.com/400x300.png?text=Object+Removed'
    )
  }

  return (
    <div className="flex items-stretch gap-6 p-6 bg-gray-50 h-[50vh]">
      {/* Left Panel (half-screen height) */}
      <form
        onSubmit={onRemoveObject}
        className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-blue-500" />
          <h2 className="text-lg font-semibold">Object Removal</h2>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
          required
        />

        <label className="mt-6 block text-sm font-medium text-gray-700 mb-1">
          Describe object to remove
        </label>
        <textarea
          rows={3}
          value={objectDesc}
          onChange={(e) => setObjectDesc(e.target.value)}
          placeholder="e.g., car in background, tree from the image"
          className="w-full p-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Be specific about what you want to remove
        </p>

        <br />
        <button
          type="submit"
          className="mt-auto w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm py-2 rounded-md flex items-center justify-center gap-2 transition-shadow"
        >
          <Scissors className="w-4 h-4" />
          Remove object
        </button>
      </form>

      {/* Right Panel (half-screen height) */}
      <div className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="text-blue-500" />
          <h2 className="text-lg font-semibold">Processed Image</h2>
        </div>

        <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
          {processedUrl ? (
            <img
              src={processedUrl}
              alt="Processed"
              className="w-full h-auto rounded-md object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Scissors className="w-8 h-8" />
              <p>Upload an image and describe what to remove</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveObject
