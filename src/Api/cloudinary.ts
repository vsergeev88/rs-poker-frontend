const fetchUrl = 'https://api.cloudinary.com/v1_1/demo/image/upload';
const outputUrl = 'https://res.cloudinary.com/demo/image/upload/c_fill,h_50,w_50/';

export const uploadAvatar = async (selectedFile: undefined | File): Promise<string> => {
  const formData = new FormData();
  let publicId = '';

  formData.append('file', selectedFile as Blob);
  formData.append('upload_preset', 'docs_upload_example_us_preset');

  await fetch(fetchUrl, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      publicId = JSON.parse(data).public_id as string;
    });

  return `${outputUrl}${publicId}`;
};
