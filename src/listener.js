class Listener {
  constructor(exportService, mailSender) {
    this._exportService = exportService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );
      const { username } = await this._exportService.getUserById(userId);
      const { name } = await this._exportService.getPlaylistById(playlistId);
      const songs = await this._exportService.getPlaylistSong(playlistId);
      const data = {
        playlist: {
          id: playlistId,
          name,
          username,
          songs,
        },
      };
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(data)
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
