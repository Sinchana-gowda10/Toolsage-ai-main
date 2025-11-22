import React, { useState } from 'react'
import { Sparkles, ImagePlus, Image as ImageIcon } from 'lucide-react'

const GenerateImages = () => {
  const ImageStyles = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    '3D style',
    'Portrait style',
  ]

  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [isPublic, setIsPublic] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // TODO: call your image-generation API here
    setGeneratedUrl('https://via.placeholder.com/800x600.png?text=Generated+Image')
  }

  return (
    <div className="flex items-stretch gap-6 p-6 bg-gray-50">
      {/* Left Panel (1/2 width) */}
      <form
        onSubmit={onSubmitHandler}
        className="w-1/2 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-green-500" />
          <h2 className="text-lg font-semibold">AI Image Generator</h2>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Describe Your Image
        </label>
        <textarea
          rows={4}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-green-200"
          placeholder="Describe what you want to see in the image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />

        <p className="mt-4 text-sm font-medium text-gray-700">Style</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ImageStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`px-3 py-1 text-sm rounded-full border transition-all ${
                selectedStyle === style
                  ? 'bg-green-100 text-green-700 border-green-400'
                  : 'text-gray-600 border-gray-300'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <label className="mt-4 inline-flex items-center cursor-pointer">
          <span className="mr-2 text-sm text-gray-700">Make this image Public</span>
          <div
            onClick={() => setIsPublic(!isPublic)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              isPublic ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute w-5 h-5 bg-white rounded-full top-0 transition-transform ${
                isPublic ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-sm py-2 rounded-md flex items-center justify-center gap-2 transition-shadow"
        >
          <ImagePlus className="w-4 h-4" />
          Generate Image
        </button>
      </form>

      {/* Right Panel (1/2 width) */}
      <div className="w-1/2 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="text-green-500" />
          <h2 className="text-lg font-semibold">Generated image</h2>
        </div>

        <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
          {generatedUrl ? (
            <img
              src={generatedUrl}
              alt="Generated"
              className="w-full h-auto rounded-md object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <ImageIcon className="w-8 h-8" />
              <p>Enter a prompt and click “Generate Image” to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
