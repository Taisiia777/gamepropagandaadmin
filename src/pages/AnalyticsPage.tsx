
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Устанавливаем заголовки для всех запросов
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '1';

// Определение интерфейса для данных аналитики
interface Join {
    id: number;
    userId: number;
    linkId: number;
    joinedAt: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Analytics {
    id: number;
    tag: Tag;
    joins: Join[]; // joins - это массив объектов
}

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    orderId: number;
    totalAmount: number;
    items: OrderItem[];
}

interface AnalyticsWithSales extends Analytics {
    totalSales: number;
    totalSalesAmount: number;
}

const AnalyticsPage: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsWithSales[]>([]);

    useEffect(() => {
        // Получаем аналитику и после этого для каждого пользователя получаем заказы
        axios.get(`${import.meta.env.VITE_NGROK_URL}/links/statistics`)
            .then(async (response) => {
                const analyticsData = response.data;

                // Получаем заказы для всех пользователей
                const analyticsWithSales = await Promise.all(analyticsData.map(async (stat: Analytics) => {
                    let totalSales = 0;
                    let totalSalesAmount = 0;

                    for (const join of stat.joins) {
                        const orders = await getUserOrders(join.userId);
                        totalSales += orders.totalSales;
                        totalSalesAmount += orders.totalSalesAmount;
                    }

                    return { ...stat, totalSales, totalSalesAmount };
                }));

                setAnalytics(analyticsWithSales);
            })
            .catch(err => console.error(err));
    }, []);

    // Функция для получения всех заказов пользователя и подсчета продаж и общей суммы
    const getUserOrders = async (userId: number) => {
        try {
            const response = await axios.get<Order[]>(`${import.meta.env.VITE_NGROK_URL}/users/${userId}/orders`);
            const orders = response.data;

            // Подсчитываем общее количество проданных товаров
            const totalSales = orders.reduce((sum, order) => {
                return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
            }, 0);

            // Подсчитываем общую сумму продаж
            const totalSalesAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

            return { totalSales, totalSalesAmount };
        } catch (error) {
            console.error('Ошибка при получении заказов пользователя:', error);
            return { totalSales: 0, totalSalesAmount: 0 };
        }
    };

    return (
        <div>
            <h2>Аналитика по тегам</h2>
            <table>
                <thead>
                <tr>
                    <th>Тег</th>
                    <th>Количество вступлений</th>
                    <th>Продаж</th>
                    <th>Сумма продаж</th>
                </tr>
                </thead>
                <tbody>
                {analytics.map((stat) => (
                    <tr key={stat.id}>
                        <td>{stat.tag.name}</td>
                        <td>{stat.joins.length}</td>
                        <td>{stat.totalSales}</td>
                        <td>{stat.totalSalesAmount ? stat.totalSalesAmount.toFixed(2) + ' ₽' : 'Нет данных'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticsPage;
