import { useRecorder } from '../../hooks/useRecorder';

interface RecorderWidgetProps {
  onRecordingReady?: (blob: Blob) => void;
}

export default function RecorderWidget({ onRecordingReady }: RecorderWidgetProps) {
  const { isRecording, audioUrl,  audioBlob, startRecording, stopRecording } = useRecorder();

   if (audioBlob && onRecordingReady) {
    onRecordingReady(audioBlob);
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded font-semibold shadow cursor-pointer ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {isRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
      </button>

      {audioUrl && (
        <div className="mt-6">
          <p className="mb-2 text-lg font-medium">▶️ Preview:</p>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}

