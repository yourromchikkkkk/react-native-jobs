const MOCK_IMAGE_URL =
  'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg';

export const checkImageURL = (url: string): string => {
  if (!url) return MOCK_IMAGE_URL;
  else {
    const pattern = new RegExp(
      '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
      'i'
    );
    return pattern.test(url) ? url : MOCK_IMAGE_URL;
  }
};
