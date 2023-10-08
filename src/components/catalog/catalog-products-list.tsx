import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-wrappers';
import { productsDataToCatalogList } from '../../utils/data-formatting';
import { CatalogPagination } from './catalog-pagination';
import { showModal } from '../../store/actions';
import { PopupAddItem } from '../popups/popup-add-item';
import { CatalogCardData } from '../../types/data-types';
import { RouterPaths } from '../../consts/router-paths';
import { ProductRate } from '../product/product-rate';

export function CatalogProductsList ():JSX.Element {

  const dispatch = useAppDispatch();
  const productsListData = useAppSelector((state) => state.DATA.productsList);
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const catalogCardsData = productsDataToCatalogList(productsListData, currentPage);

  const buyButtonClickHandler = (catalogCardData: CatalogCardData) => {
    dispatch(showModal(<PopupAddItem catalogCardData={catalogCardData}/>));
  };

  return (
    <>
      <div className="cards catalog__cards">
        {catalogCardsData.map((catalogCardData) => (
          <div key={catalogCardData.id} className="product-card">
            <div className="product-card__img">
              <picture>
                <source type="image/webp" srcSet={`${catalogCardData.previewImgWebp}, ${catalogCardData.previewImgWebp2x} 2x`} />
                <img src={catalogCardData.previewImg} srcSet={`${catalogCardData.previewImg2x} 2x`} width={280} height={240} alt={catalogCardData.name} />
              </picture>
            </div>
            <div className="product-card__info">
              <div className="rate product-card__rate">
                <ProductRate rating={catalogCardData.rating}/>
                <p className="visually-hidden">Рейтинг: {catalogCardData.rating}</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{catalogCardData.reviewCount}</p>
              </div>
              <p className="product-card__title">{catalogCardData.name}</p>
              <p className="product-card__price"><span className="visually-hidden">Цена:</span>{catalogCardData.price} ₽
              </p>
            </div>
            <div className="product-card__buttons">
              <button
                className="btn btn--purple product-card__btn"
                type="button"
                onClick={() => buyButtonClickHandler(catalogCardData)}
              >Купить
              </button>
              <Link className="btn btn--transparent" to={`${RouterPaths.product}/${catalogCardData.id}`}>Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
      <CatalogPagination listLength={productsListData.length}/>
    </>
  );
}
