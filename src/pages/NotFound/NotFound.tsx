import s from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <div className={s.notFound}>
            <h1 className={s.code}>404</h1>
            <p className={s.text}>Страница не найдена</p>
        </div>
    );
};
