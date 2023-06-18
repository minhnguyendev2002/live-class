import React, {useMemo, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

StreamPlayer.propTypes = {
    uid: PropTypes.number.isRequired
}

export default function StreamPlayer(props) {
    const {uid, isLocal, videoTrack, audioTrack, muteVideo, muteAudio, showInfo, rtcClient} = props

    useMemo(() => {
        if (videoTrack != null) {
            if (muteVideo === true) {
                videoTrack.stop()
            } else if (muteVideo === false) {
                videoTrack.play(`stream-player-${uid}`)
            }
        }
        //eslint-disable-next-line
    }, [muteVideo, videoTrack])

    useMemo(() => {
        if (videoTrack != null) {
            if (muteAudio === true) {
                audioTrack.stop()
                audioTrack.setPlaybackDeviceVolume(0);
            } else if (muteAudio === false && audioTrack) {
                audioTrack.play()
                audioTrack.setPlaybackDeviceVolume(0);
            }
        }
        //eslint-disable-next-line
    }, [muteAudio, audioTrack])

    useEffect(() => {
        if (videoTrack != null) {
            if (muteVideo === true) {
                videoTrack.stop()
            } else if (muteVideo === false) {
                videoTrack.play(`stream-player-${uid}`)
            }
        }
    }, [muteVideo, videoTrack])

    const [state, setState] = useState({
        accessDelay: 0,
        fps: 0,
        resolution: 0
    })

    const analytics = useMemo(() => state, [state])

    useEffect(() => {
        const timer = setInterval(() => {
            if (isLocal) {
                const stats = rtcClient.getLocalVideoStats()
                const width = stats.captureResolutionWidth
                const height = stats.captureResolutionHeight
                const fps = stats.captureFrameRate
                setState({
                    accessDelay: `${stats.accessDelay ? stats.accessDelay : 0}`,
                    resolution: `${width}x${height}`,
                    fps: `${fps || 0}`
                })
            } else {
                const stats = rtcClient.getRemoteVideoStats()
                const width = stats.captureResolutionWidth
                const height = stats.captureResolutionHeight
                const fps = stats.captureFrameRate
                setState({
                    accessDelay: `${stats.accessDelay ? stats.accessDelay : 0}`,
                    resolution: `${width}x${height}`,
                    fps: `${fps || 0}`
                })
            }
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [isLocal, rtcClient])

    return (
        <div
            className={'stream-player'}
            id={`stream-player-${uid}`}
        >
            {props.children}
        </div>
    )
}
