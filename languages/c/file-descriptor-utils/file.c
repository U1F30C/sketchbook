
#ifndef FILE_H
#define FILE_H
#include <fcntl.h>

int existsFile(char *name) {
  int fd = open(name, O_RDONLY);
  return fd != -1;
}

int openFile(char *name) {
  int fd = open(name, O_RDWR | O_CREAT, 0777);
  return fd;
}

int rewindFile(int fd) {
  if (fd != -1) lseek(fd, 0L, 0);
}

int getChar(int fd) {
    char c;
    return (read(fd, &c, 1) == 1) ? (unsigned char)c : EOF;
}

int end(int fd) { lseek(fd, 0L, 2); }

int closeFile(int fd) { close(fd); }

#endif