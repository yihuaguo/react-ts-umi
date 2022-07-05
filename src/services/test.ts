import request from '@/utils/request';

export async function getUsers() {
    return request('GET', '/api/users');
}