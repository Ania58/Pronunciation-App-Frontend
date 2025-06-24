//import React from 'react';
import { useRecorder } from '../../hooks/useRecorder';

export default function RecorderWidget() {
  const { isRecording, audioUrl, startRecording, stopRecording } = useRecorder();

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop' : 'Start'} Recording
      </button>

      {audioUrl && (
        <div>
          <p>Preview:</p>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}
