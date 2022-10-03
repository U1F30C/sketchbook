clear all;

image = imread ("/home/eric/Downloads/Projects/sims/9ccb543.jpg");
red = double(image(:,:,1));
green= double(image(:,:,2));
blue = double(image(:,:,3));

[x, y, z] =  size(image)
for i=1:x
  for j=1:y
    for k=1:z
      image2(i, j, k) = 255 - image(i, j, k);
    endfor
  endfor
endfor


subplot(1, 2, 1), imshow (image), title('Original'); 
subplot(1, 2, 2), imshow (image2), title('Resultado');

%gray