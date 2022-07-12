import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistList: '',
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const artistList = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      artistList,
      favoriteSongs: favorites,
    });
  }

  onHandleChange = async ({ target }) => {
    const { checked, name } = target;

    if (checked) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(name);
        const favorites = await getFavoriteSongs();
        console.log(favorites);
        this.setState({
          loading: false,
          favoriteSongs: favorites,
        });
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        const favoritesReq = await getFavoriteSongs();
        console.log(favoritesReq);
        await removeSong(name);
        const favoritesRe = await getFavoriteSongs();
        console.log(favoritesRe);
        this.setState({
          loading: false,
          favoriteSongs: favoritesRe,
        });
      });
    }
  }

  render() {
    const { artistList, loading, favoriteSongs } = this.state;

    return (
      <>
        <Header />
        <h1 data-testid="page-album">page-album</h1>

        <section>
          {
            // exibição condicional: LOADING...
            loading ? <Carregando /> : (
              // exibição Condicional da Lista e do Component Music Card
              artistList?.length > 0 && (
                <>
                  <h3 data-testid="artist-name">{ artistList[0].artistName }</h3>
                  <h3 data-testid="album-name">
                    {artistList[0].collectionName}
                  </h3>

                  {
                    artistList
                      .filter((unUsed, indexfilter) => indexfilter !== 0)
                      .map((music, indexmap) => (
                        <article
                          key={ indexmap }
                          id={ `music-${indexmap}` }
                          className="music-article"
                        >
                          <MusicCard
                            music={ music }
                            onHandleChange={ this.onHandleChange }
                            check={
                              favoriteSongs.some((element) => (
                                JSON.parse(element).trackId === music.trackId
                              ))
                            }
                          />
                        </article>
                      ))
                  }
                </>
              )
            )
          }
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default Album;
