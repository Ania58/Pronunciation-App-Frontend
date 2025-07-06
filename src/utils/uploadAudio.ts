export async function uploadAudio(file: File): Promise<string> {
  const sigRes = await fetch(`${import.meta.env.VITE_API_URL}/cloudinary/signature`);
  const data = await sigRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', data.apiKey);
  formData.append('timestamp', data.timestamp);
  formData.append('signature', data.signature);
  formData.append('public_id', data.publicId);
  formData.append('folder', data.folder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${data.cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  const uploadData = await uploadRes.json();

  if (!uploadData.secure_url) throw new Error('Upload failed');
  return uploadData.secure_url;
}

