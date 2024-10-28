
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Устанавливаем заголовки для всех запросов
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '1';

// Определяем интерфейс для данных тега
interface Tag {
    id: number;
    name: string;
}

const TagsPage: React.FC = () => {
    // Типизируем состояние как массив объектов типа Tag
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTag, setNewTag] = useState<string>('');

    useEffect(() => {
        // Получение всех тегов
        axios.get('https://455b-95-161-221-131.ngrok-free.app/tags')
            .then(response => setTags(response.data))
            .catch(err => console.error(err));
    }, []);

    const createTag = () => {
        // Создание нового тега
        axios.post('https://455b-95-161-221-131.ngrok-free.app/tags', { name: newTag })
            .then(response => {
                setTags([...tags, response.data]);
                setNewTag('');
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Управление тегами</h2>
            <input
                type="text"
                placeholder="Введите новый тег"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
            />
            <button onClick={createTag}>Создать тег</button>

            <h3>Список тегов</h3>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>{tag.name} — ссылка: https://t.me/gamepropagandawebapptestbot?start={tag.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TagsPage;
