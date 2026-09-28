clc;
points = 50
U = V = linspace (-10, 10, points)';
[u, v] = meshgrid (U, V);
location = [10, 10, 10];
r = 3;
R = 7;

reflectionMatrixBasedOnXYPlane = [1 0 0 0; 0 1 0 0 ; 0 0 0 0; 1 1 1 1];


f = location(1)+(R+r*cos(u)).*cos(v);
g = location(2)+(R+r*cos(u)).*sin(v);
h = location(3)+r*sin(u);

toroid = zeros(4,points* points);
toroid(1,:) = f(:);
toroid(2,:) = g(:);
toroid(3,:) = h(:);
toroid(4,:) = (ones(points, points))(:);


toroid2 = reflectionMatrixBasedOnXYPlane*toroid;


surf (reshape(toroid(1,:), [points, points]), reshape(toroid(2,:), [points, points]), reshape(toroid(3,:), [points, points]));
%surf (f, g, h);
hold on;
surf (reshape(toroid2(1,:), [points, points]), reshape(toroid2(2,:), [points, points]), reshape(toroid2(3,:), [points, points]));
axis("equal");
hold on;
% xlim ([-20, 20]);
% ylim ([-20, 20]);
% zlim ([-20, 20]);
%print("MyPNG.png", "-dpng")
pause