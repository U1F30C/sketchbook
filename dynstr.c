
#ifndef DYNSTR_H
#define DYNSTR_H
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>

struct _node
{
    char data;
    struct _node *prev;
    struct _node *next;
};

typedef struct _node Node;

typedef struct _string
{
    Node start;
    int length;
} String;

void initializeString(String *string)
{
    string->length = 0;
    string->start.data = '\0';
    string->start.prev = &(string->start);
    string->start.next = &(string->start);
}

void pushChar(String *string, char character)
{
    if (string)
    {
        Node *tmp = (Node *)malloc(sizeof(Node));
        (string->start).prev->next = tmp;
        tmp->prev = (string->start).prev;
        tmp->next = &(string->start);
        (string->start).prev = tmp;
        tmp->data = character;
        string->length++;
    }
}

void getString(String *string)
{
    if (string)
    {
        char character;
        for (character = getchar(); character != EOF && character != '\n'; character = getchar())
        {
            pushChar(string, character);
        }
    }
}

void printString(String *string)
{
    if (string)
    {
        Node *tmp = (string->start).next;
        for (int i = 0; i < string->length; i++)
        {
            printf("%c", tmp->data);
            tmp = tmp->next;
        }
        printf("%c", '\n');
    }
}

void writeString(int fd, String *string)
{
    if (string && fd != -1)
    {
        int length = string->length;
        char buffer[length];
        Node *tmp = (string->start).next;
        for (int i = 0; i < length; i++)
        {
            buffer[i] = tmp->data;
            tmp = tmp->next;
        }
        // write(fd, (char *)&length, sizeof(int));
        write(fd, &buffer, length);
        write(fd, "|", 1);
    }
}

int readString(int fd, String *string)
{
    if (string && fd != -1)
    {
        int length;
        if (read(fd, (char *)&length, sizeof(int)) == 0)
            return 0;
        char buffer[length];
        if (read(fd, &buffer, length) == 0)
            return 0;

        for (int i = 0; i < length; i++)
        {
            pushChar(string, buffer[i]);
        }
        return 1;
    }
    return 0;
}

#endif
