import { ErrorMessage } from '@hookform/error-message';
import { REVIEW_SYMBOLS } from '../../consts/global';
import { useAppDispatch } from '../../hooks/typed-wrappers';
import { removeModal, showModal } from '../../store/actions';
import { postReview } from '../../store/api-actions';
import { ReviewPostData } from '../../types/data-types';
import { PopupReviewSuccess } from './popup-review-success';
import { FieldValues, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { FormReviewNames } from '../../consts/enums';

type PopupAddReviewProps = {
  cameraId: number;
}
export function PopupAddReview ({cameraId}: PopupAddReviewProps):JSX.Element {

  const dispatch = useAppDispatch();

  const closePopupHandler = () => {
    dispatch(removeModal());
  };

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  } = useForm();

  const formSubmitHandler = (data: FieldValues) => {
    const fieldsData = data as ReviewPostData;
    const postData: ReviewPostData = {
      cameraId,
      userName: fieldsData.userName,
      advantage: fieldsData.advantage,
      disadvantage: fieldsData.disadvantage,
      review: fieldsData.review,
      rating: +fieldsData.rating
    };
    dispatch(postReview({reviewPostData: postData}));
    dispatch(removeModal());
    dispatch(showModal(<PopupReviewSuccess/>));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form onSubmit={(event) => void handleSubmit(formSubmitHandler)(event)}>
          <div className="form-review__rate">
            <fieldset className={classNames('rate', 'form-review__item', {'is-invalid': FormReviewNames.rating in errors})}>
              <legend className="rate__caption">Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input
                    className="visually-hidden" id="star-5"
                    {...register(FormReviewNames.rating, { required: 'Нужно оценить товар'})}
                    type="radio" defaultValue={5}
                  />
                  <label className="rate__label" htmlFor="star-5" title="Отлично" />
                  <input
                    className="visually-hidden" id="star-4"
                    {...register(FormReviewNames.rating, { required: 'Нужно оценить товар'})}
                    type="radio" defaultValue={4}
                  />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                  <input
                    className="visually-hidden" id="star-3"
                    {...register(FormReviewNames.rating, { required: 'Нужно оценить товар'})}
                    type="radio" defaultValue={3}
                  />
                  <label className="rate__label" htmlFor="star-3" title="Нормально" />
                  <input
                    className="visually-hidden" id="star-2"
                    {...register(FormReviewNames.rating, { required: 'Нужно оценить товар'})}
                    type="radio" defaultValue={2}
                  />
                  <label className="rate__label" htmlFor="star-2" title="Плохо" />
                  <input
                    className="visually-hidden" id="star-1"
                    {...register(FormReviewNames.rating, { required: 'Нужно оценить товар'})}
                    type="radio" defaultValue={1}
                  />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{watch(FormReviewNames.rating, 0)}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message"><ErrorMessage errors={errors} name={FormReviewNames.rating}/></p>
            </fieldset>
            <div className={classNames('custom-input', 'form-review__item', {'is-invalid': FormReviewNames.userName in errors})}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  autoFocus
                  {...register(FormReviewNames.userName, { required: 'Нужно указать имя',
                    minLength: { value: REVIEW_SYMBOLS.min, message: `Минимальная длина - ${REVIEW_SYMBOLS.min} символa` },
                    maxLength: { value: REVIEW_SYMBOLS.max, message: `Максимальная длина - ${REVIEW_SYMBOLS.max} символов` },
                  })}
                />
              </label>
              <p className="custom-input__error"><ErrorMessage errors={errors} name={FormReviewNames.userName}/></p>
            </div>
            <div className={classNames('custom-input', 'form-review__item', {'is-invalid': FormReviewNames.advantage in errors})}>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register(FormReviewNames.advantage, { required: 'Нужно указать достоинства',
                    minLength: { value: REVIEW_SYMBOLS.min, message: `Минимальная длина - ${REVIEW_SYMBOLS.min} символa` },
                    maxLength: { value: REVIEW_SYMBOLS.max, message: `Максимальная длина - ${REVIEW_SYMBOLS.max} символов` },
                  })}
                />
              </label>
              <p className="custom-input__error"><ErrorMessage errors={errors} name={FormReviewNames.advantage}/></p>
            </div>
            <div className={classNames('custom-input', 'form-review__item', {'is-invalid': FormReviewNames.disadvantage in errors})}>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register(FormReviewNames.disadvantage, { required: 'Нужно указать недостатки',
                    minLength: { value: REVIEW_SYMBOLS.min, message: `Минимальная длина - ${REVIEW_SYMBOLS.min} символa` },
                    maxLength: { value: REVIEW_SYMBOLS.max, message: `Максимальная длина - ${REVIEW_SYMBOLS.max} символов` },
                  })}
                />
              </label>
              <p className="custom-input__error"><ErrorMessage errors={errors} name={FormReviewNames.disadvantage}/></p>
            </div>
            <div className={classNames('custom-textarea', 'form-review__item', {'is-invalid': FormReviewNames.review in errors})}>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register(FormReviewNames.review, { required: 'Нужно добавить комментарий',
                    minLength: { value: REVIEW_SYMBOLS.min, message: `Минимальная длина - ${REVIEW_SYMBOLS.min} символa` },
                    maxLength: { value: REVIEW_SYMBOLS.max, message: `Максимальная длина - ${REVIEW_SYMBOLS.max} символов` },
                  })}
                />
              </label>
              <div className="custom-textarea__error"><ErrorMessage errors={errors} name={FormReviewNames.review}/></div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={closePopupHandler}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

