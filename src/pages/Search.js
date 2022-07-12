import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = ({
      search: '',
      artistaPesquisado: '',
    });
  }

  changeInputValue = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  changeList = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
    });

    const response = await searchAlbumsAPI(search);

    this.setState((prevState) => (
      {
        loading: false,
        search: '',
        productList: response,
        artistaPesquisado: prevState.search,
      }
    ));
  }

  render() {
    const {
      search,
      productList,
      artistaPesquisado,
      loading } = this.state;
    const tam = 2;
    return (
      <>
        <Header />

        <main>
          <h1 data-testid="page-search">page-search</h1>
          <input
            type="text"
            className="search-input"
            id="search-input-artist"
            name="search"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.changeInputValue }
          />
          <button
            type="button"
            className="search-button"
            id="search-button-artist"
            data-testid="search-artist-button"
            disabled={ search.length < tam }
            onClick={ this.changeList }
          >
            Pesquisar
          </button>
        </main>

        {
          loading && <Carregando />
        }

        {
          productList !== undefined && (
            productList.length > 0 ? (
              <section>
                <h2>
                  { `Resultado de álbuns de: ${artistaPesquisado}` }
                </h2>
                {
                  productList.map((product) => (
                    <div
                      key={ product.collectionId }
                      id={ `product-${product.collectionId}` }
                      className="product"
                    >
                      <img
                        src={ product.artworkUrl100 }
                        alt="Capa do Álbum"
                        className="info-product"
                        id="product-artwork"
                      />
                      <h3 className="info-product" id="product-artist-name">
                        { product.artistName }
                      </h3>
                      <h4 className="info-product" id="product-collection-name">
                        { product.collectionName }
                      </h4>
                      <h4 className="info-product" id="product-collection-price">
                        $
                        <span>{ ` ${product.collectionPrice}` }</span>
                      </h4>
                      <Link to={ `/album/${product.collectionId}` }>Veja Mais</Link>
                    </div>
                  ))
                }
              </section>
            ) : (
              <h2>
                Nenhum álbum foi encontrado
              </h2>
            )
          )
        }
      </>
    );
  }
}

export default Search;
