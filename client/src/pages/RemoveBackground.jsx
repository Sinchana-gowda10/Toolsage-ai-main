import React, { useState } from 'react'
import { UploadCloud, Image as ImageIcon, Trash2 } from 'lucide-react'

const RemoveBackground = () => {
  const [file, setFile] = useState(null)
  const [processedUrl, setProcessedUrl] = useState('')

  const onFileChange = (e) => {
    setFile(e.target.files[0] || null)
    setProcessedUrl('')
  }

  const onRemoveBackground = async (e) => {
    e.preventDefault()
    if (!file) return
    // TODO: call your background-removal API with `file`
    setProcessedUrl(
      'https://via.placeholder.com/400x300.png?text=Background+Removed'
    )
  }

  return (
    <div className="flex items-stretch gap-6 p-6 bg-gray-50 h-[50vh]">
      {/* Left Panel (1/2 width, half-screen height) */}
      <form
        onSubmit={onRemoveBackground}
        className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="text-orange-500" />
          <h2 className="text-lg font-semibold">Background Removal</h2>
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
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports JPG, PNG, and other image formats
        </p>

        <button
          type="submit"
          className="mt-auto w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600
                     text-white text-sm py-2 rounded-md flex items-center justify-center gap-2 transition-shadow"
        >
          <UploadCloud className="w-4 h-4" />
          Remove background
        </button>
      </form>

      {/* Right Panel (1/2 width, half-screen height) */}
      <div className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="text-orange-500" />
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
              <ImageIcon className="w-8 h-8" />
              <p>Upload an image and click “Remove Background” to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
