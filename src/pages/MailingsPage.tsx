
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Устанавливаем заголовки для всех запросов
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '1';

// Определяем интерфейс для данных рассылки
interface Mailing {
    id: number;
    description: string;
    type: string;
    trigger?: string; // Триггер может быть необязательным
    imageUrl: string;
    url: string;
}

const MailingsPage: React.FC = () => {
    // Типизируем состояние как массив объектов типа Mailing
    const [mailings, setMailings] = useState<Mailing[]>([]);
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('mass');
    const [trigger, setTrigger] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        // Получение всех рассылок
        axios.get(`${process.env.REACT_APP_NGROK_URL}/mailing`)
            .then(response => setMailings(response.data))
            .catch(err => console.error(err));
    }, []);

    const createMailing = () => {
        // Создание новой рассылки
        axios.post(`${process.env.REACT_APP_NGROK_URL}/mailing`, { description, type, trigger, imageUrl, url })
            .then(response => {
                setMailings([...mailings, response.data]);
                resetForm();
            })
            .catch(err => console.error(err));
    };

    const resetForm = () => {
        setDescription('');
        setType('mass');
        setTrigger('');
        setImageUrl('');
        setUrl('');
    };

    const sendMailing = (id: number) => {
        // Отправка рассылки
        axios.post(`${process.env.REACT_APP_NGROK_URL}/mailing/send/${id}`)
            .then(() => {
                console.log('Рассылка отправлена');
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Управление рассылками</h2>
            <div>
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="mass">Массовая</option>
                    <option value="trigger">Триггерная</option>
                </select>
                {type === 'trigger' && (
                    <input
                        type="text"
                        placeholder="Триггер"
                        value={trigger}
                        onChange={(e) => setTrigger(e.target.value)}
                    />
                )}
                <input
                    type="text"
                    placeholder="URL изображения"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={createMailing}>Создать рассылку</button>
            </div>

            <h3>Список рассылок</h3>
            <ul>
                {mailings.map(mailing => (
                    <li key={mailing.id}>
                        {mailing.description} ({mailing.type})
                        <button onClick={() => sendMailing(mailing.id)}>Отправить сейчас</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MailingsPage;
