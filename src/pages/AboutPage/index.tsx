import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import css from './index.module.css';
import { useStore } from 'store';

const AboutPage: React.FC = observer(() => {
	const store = useStore();

	useEffect(() => {
		store.restartGame();
	}, []);

	return (
		<section className={css.aboutApp}>
			<h1>Веб-приложение "Шахматы"</h1>
			<p>
				Приложение написано на JavaScript библиотеке React с использованием языка TypeScript и стейт-менеджера MobX.
			</p>
			<p>
				Также приложение использует такие прикладные инструменты, как: React Router, React Context, модульные CSS стили.
			</p>
			<p>
				Разработанные шахматы имеют классические правила и возможность включения опционального таймера с комфортным
				временем для игры для обоих игроков. По умолчанию игра не имеет ограничения по времени.
			</p>
			<p>Игра поддерживает следующие приёмы и варианты развития событий:</p>
			<ul>
				<li>
					Мат (Ситуация, когда король находится под шахом, и игрок не может сделать ни одного хода, чтобы его избежать)
				</li>
				<li>
					Пат (Положение в игре, когда один из игроков не может сделать хода, не подставив под удар своего короля)
				</li>
				<li>
					Проигрыш по истечению времени (Игрок, первый израсходовавший всё своё время, признаётся проигравшим независимо
					от положения в партии)
				</li>
				<li>
					Рокировка (Одновременный ход королём и ладьёй, при котором ладья придвигается к королю, а король ставится
					рядом по другую её сторону)
				</li>
				<li>
					Взятие на проходе (Специальный ход пешки, при котором она берёт пешку противника, перемещённую с начальной
					позиции сразу на два поля)
				</li>
			</ul>

			<p>
				Шахматы исключают возможность самостоятельно подставить короля под шах передвижением союзной фигуры или самого
				короля.
			</p>

			<p>
				Также, в случае шаха, для передвижения будут доступны только те фигуры, которые могут предотвратить опасность
				для своего короля.
			</p>

			<p>Побежденные фигуры каждого игрока отображаются под игровым полем.</p>

			<p>
				В случае завершения игры, игроки будут уведомлены о статусе игры всплывающим окном, появляющимся в правом
				верхнем углу экрана.
			</p>

			<p>
				Базовый код игры написан по <a href='https://www.youtube.com/watch?v=mUvYGUYMvKo'>обучающему ролику</a> YouTube
				канала Ulbi TV.
			</p>

			<p className={css.githubLink}>
				Ссылка на репозиторий <a href='https://github.com/imwshdp/react-ts-chess-app'>GitHub</a>
			</p>
		</section>
	);
});

export default AboutPage;
