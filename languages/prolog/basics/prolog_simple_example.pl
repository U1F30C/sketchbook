feline(cat).
feline(lion).

canine(dog).
canine(wolf).

big(lion).
big(wolf).

small(cat).
small(dog).

animal(Thing) :- feline(Thing) ; canine(Thing).

bigger(elephant, horse).
bigger(horse, dog).
bigger(horse, cat).
bigger(dog, spider).

is_bigger(X, Y) :- bigger(X, Y).
is_bigger(X, Y) :- bigger(X, Z), is_bigger(Z, Y).

sum(A, B, R):- R is A+B.
/*

feline(X), small(X).
% X = cat
animal(X), canine(X), big(X).
% X = lion
is_bigger(elephant, dog).
% true.

sum(1, 2, R).
% R = 3
write($R).
*/