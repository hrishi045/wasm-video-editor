import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import React, { useEffect, useRef, useState } from 'react'
import VideoEditor from './VideoEditor'
import VideoUploadForm from './VideoUploadForm'

const App = () => {
  const [video, setVideo] = useState(null)
  const ffmpeg = useRef(null)

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

  const handleTrim = async (start, end, duration) => {
    console.log(typeof start, typeof end, typeof duration)
    console.log(
      start,
      percToFfmpegTime(start, duration),
      end,
      percToFfmpegTime(end, duration),
      duration
    )

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
    setVideo(new Blob([data.buffer], { type: 'video/mp4' }))
  }

  return (
    <div className="w-1/2 mx-auto mt-12 overflow-hidden rounded-lg shadow ">
      <VideoEditor video={video} onTrim={handleTrim} />
      {video === null && (
        <VideoUploadForm onUpload={(videoData) => setVideo(videoData)} />
      )}
    </div>
  )
}

export default App
