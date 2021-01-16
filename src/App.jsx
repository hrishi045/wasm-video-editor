import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-video-renderer'
import VideoEditor from './VideoEditor'
import VideoUploadForm from './VideoUploadForm'

const App = () => {
  const [video, setVideo] = useState(null)
  const ffmpeg = useRef(null)
  const [out, setOut] = useState(null)

  useEffect(() => {
    async function x() {
      ffmpeg.current = await createFFmpeg({ log: true })
    }
    x()
  }, [])

  const percToFfmpegTime = (perc, duration) => {
    const seconds = (duration * perc) / 100
    // return Math.round((seconds + Number.EPSILON) * 100) / 100
    return seconds.toFixed(2)
  }

  const handleUpload = (videoData) => {
    setVideo(videoData)
    setOut(null)
  }

  const handleTrim = async (start, end, duration) => {
    const { name } = video
    await ffmpeg.current.load()
    ffmpeg.current.FS('writeFile', name, await fetchFile(video))
    await ffmpeg.current.run(
      '-i',
      name,
      '-t',
      percToFfmpegTime(end, duration),
      '-ss',
      percToFfmpegTime(start, duration),
      'output.mp4'
    )
    const data = ffmpeg.current.FS('readFile', 'output.mp4')
    setOut(new Blob([data.buffer], { type: 'video/mp4' }))
    setVideo(null)
  }

  return (
    <div className="max-w-3xl mx-2 mt-12 overflow-hidden rounded-lg shadow sm:mx-auto ">
      {out === null && <VideoEditor video={video} onTrim={handleTrim} />}
      {video === null && <VideoUploadForm onUpload={handleUpload} />}
      {out === null || (
        <>
          <div className="VideoEditor">
            <Video src={URL.createObjectURL(out)} controls>
              {(videoPlayer) => <>{videoPlayer}</>}
            </Video>
          </div>
          <div>
            <a
              className="block w-full p-4 text-sm font-semibold text-center text-gray-300 capitalize bg-gray-800 cursor-pointer focus:outline-none hover:bg-gray-900"
              href={URL.createObjectURL(out)}
              download
            >
              Download
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default App
