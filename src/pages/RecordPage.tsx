import RecorderWidget from '../features/record/RecorderWidget';

export default function RecordPage() {
  return (
    <div className="record-page">
      <h1>Practice Your Pronunciation</h1>
      <p>Record yourself saying a word or sentence, and listen to the result.</p>
      <RecorderWidget />
    </div>
  );
}
