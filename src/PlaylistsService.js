const { Pool } = require('pg/lib');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'SELECT DISTINCT ON (playlists.id) playlists.id, playlists.name FROM playlist_songs LEFT JOIN playlists ON playlists.id = playlist_id WHERE playlists.id = $1',
      values: [playlistId],
    };

    const resultPlaylist = await this._pool.query(query);

    if (!resultPlaylist.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlistSongs = resultPlaylist.rows[0];

    const songQuery = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlist_songs LEFT JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId],
    };

    const songResult = await this._pool.query(songQuery);

    playlistSongs.songs = songResult.rows;

    return playlistSongs;
  }
}

module.exports = PlaylistsService;
