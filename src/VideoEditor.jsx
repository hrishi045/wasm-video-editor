import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Video from 'react-video-renderer'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import PlayButton from './svg/PlayButton'
import PauseButton from './svg/PauseButton'
import Cut from './svg/Cut'

const VideoEditor = ({ video, onTrim }) => {
  const trimData = useRef({
    start: 0,
    end: 0,
  })

  const MemoVideo = React.memo(Video)

  return (
    <div className={'overflow-hidden bg-gray-700' + (video ? '' : ' h-96')}>
      {video ? (
        <MemoVideo src={URL.createObjectURL(video)}>
          {(video, state, actions) => (
            <div className="VideoEditor">
              {video}
              <div className="divide-y-2 divide-gray-600">
                <div className="flex text-white divide-x-2 divide-gray-600">
                  <div>
                    {state.status === 'paused' ? (
                      <button
                        className="p-3 focus:outline-none hover:bg-gray-800"
                        onClick={actions.play}
                      >
                        <PlayButton />
                      </button>
                    ) : (
                      <button
                        className="p-3 focus:outline-none hover:bg-gray-800"
                        onClick={actions.pause}
                      >
                        <PauseButton />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center flex-1 px-6 py-2">
                    <Slider
                      value={(state.currentTime * 100) / state.duration}
                      onChange={(value) => {
                        actions.navigate((value * state.duration) / 100)
                      }}
                    />
                  </div>
                  {/* <button onClick={actions.requestFullScreen}>Fullscreen</button> */}
                </div>
                <div className="flex text-white divide-x-2 divide-gray-600">
                  <div className="flex">
                    <button
                      onClick={() =>
                        onTrim(
                          trimData.current.start,
                          trimData.current.end,
                          state.duration
                        )
                      }
                      className="px-3 py-2 focus:outline-none hover:bg-gray-800"
                    >
                      <Cut />
                    </button>
                  </div>
                  <div className="flex items-center flex-1 px-6 py-2">
                    <Range
                      onChange={([start, end]) => {
                        console.log([start, end])
                        trimData.current = { start, end }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </MemoVideo>
      ) : (
        <div className="p-32 text-xs font-bold text-center text-gray-400">
          Upload a video to edit
        </div>
      )}
    </div>
  )
}

VideoEditor.propTypes = {
  video: PropTypes.instanceOf(Blob),
  onTrim: PropTypes.func,
}

export default VideoEditor
