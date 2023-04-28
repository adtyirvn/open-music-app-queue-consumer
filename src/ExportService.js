const { Pool } = require('pg');

class ExportService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT name FROM playlist WHERE id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSong(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs 
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id 
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ExportService;
