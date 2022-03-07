
#include<stdio.h>
#include <ctype.h>

int isDigit(char character) {
    return isdigit(character);
}

int isWhiteSpace(char character) {
    return isspace(character);
}

char digitToNumber(char character) {
    return character - 48;
}

int main(void) {

    int digitCount[10] = {0,0,0,0,0,0,0,0,0,0};
    int whiteSpaceCount = 0;
    int otherCharCount = 0;


    char character = 0;
    while((character = getchar()) != EOF) {
        if(isDigit(character)) {
            digitCount[digitToNumber(character)]++;
        }
        else if(isWhiteSpace(character)) {
            whiteSpaceCount++;
        }
        else 
            otherCharCount++;
    }
    puts("\nDigits:\n");
    for(int i = 0; i < 10; i++)
        printf("\t%i: %i\n", i, digitCount[i]);
    
    puts("\nWhitespaces:");
        printf("%i\n", whiteSpaceCount);

    puts("\nOther:");
        printf("%i\n", otherCharCount);
    puts("\n");
}
