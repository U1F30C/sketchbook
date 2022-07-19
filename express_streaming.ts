private async streamVideo(res: Response, fileId: number, range?: string) {
    let dowloadInfo: FileDownloadInfo;
    const fileInfo = await this.fileService.getFileInfo(fileId);
    if (range) {
      const parts = range.replace('bytes=', '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileInfo.size - 1;
      const chunksize = end - start + 1;      res.setHeader('Content-Range', `bytes ${start}-${end}/${fileInfo.size}`);
      res.setHeader('Content-Length', chunksize);      dowloadInfo = await this.fileService.getFileDownloadInfo(fileId, {
        start,
        end,
      });      res.status(HttpStatus.PARTIAL_CONTENT);
    } else {
      res.setHeader('Content-Length', fileInfo.size.toString());      dowloadInfo = await this.fileService.getFileDownloadInfo(fileId);      res.status(HttpStatus.OK);
    }
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURI(fileInfo.originalName)}"`,
    );
    dowloadInfo.pipe(res);
  }
}