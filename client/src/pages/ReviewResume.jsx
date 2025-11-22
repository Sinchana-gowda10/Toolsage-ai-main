import React, { useState } from 'react'
import { Sparkles, FileText } from 'lucide-react'

const ReviewResume = () => {
  const [resumeFile, setResumeFile] = useState(null)
  const [analysisResult, setAnalysisResult] = useState('')

  const onFileChange = (e) => {
    setResumeFile(e.target.files[0] || null)
    setAnalysisResult('')
  }

  const onReviewResume = async (e) => {
    e.preventDefault()
    if (!resumeFile) return
    // TODO: send `resumeFile` to your review API
    setAnalysisResult('Your resume looks great! Here are some suggestions…')
  }

  return (
    <div className="flex items-stretch gap-6 p-6 bg-gray-50 h-[50vh]">
      {/* Left Panel (half-screen height) */}
      <form
        onSubmit={onReviewResume}
        className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-green-500" />
          <h2 className="text-lg font-semibold">Resume Review</h2>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Resume
        </label>
        <input
          type="file"
          accept=".pdf,image/png,image/jpeg"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports PDF, PNG, JPG formats
        </p>

        <button
          type="submit"
          className="mt-auto w-full bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500
                     text-white text-sm py-2 rounded-md flex items-center justify-center gap-2 transition-shadow"
        >
          <FileText className="w-4 h-4" />
          Review Resume
        </button>
      </form>

      {/* Right Panel (half-screen height) */}
      <div className="w-1/2 h-full bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-green-500" />
          <h2 className="text-lg font-semibold">Analysis Results</h2>
        </div>

        <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
          {analysisResult ? (
            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {analysisResult}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-8 h-8" />
              <p>Upload your resume and click “Review Resume” to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewResume
