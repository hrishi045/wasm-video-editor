import React from 'react'
import PropTypes from 'prop-types'

const VideoUploadForm = ({ onUpload }) => (
  <form
    className="flex text-gray-200 hover:pointer"
    onSubmit={(e) => {
      if (e.target.file.files.length > 0) {
        onUpload(e.target.file.files[0])
      }
      e.preventDefault()
    }}
  >
    <label className="flex-1 px-6 py-4 text-sm font-semibold bg-gray-800 cursor-pointer hover:bg-gray-900">
      <input className="hidden" name="file" type="file" />
      Select file to upload
    </label>
    <input
      className="px-6 py-4 text-xs font-bold uppercase bg-gray-800 border-l-4 border-gray-700 cursor-pointer hover:bg-gray-900 focus:outline-none"
      type="submit"
      value="Upload"
    />
  </form>
)

VideoUploadForm.propTypes = {
  onUpload: PropTypes.func,
}

export default VideoUploadForm
