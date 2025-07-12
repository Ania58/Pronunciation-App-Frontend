import { useRecorder } from '../../hooks/useRecorder';
import { useTranslation } from 'react-i18next';

interface RecorderWidgetProps {
  onRecordingReady?: (blob: Blob) => void;
}

export default function RecorderWidget({ onRecordingReady }: RecorderWidgetProps) {
  const { isRecording, audioUrl,  audioBlob, startRecording, stopRecording } = useRecorder();
  const { t } = useTranslation();

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
        {isRecording ? t('⏹ stopRecording') : t('🎙 startRecording')}
      </button>

      {audioUrl && (
        <div className="mt-6">
          <p className="mb-2 text-lg font-medium">▶️ {t('preview')}:</p>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}

