clear all;

image = imread ("/home/eric/Downloads/Projects/sims/9ccb543.jpg");
red = double(image(:,:,1));
green= double(image(:,:,2));
blue = double(image(:,:,3));

[x, y, z] =  size(image);
image2 =  uint8(zeros(x, y));

for i=1:x
  for j=1:y
      image2(i, j) = uint8((red(i, j) + green(i, j) + blue(i, j))/3);
  endfor
endfor


subplot(1, 2, 1), imshow (image), title('Original'); 
subplot(1, 2, 2), imshow (image2), title('Resultado');