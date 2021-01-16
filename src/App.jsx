import React, { useState } from 'react'
import VideoEditor from './VideoEditor'
import VideoUploadForm from './VideoUploadForm'

const App = () => {
  const [video, setVideo] = useState(
    'http://techslides.com/demos/sample-videos/small.mp4'
  )

  return (
    <div className="w-1/2 mx-auto mt-12 overflow-hidden rounded-lg shadow ">
      <VideoEditor video={video} />
      {video === null && (
        <VideoUploadForm onUpload={(videoData) => setVideo(videoData)} />
      )}
    </div>
  )
}

export default App
