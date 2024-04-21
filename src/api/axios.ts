import { getToken } from '@/utils/auth';
import { msgError } from '@/utils/msg';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';

export interface HttpResponse<T = any> {
    /** ok 属性由前端添加。因为 status 就两个值，使用 Boolean 更好，和 fetch api 一样 */
    ok: boolean;
    status: 'succeed' | 'failed';
    msg: string;
    code: number;
    data: T;
}
export type R<T> = HttpResponse<T>;

const axiosInstance = axios.create();
interceptRequest(axiosInstance);
interceptResponse(axiosInstance);

if (import.meta.env.VITE_AXIOS_BASE_URL) {
    axiosInstance.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
}

export function post<T>(
    ...args: [url: string, data?: any, config?: AxiosRequestConfig<any> | undefined]
): Promise<HttpResponse<T>> {
    return axiosInstance.post(...args);
}

export function get<T>(...args: [url: string, config?: AxiosRequestConfig<any> | undefined]): Promise<HttpResponse<T>> {
    return axiosInstance.get(...args);
}

export default axiosInstance;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export function interceptRequest(axios: AxiosInstance) {
    axios.interceptors.request.use(
        (config) => {
            // 如果存在 token 的话，请求时自动添加上 token 到请求头
            // 的 Authorization 中。
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // do something
            return Promise.reject(error);
        },
    );
}

/**
 * 响应拦截器，到底要拦截什么？
 * 我的响应是，一些通用的逻辑就应该在这里进行拦截。
 * 那么有哪些通用的逻辑呢？对我来说，通用的逻辑主要就是错误处理这一块。
 * 在我看来，前端的错误处理只有两个目的：
 *  1. 将错误信息展示给用户
 *  2. 告诉顶层应用，请求出错了，不要继续执行后面的逻辑
 * 对于第二个目的，我们有两种方式实现，一种就是抛出错误，一种是错误优先
 * 也就是不排除错误，而是通过一个属性值（比如 ok）来判断是否出错。
 * 后者的好处在于，当我们的中间逻辑过多时，不需要在每层逻辑上都添加 try catch ！
 *
 * 然后就是第一个目的，由于我们的后台已经提供了必要的 msg 字段，那么我们完全可以将“展示”这个
 * 工作放在这里来！
 */
export function interceptResponse(axios: AxiosInstance) {
    axios.interceptors.response.use(
        // @ts-ignore
        (response) => {
            const res = response.data as HttpResponse;
            if (res.status === 'succeed') {
                res.ok = true;
                return res;
            }
            res.ok = false;

            // 现在是错误处理时间！虽然是错误处理，但这里不会抛出 reject，而是始终抛出一个
            // 固定的对象，也就是说，顶层中只能通过该对象中的每个属性来判断请求是否成功
            // 而不是通过 try catch 的方式
            // 突然发现这一点不就是和 fetch api 一样吗？不会根据状态码是非 2xx，就置为 reject
            // 只不过我这里更极端，直接没有 reject 的状态，全部都是 resolve

            // 出现错误时，前端需要做两件事情
            // 1. 展示错误信息给用户。🌟这一点完全可以在这里进行处理！
            // 2. 通知顶层应用，该请求出错了，不能继续执行。

            // 后台保证返回一个 msg 字段，并且该字段是 i18n 格式。
            msgError(res.msg);
            return res;
        },
        (error) => {
            // 这里是非 2xx 状态码

            let res: HttpResponse = {
                ok: false,
                status: 'failed',
                code: 3,
                msg: 'api.error.unknown',
                data: error as any,
            };

            // TODO: error instance of AxiosError
            if (error) {
                if (error.response) {
                    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                    // 后台保证返回一个 HttpResponse 对象
                    res = error.response.data;
                } else if (error.request) {
                    // 请求已经成功发起，但没有收到响应
                    res.msg = 'api.error.not-response';
                } else {
                    // 发送请求时出了点问题
                    res.msg = 'api.error.request';
                }
            }
            console.log(error, res);
            msgError(res.msg);

            res.ok = false;
            return res;
        },
    );
}
